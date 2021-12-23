import { React, useState ,useContext , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { API, handleError } from '../../config/api'
import convertRupiah from 'rupiah-format'

//components
import Login from '../Login';
import Register from '../Register';
import DropDown from '../DropDown';

//img
import poly from '../../img/poly.svg';
import banner from '../../img/banner.png'
import Icon from '../../img/Icon.svg';
import Trolly from '../../img/Trolly.svg';
import {WrapperYellow , OneLineFlexTop ,Banner , TextAndPizza , WrapFlex , WrapFlex2 , WrapFlex3 , Card , Text ,ImgPizza , ImgProfile , ImgTrolly, WrapMain , CardResto, Polyy} from './LandingPage.styled';

import { UserContext } from '../../Context/userContext';


const LandingPage = ({ U ,sett ,setf }) => {
    // const [which ,setWhich] = useState(false);
    let [show, setShow] = useState(false);
    let [showR, setShowR] = useState(false);
    const [drop, setDrop] = useState(false);
    const drops = () => (setDrop(!drop),setShow(false),setShowR(false));
    // const reg = () => (setDrop(false),setWhich(!which));
    // const login = () => (setDrop(false),setWhich(false));
    const toggle = () => (setShow(!show), setShowR(false));
    const toggleR = () => (setShowR(!showR), setShow(false));
    const Cancel = () => setShowR(!showR);
    const CancelL = () => setShow(!show);

    const { state, dispatch } = useContext(UserContext)
    const { isLogin, user } = state
    let which = true
    if (user.role === 'owner') {
        which = false
    }
    const [total, letTotal] = useState(null)
    useEffect(async() => {
            await API.get('/order/count')
                .then(res => letTotal(res.data.total))
                .catch(err => handleError(err))
    }, [])
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
            {/* <Header/> */}
            < WrapperYellow>
                <OneLineFlexTop>
                    <img src={Icon} alt='icon' />
                    <div>
                        {isLogin ? <>
                            {which ? 
                            <Link to='/Cart' >
                                {total ? <p>{total}</p> : null}
                                <ImgTrolly src={Trolly} onClick={sett} alt="Trolly" />
                            </Link> : null}
                        <ImgProfile src={user.image} onClick={drops} alt="Profile" />
                            
                        {drop ?
                        <>
                            <Polyy>
                                <div className="poly">
                                    <img src={poly} />
                                </div>
                            </Polyy>
                            <DropDown/>
                        </> : null}
                        </>
                            :
                        <>
                            <button onClick={toggle} className="login">Login</button>
                            <button onClick={toggleR}>Register</button>
                        </>}
                            
                        {/* login condition */}
                        
                    </div>
                </OneLineFlexTop>
            </WrapperYellow>
            <WrapMain>
                <Banner src={banner}/>
                <WrapFlex2/>
                <WrapFlex3>
                     {/* TODO: REPEAT */}
                    {product.map((x) => _card(x))}
                </WrapFlex3>
            </WrapMain>
        </>
    )
}
// {menu.map((menu) => {
//     return (
//         <CardMenu key={menu.id}> 
//             <img src={menu.img} alt={menu.img} key={menu.img} />
//             <h3>{menu.title}</h3>
//             <p>{convertRupiah.convert(menu.price)}</p>
//             {transaction ? <button key={menu.id}><Dis src={Disable} /></button > : <button onClick={() => handleOrder(menu.id)} key={menu.id}>Order</button>}
//         </CardMenu>
//     )
// })}

export default LandingPage;