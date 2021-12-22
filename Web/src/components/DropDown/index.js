import { React, useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Context/userContext';

import { Wrapper ,Wrapper2 ,Icon , JustWrap ,Logout} from './DropDown.styled';
import userIcon from '../../img/user.svg';
import logoutIcon from '../../img/logout.svg';
import foodIcon from '../../img/foodicon.svg';
import Transaction from '../../img/transaction.svg';
import { Link } from 'react-router-dom';
const DropDown = ({U , LogoutSwitch , set, logout}) => {
    // x = false;
    const { state, dispatch } = useContext(UserContext)
    const handleLogout = () => {
        dispatch({
            status: 'logout'
        })
        console.log(state)
    }
    const {user} = state
    let isOwner = false
    if (user?.role === 'owner') {
      isOwner = true
    }
    return (
        <>
            {isOwner ?<>
                <Wrapper2 >
                    <Wrapper>
                        
                        <Link to="/Profile">
                        <JustWrap onClick={set}>
                            <Icon src={userIcon} />
                            <p>Profile Partner</p>
                        </JustWrap>
                        </Link>
                        <Link to="/Add-Product">
                        <JustWrap onClick={set}>
                            <Icon src={foodIcon} />
                            <p>Add Product</p>
                        </JustWrap>
                        </Link>
                        <Link to="/Transaction">
                        <JustWrap onClick={set}>
                            <Icon src={Transaction} />
                            <p>Transaction</p>
                        </JustWrap>
                        </Link>
                    </Wrapper>
                    <Logout>
                    {logout ? 
                        <Link to="/">
                            <JustWrap onClick={handleLogout}>
                            <Icon src={logoutIcon} />
                            <p>Logout</p>
                        </JustWrap>
                        </Link>
                        :
                        <JustWrap onClick={handleLogout}>
                            <Icon src={logoutIcon} />
                            <p>Logout</p>
                        </JustWrap>}
                    </Logout>
                </Wrapper2>
                </>
                :
                <Wrapper2 h>
                    <Wrapper h>
                    <Link to="/Profile">
                        <JustWrap h onClick={set}>
                            <Icon src={userIcon} />
                            <p>Profile</p>
                        </JustWrap>
                    </Link>
                    </Wrapper>
                    <Logout h>
                        {logout ? 
                        <Link to="/">
                            <JustWrap onClick={handleLogout}>
                            <Icon src={logoutIcon} />
                            <p>Logout</p>
                        </JustWrap>
                        </Link>
                        :
                        <JustWrap onClick={handleLogout}>
                            <Icon src={logoutIcon} />
                            <p>Logout</p>
                        </JustWrap>}
                    </Logout>
                </Wrapper2>
            }
        </>
    )
}

export default DropDown