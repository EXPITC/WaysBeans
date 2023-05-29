import React,{ useState, useEffect} from 'react'

import Header from '../Header'
import { API, handleError } from '../../config/api'
import {Link} from 'react-router-dom'
import { Card, Wrapper } from './Products.styled'
import convertRupiah from 'rupiah-format'
import { uuidv7 } from 'uuidv7'
const Product = () => {
    const [product, setProduct] = useState([])
    useEffect(async() => {
        await API.get('/products/all')
            .then((res) => { setProduct(res.data.data) })
            .catch(err => handleError(err))
    }, [])
    const _card = (x) => {
        return <Link to={`/detail/${x.id}`} style={{ textDecoration: 'none' }}>
                <Card key={uuidv7()} >
                <img src={x.img} alt={x?.title} key={uuidv7()} />
                <h3 key={uuidv7()}>{x?.title}</h3>
                <p key={uuidv7()}>{convertRupiah.convert(x.price)}</p>
                <p key={uuidv7()}>Stock: {x.stock}</p>
                </Card>
        </Link>
    }

    return (
        <>
            <Header />
            <Wrapper>
            {product.map((x) => _card(x))}
            </Wrapper>
        </>
    )
}

export default Product