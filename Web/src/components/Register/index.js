import { React, useState, useEffect ,useContext } from 'react'
import {API, handleError} from '../../config/api'
import { Wrapper ,Bg } from './Register.style'
import Xbtns from '../../img/close.png';
import { UserContext } from '../../Context/userContext';
import { useNavigate} from 'react-router-dom'

const Register = ({ showR , Cancel , toggle , RegisterSwitch ,}) => {
    const {state, dispatch} = useContext(UserContext)
    let holder = showR;
    let [activeR, setActiveR] = useState(holder);
    useEffect(() => {
        setActiveR(!activeR);
    }, [holder])
    const navigate = useNavigate()
    const [Form, setForm] = useState({
        email: '',
        password: '',
        fullname: ''
    })
    const handelChange = (e) => {
        setForm({
            ...Form,
            [e.target.name]: e.target.value
        })
    }
    const handelSubmit = async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body =  JSON.stringify(Form)
            const response = await API.post("/register", body, config);
            if (response?.status === 201) {
                return alert(response.data.message)
            }

            if (response?.status === 200) {
                dispatch({
                    status: 'login',
                    payload: response.data.data.user
                })
                // RegisterSwitch()
            }

            if (response.data.data.user.role === 'owner') {
                navigate('/Transaction')
            }
        } catch (err) {
            handleError(err)
            if (err.response?.status === 400) {
                alert(err.response.data.messsage)
            }
        }
    }
    return (
        <>
        <Bg>
        <Wrapper active={activeR}>
        <div className="singup-cointainer">
                    <img className="x-button-singup2" onClick={Cancel} src={Xbtns} alt=""/>
                <form action="">
                        <h2>Register</h2>
                        <input type="email" name="email" placeholder="email" onChange={handelChange}/>
                        <input type="password" name="password" placeholder="password"  onChange={handelChange}/>
                        <input type="text" name="fullname" placeholder="Full Name" onChange={handelChange}/>
                        <button class="btnsingup2" onClick={handelSubmit}>SINGUP</button>
                        <p class="dont-have-acc">Don't have an account ? Klik <span class="login-here" onClick={toggle}>Here</span></p>
                    </form>
                </div>
        </Wrapper>
        </Bg>
        </>
    )
}

export default Register;