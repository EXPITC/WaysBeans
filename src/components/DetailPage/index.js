import { React, useEffect, useState ,useContext} from 'react';
import { API ,handleError} from '../../config/api';
import Header from '../Header';
import convertRupiah from 'rupiah-format'
import { Wrapper,Product ,DetailProduct ,InputT ,InputS, InputD, InputP ,Inline} from './DetailPage.styled'
import { useParams } from 'react-router';
import { UserContext } from '../../Context/userContext';
// import the Rating
import Rating from './Rating'


const DetailPage = () => {
    const { id } = useParams()
    const { state } = useContext(UserContext);
    const { user } = state
    let isOwner = false
    if (user?.role === 'owner') {
      isOwner = true
    }
    const [data, setData] = useState({
        title: '',
        stock: '',
        description: '',
        price: '',
        img: '',
        prev: ''
    })
   
    const [product, setProduct] = useState([])
    const [form, setForm] = useState({})
    const [trigHead, setTrigHead] = useState(false)
    const [titleV, setTitleV] = useState(false)
    const [stockV, setStockV] = useState(false)
    const [descriptionV, setDescriptionV] = useState(false)
    const [priceV, setPriceV] = useState(false)
    const [imgV, setImgV] = useState(false)

    const getProduct = async () => {
        await API.get(`/product/${id}` )
            .then((res) => {setProduct(res.data.data[0]) })
            .catch((err) => { handleError(err) })
        setTrigHead(!trigHead)
    }
    useEffect(() => {
        getProduct()
    }, [])
    useEffect(() => {
        setData({
            title: product.title,
            stock:  product.stock,
            description:  product.description,
            price: product.price,
            prev: product.img
        })
        
    }, [product])

    const handelData = (state, x) => {
        
        switch (state) {
            case 'title': {
                return setData({
                    ...data,
                    title: x
                })
            }
            case 'stock': {
                return setData({
                    ...data,
                    stock: x
                })
            }
            case 'description': {
                return setData({
                    ...data,
                    description: x
                })
            }
            case 'price': {
                return setData({
                    ...data,
                    price: x
                })
            }
        }
    }
    const upload = async (state) => {
     
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const config2 = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        switch (state) {
            case 'title':
                await API.patch(`/product/${id}`, { title: data.title }, config)
                    .then(res => console.log(res))
                    .catch(err => handleError(err))
                getProduct()
                break;
            case 'stock':
                await API.patch(`/product/${id}`, { stock: data.stock }, config)
                    .then(res => console.log(res))
                    .catch(err => handleError(err))
                getProduct()
                break;
            case 'description':
                await API.patch(`/product/${id}`, { description: data.description }, config)
                    .then(res => console.log(res))
                    .catch(err => handleError(err))
                getProduct()
                break;
            case 'price':
                await API.patch(`/product/${id}`, { price: data.price }, config)
                    .then(res => console.log(res))
                    .catch(err => handleError(err))
                getProduct()
                break;
            case 'img':
                const formData = new FormData();
                formData.set('image', data.img, data.img.name);
                await API.patch(`/productImg/${id}`, formData, config2)
                    .then(res => console.log(res))
                    .catch(err => handleError(err))
                getProduct()
                setImgV(false)
                break;
        }
       
   }
    const enterHandle = async(state, e) => {
        if (e.code === "Enter" || e.code === "NumpadEnter") {
            switch (state) {
                case 'title':
                    upload('title')
                    setTitleV(false)
                    break;
                case 'stock': {
                    upload('stock')
                    setStockV(false)
                    break;
                }
                case 'description': {
                    upload('description')
                    setDescriptionV(false)
                    break;
                }
                case 'price': {
                    upload('price')
                    setPriceV(false)
                    break;
                }
            }
        }
   }
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

    const handleImg = (e) => {
        setData({
            ...data,
            img: e.target.files[0],
            prev: URL.createObjectURL(e.target.files[0])
        })
        console.log('what?')
        setImgV(true)
    }
    const uploadImg = () => {
        upload('img')
    }
    const cancelImg = () => {
        setData({
            ...data,
            prev: product.img
        })
        setImgV(false)
    }
    // check if costumer then fect the token for review/rating

    return (
        <>
            <Header trigger={trigHead} />
            <Wrapper>
                {isOwner ?
                    <label htmlFor='img'>
                        <Product src={data.prev} alt={product.title} />
                        <input type='file' id='img' onChange={handleImg} hidden />
                    </label> :
                    <>
                    <Product src={data.prev} alt={product.title} />
                    </>}
                <DetailProduct h>
                    {isOwner ?
                        <>
                            {titleV ? <InputT value={data.title} onChange={(e) => { handelData('title', e.target.value) }} onKeyDown={(e)=> {enterHandle('title',e)}}/>: <h1 onClick={()=>setTitleV(!titleV)}>{product.title}</h1>}
                            {stockV ? <Inline><h3>Stock:</h3><InputS value={data.stock} onChange={(e) => { handelData('stock', e.target.value) }}  onKeyDown={(e)=> {enterHandle('stock',e)}} /></Inline> : <h3 onClick={()=>setStockV(!stockV)}>Stock: {product.stock}</h3>}
                            {descriptionV ? <InputD value={data.description} onChange={(e) => { handelData('description', e.target.value) }}  onKeyDown={(e)=> {enterHandle('description',e)}}/> : <p onClick={()=>setDescriptionV(!descriptionV)}>{product.description}</p>}
                            {priceV ? <InputP value={data.price} onChange={(e) => { handelData('price', e.target.value) }} onKeyDown={(e) => { enterHandle('price', e) }} /> : <h2 onClick={() => setPriceV(!priceV)}>{convertRupiah.convert(product.price)}</h2>}
                            {imgV ? <> <button onClick={uploadImg}>Update Product Pict</button> <button onClick={cancelImg}>Cancel</button></>: null}
                        </>
                    :
                    <>
                    <h1>{product.title}</h1>
                    <h3>Stock: {product.stock}</h3>
                    <p>{product.description}</p>
                    <h2>{convertRupiah.convert(product.price)}</h2>
                    <button onClick={()=> handleOrder(product.seller.id)}>Add Cart</button>
                    </>
                    }
                </DetailProduct>
                <Rating id={id}/>
            </Wrapper>
        </>
    )
}

export default DetailPage