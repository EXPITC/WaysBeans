import Header from '../Header'
import {Link} from  'react-router-dom'
import { CardResto } from '../LandingPage/LandingPage.styled'
import { Wrapper } from './Resto.styled'
import { API, handleError } from '../../config/api'
import React,{ useEffect,useState } from 'react'

const Resto = () => {
    const [restos, setRestos] = useState([])
    useEffect(async() => {
        await API.get('/restos')
            .then((res) => { setRestos(res.data.data.restos) })
    },[])

    return (
        <>
        <Header/>
        <Wrapper>
        <h3>Resto</h3>
        {restos.map((resto) => {
            return(
                <Link to={`/Resto/${resto.id}`}className="nonee">
                    <CardResto key={resto.title} >
                        <img src={resto.img} alt={resto.name} />
                        <h2>{resto.title}</h2>
                    </CardResto>
                </Link>
            )
        })}
        </Wrapper>
        </>
    )
}

export default Resto