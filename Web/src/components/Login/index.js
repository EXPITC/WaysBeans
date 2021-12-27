import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext';
import {API, handleError} from '../../config/api'

import Xbtns from '../../img/close.png';

import { Wrapper , Bg} from './Login.styled';

const Login = ({ show, Cancel, toggle,}) => {
    const navigate = useNavigate()
    const {state, dispatch} = useContext(UserContext)
    const holder = show;
    const [active, setActive] = useState(holder);
    useEffect(() => {
        setActive(!active);
    }, [holder])
    
    const [Form, setForm] = useState({
        email: '',
        password: '',
    })
    const handelChange = (e) => {
        setForm({
            ...Form,
            [e.target.name]: e.target.value
        })
    }

    const handelLogin = async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(Form)
            const response = await API.post("/login", body, config);
            if (response?.status === 200) {
                dispatch({
                    status: 'login',
                    payload: response.data
                })
            }
            if (response.data?.role === 'owner') {
                navigate('/Transaction')
            }
            Cancel()
        } catch (err) {
            handleError(err)
            if (err.response?.status === 400) {
                alert(err.response.data.message)
            }
        }
    }
    return (
        <>
        <Bg>
        <Wrapper active={active}>
                <div className="login-cointainer">
                    <img className="x-button-login2" onClick={Cancel} src={Xbtns} alt=""/>
                <form action="">
                        <h2>Login</h2>
                        <input type="email" name="email" placeholder="email" onChange={handelChange}/>
                        <input type="password" name="password" placeholder="password"  onChange={handelChange}/>
                        <button class="btnlogin2" onClick={handelLogin}>LOGIN</button>
                        <p class="dont-have-acc">Don't have an account ? Klik <span class="singup-here" onClick={toggle}>Here</span></p>
                    </form>
                </div>
        </Wrapper>
        </Bg>
        </>
    )
};

export default Login;