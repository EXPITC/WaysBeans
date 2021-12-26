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
    const [transactionID, setTransactionID] = useState(null)
    const [form, setForm] = useState({})
    const [trigHead, setTrigHead] = useState(false)

    const getProduct = async () => {
        await API.get(`/product/${id}` )
            .then((res) => {setProdutc(res.data.data[0]) })
            .catch((err) => { handleError(err) })
        setTrigHead(!trigHead)
    }
    useEffect(async() => {
        getProduct()
        await API.get('/transaction/user/order')
            .then(res => { setTransactionID(res.data.data.sellerId);})
            .catch((err) => { handleError(err) })
    }, [])

   
   
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


        let res = await API.post('/add/transaction', form, config)
        if(res.status === 201) {

            res = {
                transactionId: res.data.thenTransaction.id,
                ...form.product[0],
            }

            res = JSON.stringify(res)
            await API.post('/add/order', res, config)
        }
        getProduct()
        } catch (err) {
            getProduct()
            handleError(err)
        }
    }

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