import { React, useState ,useContext , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../config/api'
import convertRupiah from 'rupiah-format'

//components
import Login from '../Login';
import Register from '../Register';
import DropDown from '../DropDown';
import Header from '../Header'

//img
import poly from '../../img/poly.svg';
import banner from '../../img/banner.png'
import Icon from '../../img/Icon.svg';
import Trolly from '../../img/Trolly.svg';
import {WrapperYellow , OneLineFlexTop ,Banner , TextAndPizza , WrapFlex , WrapFlex2 , WrapFlex3 , Card , Text ,ImgPizza , ImgProfile , ImgTrolly, WrapMain ,  Polyy} from './LandingPage.styled';

import { UserContext } from '../../Context/userContext';


const LandingPage = () => {
    let [show, setShow] = useState(false);
    let [showR, setShowR] = useState(false);
    const toggle = () => (setShow(!show), setShowR(false));
    const toggleR = () => (setShowR(!showR), setShow(false));
    const Cancel = () => setShowR(!showR);
    const CancelL = () => setShow(!show);

    const { state, dispatch } = useContext(UserContext)
    const { isLogin, user } = state
    // let which = true
    // if (user.role === 'owner') {
    //     which = false
    // }
    // const [total, letTotal] = useState(null)
    // useEffect(async() => {
    //         await API.get('/order/count')
    //             .then(res => letTotal(res.data.total))
    //             .catch(err => handleError(err))
    // }, [])
    const [product, setProduct] = useState([])
    useEffect(async() => {
        await API.get('/products/all')
            .then((res) => { setProduct(res.data.data)})
    }, [])
    const _card = (x) => {
        if (!isLogin) {
            return <Card key={x?.id} onClick={toggle}>
            <img src={x.img} alt={x?.title} />
            <h3>{x?.title}</h3>
            <p>{convertRupiah.convert(x.price)}</p>
            <p>Stock: {x.stock}</p>
            </Card>
        }
        return <Link to={`/detail/${x.id}`} style={{ textDecoration: 'none' }}>
                <Card key={x?.id} onClick={toggle}>
                <img src={x.img} alt={x?.title} />
                <h3>{x?.title}</h3>
                <p>{convertRupiah.convert(x.price)}</p>
                <p>Stock: {x.stock}</p>
                </Card>
        </Link>
    }

    return (
        <>
            {isLogin ? null :
            <>
                    {show ? (<Login show={show} Cancel={CancelL} toggle={toggleR} />) : null}
                    {showR ? (<Register showR={showR} Cancel={Cancel} toggle={toggle}  />) : null}
            </>  
            }
            <Header/>
            <WrapMain >
                <Banner src={banner}/>
                <WrapFlex2>
                    <WrapFlex3>
                        {/* TODO: REPEAT */}
                        {product.map((x) => _card(x))}
                    </WrapFlex3>
                </WrapFlex2>
            </WrapMain>
        </>
    )
}


export default LandingPage;