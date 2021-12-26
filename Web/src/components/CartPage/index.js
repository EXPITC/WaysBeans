import { React, useState, useEffect ,useContext} from 'react';
import { API, handleError } from '../../config/api'
import convertRupiah from 'rupiah-format';
import { UserContext } from '../../Context/userContext';
import { io } from 'socket.io-client'
import {Link } from 'react-router-dom'

import { Wrapper ,WrapContent , WrapOrder ,Orderbtn , Pp , WrapOrder2, Flex , FlexCollum , Wrap1 , Wrap2 , Wrap3} from './CartPage.styled'

import plus from '../../img/+.svg'
import min from '../../img/-.svg'
import trash from '../../img/Trash.svg'
import Header from '../Header';

import { useNavigate } from 'react-router';


let socket;
const CartPage = () => {
    const navigate = useNavigate()
    const [orderStatus,setOrderStatus] = useState(false)
    const { state, dispatch } = useContext(UserContext)
    const { user } = state

    const [form, setForm] = useState({
        location: user.location,
    })
    
    const [total, letTotal] = useState(null)
    const [order, setOrder] = useState([])
    const [resto, setResto] = useState()
    const [transaction, setTransaction] = useState(null)
    const [refresh, setReresh] = useState(false)
    useEffect(async () => {
        await API.get('/order/count')
            .then(res => letTotal(res.data.total))
            .catch(err => handleError(err))
        await API.get('/transaction/active')
            .then(res => {setOrder(res.data.data.transactions[0].product); setTransaction(res.data.data.transactions[0]) })
            .catch(err => handleError(err))
    }, [refresh])
    useEffect(async()=>{
        await API.get(`/last/resto/${transaction?.sellerId}`)
            .then(res => setResto(res?.data?.data))
            .catch(err => handleError(err))
    }, [transaction])
    
    useEffect(() => {
        if (transaction?.status === 'Waiting Approve' || transaction?.status === 'On The Way') {
            setOrderStatus(true)
        }
    }, [transaction])
    
    const orderDelete = async (x) => {
        try {
            if(orderStatus === true) return null

            const res = await API.delete(`/order/${x}`)

            setReresh(!refresh)
        } catch (err) {
            handleError(err)
        }
    }


    
    const addHandle = async (x) => {
        try {
            if(orderStatus === true) return null
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let res = {
                transactionId: transaction.id,
                productId: x,
                qty: 1
            }
            res = JSON.stringify(res)

            await API.post('/add/order', res, config)
            setReresh(!refresh)
        } 
        catch (err) {
            handleError(err)
        }
    }
    const lessHandle = async (x) => {
        try {
            if(orderStatus === true) return null
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let res = {
                transactionId: transaction.id,
                productId: x,
                qty: 1
            }
            res = JSON.stringify(res)
            await API.post('/less/order', res, config)
            setReresh(!refresh)
        } 
        catch (err) {
            handleError(err)
        }
    }
    return (
        <>
            <Header trigger={refresh}/>
            <Wrapper>
                <h1>My Chart</h1>
                <h2>Review Your Order</h2>
                <WrapOrder>
                    <div className="over">
                        <WrapOrder2>
                            {/* TC~REPEAT */}
                            {total === 0 ?
                                navigate(`/`) : null}
                    {order.map(x =>{
                        return (
                            <Flex key={x.id+x.id}>
                                <Wrap1 >
                                    <img src={x.img} key={x.img+x.id} />
                                    <Wrap2>
                                        <Wrap3>
                                            <h4>{x.title}</h4>
                                            <p>{convertRupiah.convert(x.order.qty * x.price)}</p>
                                        </Wrap3>
                                        <Wrap3>
                                            <div>
                                                <button  onClick={() => { lessHandle(x.id) }}><img src={ min }/></button>
                                                        <h4 className="pinkBg">{x.order.qty}</h4>
                                                <button onClick={() => { addHandle(x.id) }}><img src={ plus}/></button>
                                            </div>
                                            <button onClick={() => { orderDelete(x.order.id) }}><img src={ trash }/></button>
                                        </Wrap3>
                                    </Wrap2>
                                </Wrap1>
                            </Flex>
                        )
                    })}
                    </WrapOrder2>
                    </div>
                    <FlexCollum>
                        <tb>
                            <Wrap3>
                                <Pp >Subtotal</Pp>
                                <Pp r>{convertRupiah.convert(transaction?.price)}</Pp>
                            </Wrap3>
                            <Wrap3>
                                <Pp>Qty</Pp>
                                <Pp>{total}</Pp>
                            </Wrap3>
                            <Wrap3>
                                <Pp>Ongkir</Pp>
                                <Pp r>Rp.10.000</Pp>
                            </Wrap3>
                        </tb>
                            <Wrap1>
                                <Pp r b>TOTAL</Pp>
                                <Pp r>{convertRupiah.convert(transaction?.price + 10000)}</Pp>
                            </Wrap1>
                    </FlexCollum>
                </WrapOrder>
                <Orderbtn>
                    <Link to='checkout'>
                        <button >Process To Checkout</button>
                    </Link>
                </Orderbtn>
            </Wrapper>
        </>
    )
}

export default CartPage