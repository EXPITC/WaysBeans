import { React, useState, useEffect ,useContext} from 'react';
import { API, handleError } from '../../config/api'
import convertRupiah from 'rupiah-format';
import { UserContext } from '../../Context/userContext';
import { io } from 'socket.io-client'
import {Link } from 'react-router-dom'

import { Wrapper ,WrapContent , WrapOrder ,Orderbtn , Pp , WrapOrder2, Flex , FlexCollum , Wrap1 , Wrap2 , Wrap3} from './DetailTrans.styled'

import plus from '../../img/+.svg'
import min from '../../img/-.svg'
import trash from '../../img/Trash.svg'
import Header from '../Header';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';


let socket;
const CartPage = () => {
    const { id} = useParams()
    const [orderStatus,setOrderStatus] = useState(false)
    const { state, dispatch } = useContext(UserContext)
    const { user } = state

    // const [total, setTotal] = useState(0)
    const [order, setOrder] = useState([])
    const [resto, setResto] = useState()
    const [transaction, setTransaction] = useState(null)
    const [refresh, setReresh] = useState(false)
    useEffect(async () => {
        await API.get(`/transactionby/${id}` )
            .then(res => { setOrder(res.data.data.transactions[0].product); setTransaction(res.data.data.transactions[0]) })
            .catch(err => handleError(err))
    }, [refresh])
    
    const total = () => {
        let xa = 0
        order.map(x => {
            xa = (xa + x.order.qty)
            console.log(xa)
        })
        return xa
    }
    return (
        <>
            <Header trigger={refresh}/>
            <Wrapper>
                <h1> Transaction</h1>
                <h2>Review Your Transaction</h2>
                <WrapOrder>
                    <div className="over">
                        <WrapOrder2>
                            {/* TC~REPEAT */}
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
                                                
                                                        <h4 className="pinkBg">{x.order.qty}</h4>
                                              
                                            </div>
                            
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
                                <Pp>{total()}</Pp>
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
            </Wrapper>
        </>
    )
}

export default CartPage