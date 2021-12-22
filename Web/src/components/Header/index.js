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

const Header = ({ trigger ,noTroll}) => {
    let [show, setShow] = useState(false);
    const {state, dispatch} = useContext(UserContext)
    const toggle = () => (setShow(!show));
    const { user } = state
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
    console.log(resto)
    return (
        <>
        <Head>
            <TopFlex>
                <Link to="/">
                <img src={Icon} className="shake"/>
                </Link>
                <Wrap>
                        {isOwner ? <Link className="cart" to="/Resto">
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
                </Wrap>
            </TopFlex>
            {show ? <>
                    <Polyy>
                        <div className="poly">
                            <img src={poly} />
                        </div>
                    </Polyy>
                    <Specialdrop>
                        <DropDown className="drop" logout/>
                    </Specialdrop>
                    </>
                : null}
        </Head>
        </>
    )
}

export default Header