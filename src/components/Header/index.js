import { React, useEffect, useState ,useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';
import {API, handleError} from '../../config/api'

import Icon from '../../img/Icon.svg';
import Trolly from '../../img/Trolly.svg';
import Shop from '../../img/shop.png';
import poly from '../../img/poly.svg';

import { Head, TopFlex, Wrap ,Polyy ,Specialdrop} from './Header.styled';
import DropDown  from '../DropDown';
import Login from '../Login';
import Register from '../Register';

const Header = ({ trigger, noTroll }) => {
    let [showL, setShowL] = useState(false);
    let [showR, setShowR] = useState(false);
    let [show, setShow] = useState(false);
    const toggleL = () => (setShowL(!showL), setShowR(false), setShow(false));
    const toggleR = () => (setShowR(!showR), setShowL(false),setShow(false));

    const CancelR = () => setShowR(!showR);
    const CancelL = () => setShowL(!showL);

    const {state, dispatch} = useContext(UserContext)
    const toggle = () => (setShow(!show));
    const { user ,isLogin} = state
    let isOwner = false
    if (user.role === 'owner') {
        isOwner = true
    }
    const [total, letTotal] = useState(null)
    useEffect(async() => {
            await API.get('/order/count')
                .then(res => letTotal(res.data.total))
                .catch(err => handleError(err))
    }, [trigger])
    const [resto, setResto] = useState(null)
    // const [restoId, setRestoId] =  useState(null)
    useEffect(async () => {
        await API.get(`/resto` )
            .then((res) => { setResto(res.data.data.resto.data)})
            .catch((err) => { handleError(err) })
    }, [])
    return (
        <>
            {isLogin ? null :
            <>
                    {showL ? (<Login show={showL} Cancel={CancelL} toggle={toggleR} />) : null}
                    {showR ? (<Register showR={showR} Cancel={CancelR} toggle={toggleL}  />) : null}
            </>  
            }
        <Head>
            <TopFlex>
                <Link to="/">
                <img src={Icon} className="shake"/>
                </Link>
                <Wrap>
                        {isLogin ? <>
                            {isOwner ? <Link className="cart" to="/Store">
                            <img style={{width: '50px', height: '50px'}} src={Shop} />
                                </Link>:
                            noTroll ? null :
                            <>
                                {total ? <p>{total}</p> : null}
                                <Link className="cart" to="/Cart">
                                    <img src={Trolly} />
                                </Link>
                            </>
                            }
                            <img className='profile' onClick={toggle} src={user.image} />
                    </>
                    :
                    <>
                            <button onClick={toggleL} className="login">Login</button>
                            <button onClick={toggleR}>Register</button>
                    </>
                    }
                   
                </Wrap>
            </TopFlex>
                {isLogin ? <>
                    {show ? <>
                        <Polyy>
                            <div className="poly">
                                <img src={poly} />
                            </div>
                        </Polyy>
                        <Specialdrop>
                            <DropDown className="drop" logout />
                        </Specialdrop>
                    </>
                        : null}
                </> : null}
        </Head>
        </>
    )
}

export default Header