import { React, useState ,useContext , useEffect} from 'react';
import { Link } from 'react-router-dom';
import { API, handleError } from '../../config/api'


//components
import Login from '../Login';
import Register from '../Register';
import DropDown from '../DropDown';

//img
import poly from '../../img/poly.svg';
import Pizza from '../../img/pizza.svg';
import Icon from '../../img/Icon.svg';
import Trolly from '../../img/Trolly.svg';
import {WrapperYellow , OneLineFlexTop , TextAndPizza , WrapFlex , WrapFlex2 , WrapFlex3 , CardNear , Text ,ImgPizza , ImgProfile , ImgTrolly, WrapMain , CardResto, Polyy} from './LandingPage.styled';

import { UserContext } from '../../Context/userContext';


// TC~Dummy
const resto = [
    {
        name: 'Burger King',
        img: 'https://pngimg.com/uploads/burger_king/burger_king_PNG17.png' 
    },
    {
        name: 'Startbucks',
        img: 'https://www.freepnglogos.com/uploads/starbucks-logo-png-25.png'
    },
    {
        name: 'KFC',
        img: 'https://www.freepnglogos.com/uploads/kfc-png-logo/camera-kfc-png-logo-0.png'
    },
    {
        name: 'Jco',
        img: 'https://1.bp.blogspot.com/-QaywjoHhvXM/Xt9fsQbVeuI/AAAAAAAAGXQ/ut_W8VQkhiQFODR9C_zr0zAYLf8UhlMvgCK4BGAsYHg/s1200/jco.png'
    }
]
const near = [
    {
        food: 'Geprek Bensu',
        img: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Ayam_geprek.png',
        distance: '0,2 KM'
    },
    {
        food: 'Nasi Goreng Mas Roni',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Nasi_Goreng.jpg/800px-Nasi_Goreng.jpg',
        distance: '0,6 KM'
    },
    {
        food: 'Pecel Ayam Prambanan',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Pecel_Solo.JPG/800px-Pecel_Solo.JPG',
        distance: '0,6 KM'
    },
    {
        food: 'Kopi Kenangan',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG',
        distance: '1,6 KM'
    },
]

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
    const [restos, setRestos] = useState([])
    useEffect(async() => {
        await API.get('/restos')
            .then((res) => { setRestos(res.data.data.restos) })
    },[])

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
                            <button onClick={toggleR}>Register</button>
                            <button onClick={toggle}>Login</button>
                        </>}
                            
                        {/* login condition */}
                        
                    </div>
                </OneLineFlexTop>
                <TextAndPizza>
                    <Text>
                        <h1>Are You Hungry? <br></br> Express Home Delivery</h1>
                        <WrapFlex>
                            <h2> </h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                        </WrapFlex>
                    </Text>
                    <ImgPizza src={Pizza} alt='Pizza' />
                </TextAndPizza>
            </WrapperYellow>
            <WrapMain>
                <h1>Popular Restaurant</h1>
                <WrapFlex2>
                    {/* TODO: REPEAT */}
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
                </WrapFlex2>
                <h1>Restaurant Near You</h1>
                <WrapFlex3>
                     {/* TODO: REPEAT */}
                    {near.map((near) => {
                        return <CardNear key={near.food} >
                            <img src={near.img} alt={near.food} />
                            <h3>{near.food}</h3>
                            <p>{near.distance}</p>
                        </CardNear>
                    })}
                </WrapFlex3>
            </WrapMain>
        </>
    )
}

export default LandingPage;