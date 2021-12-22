import { React, useEffect, useState } from 'react';
import { API ,handleError} from '../../config/api';
import Header from '../Header';
import convertRupiah from 'rupiah-format'
import { Wrapper, WrapCard , CardMenu ,Dis , Modal} from './DetailPage.styled'
import { useParams } from 'react-router';
import Disable from '../../img/disabled.png'


const DetailPage = (req,res) => {
    const { id } = useParams()
    const [resto, setResto] = useState([])
    const [menu, setMenu] = useState([])
    const [transaction, setTransaction] = useState(null)
    const [transactionID, setTransactionID] = useState(null)
    const [transactionLast, setTransactionLast] = useState(null)
    const [lastResto, setLastResto] = useState(null)
    const [modalConfirmation, setModalConfirmation] = useState(false)
    useEffect(async() => {
        await API.get(`/resto/${id}` )
            .then((res) => { setResto(res.data.data.resto.data); setMenu(res.data.data.resto.menu) })
            .catch((err) => { handleError(err) })
        await API.get('/transaction/user')
            .then((res) => { setTransaction(res.data.data.status)})
            .catch((err) => { handleError(err) })
        await API.get('/transaction/user/order')
            .then(res => { setTransactionID(res.data.data.sellerId);setTransactionLast(res.data.data) })
            .catch((err) => { handleError(err) })
        
    }, [])
    useEffect(async () => {
        const res = await API.get('/transaction/user/order')
        if (res?.data?.data?.sellerId === undefined) {
            console.log('undefined')
            setTransactionID(null)
        }else{
            console.log('not undefined')
        }
    },[modalConfirmation])
    useEffect(async () => {
        await API.get(`/last/resto/${transactionLast?.sellerId}`)
            .then((res) => setLastResto(res.data.data.resto))
            .catch((err) => handleError(err))
    },[transactionLast])
    // console.log(resto.ownerId)
    console.log(transactionID)
    // console.log(transaction)
    console.log(transactionLast)
    // console.log(lastResto)
    // console.log(menu)
    const [form, setForm] = useState({})
    const [trigHead, setTrigHead] = useState(false)
    const handleOrder = (x) => {
        setForm({
            sellerId : resto.ownerId,
            product: [
                {
                    productId: x,
                    qty: 1
                }
            ]
        })
    }
    const [fristhold, setFristhold] = useState(false)
    useEffect(() => {
        if (fristhold === true) {
            if (resto.ownerId === transactionID || transactionID === null) {
                order()
            } else {
                console.log(' u still have order on resto ' + lastResto.title)
                console.log('after this if use want to change resto then update transaction status cancel ')
                setModalConfirmation(true)
            } 
        } else {
            setFristhold(true)
        }
    }, [form])
    const order = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        console.log(form.sellerId)
        
        const body  = JSON.stringify(form)
        console.log(body)
        let res = await API.post('/add/transaction', form, config)
        console.log(res)
        if(res.status === 201) {
            console.log('///////////////////')
            console.log(res)
            res = {
                transactionId: res.data.thenTransaction.id,
                ...form.product[0],
            }
            console.log('///////////////////')
            console.log(res)
            res = JSON.stringify(res)
            await API.post('/add/order', res, config)
        }
        setTrigHead(!trigHead)
        } catch (err) {
            handleError(err)
        }
    }
    
    return (
        <>
        
            <Header trigger={trigHead} />
            {modalConfirmation ?
                <Modal>
                    <div className="modal-left">
                        {' u still have order on resto ' + lastResto.title}
                    </div>
                    <div className="modal-left">
                        Do you want to <span>Cancel</span> the last Order?
                        <button onClick={()=>  setModalConfirmation(false)}>No</button>
                        <button onClick={async () => {
                            try {
                            await API.delete(`/transaction/${transactionLast?.id}`)
                                    .catch(err=> handleError(err))
                                setModalConfirmation(false)
                                setTrigHead(!trigHead)
                            } catch (err) {
                                handleError(err)
                            }
                        }}>Yes</button>
                    </div>
                </Modal> : null}
            <Wrapper>
                <WrapCard>
                <h1>{resto.title}, Menus</h1>
                {transaction ?<>
                <h4>You can't order right now, you have transaction {transaction}</h4>
                <h5>please wait until your order finish.</h5>
                </> : null}
                {menu.map((menu) => {
                    return (
                        <CardMenu key={menu.id}> 
                            <img src={menu.img} alt={menu.img} key={menu.img} />
                            <h3>{menu.title}</h3>
                            <p>{convertRupiah.convert(menu.price)}</p>
                            {transaction ? <button key={menu.id}><Dis src={Disable} /></button > : <button onClick={() => handleOrder(menu.id)} key={menu.id}>Order</button>}
                        </CardMenu>
                    )
                })}
                </WrapCard>
            </Wrapper>
        </>
    )
}

export default DetailPage