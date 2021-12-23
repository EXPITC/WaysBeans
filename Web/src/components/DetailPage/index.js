import { React, useEffect, useState } from 'react';
import { API ,handleError} from '../../config/api';
import Header from '../Header';
import convertRupiah from 'rupiah-format'
import { Wrapper,Product ,DetailProduct} from './DetailPage.styled'
import { useParams } from 'react-router';
import Disable from '../../img/disabled.png'
import { Buttons } from '../ProfilePage/ProfilePage.styled';


const DetailPage = (req,res) => {
    const { id } = useParams()
    const [product, setProdutc] = useState([])
    const [menu, setMenu] = useState([])
    const [transaction, setTransaction] = useState(null)
    const [transactionID, setTransactionID] = useState(null)
    const [lastResto, setLastResto] = useState(null)
    useEffect(async() => {
        await API.get(`/product/${id}` )
            .then((res) => {setProdutc(res.data.data[0]) })
            .catch((err) => { handleError(err) })
        await API.get('/transaction/user')
            .then((res) => { setTransaction(res.data.data.status)})
            .catch((err) => { handleError(err) })
        await API.get('/transaction/user/order')
            .then(res => { setTransactionID(res.data.data.sellerId);})
            .catch((err) => { handleError(err) })
    }, [])
    // console.log(resto.ownerId)
    console.log(transactionID)
    // console.log(transaction)
    // console.log(lastResto)
    // console.log(menu)
    const [form, setForm] = useState({})
    const [trigHead, setTrigHead] = useState(false)
    const [f, setF] = useState(false)
    useEffect(() => {
        if (f) {
            order()
        } else {
            setF(true)
        }
    },[form])
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
    console.log(product.seller?.id)
    const handleOrder = (x) => {
        setForm({
            sellerId : x,
            product: [
                {
                    productId: product.id,
                    qty: 1
                }
            ]
        })
    }

    
    return (
        <>
            <Header trigger={trigHead} />
            <Wrapper>
                <Product src={product.img}/>
                <DetailProduct>
                    <h1>{product.title}</h1>
                    <h3>Stock: {product.stock}</h3>
                    <p>{product.description}</p>
                    <h2>{convertRupiah.convert(product.price)}</h2>
                    <button onClick={()=> handleOrder(product.seller.id)}>Add Cart</button>
                </DetailProduct>
            </Wrapper>
        </>
    )
}

export default DetailPage