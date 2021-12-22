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
        fullname: '',
        gender: '',
        phone: '',
        role: '',

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
            console.log(response.data.data.user.role)
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
        <Bg>
        <Wrapper active={activeR}>
           <div class="singup2-cointainer">
                <img class="x-button-singup2" onClick={Cancel} src={Xbtns} alt=""/>
                <form >
                    <h2>Register</h2>
                    <input type="email" name="email" placeholder="Email" onChange={handelChange}/>
                    <input type="password" name="password" placeholder="Password" onChange={handelChange}/>
                    <input type="text" name="fullname" placeholder="Full Name" onChange={handelChange}/>
                    <select id="Gender" name="gender" onChange={handelChange}>
                        <option hidden>Select Gender</option>
                        <option value="Gender" disabled>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input type="number" name="phone" placeholder="Phone Number" onChange={handelChange}/>
                    <select id="role" name="role" onChange={handelChange}>
                        <option hidden >As User</option>
                        <option value="As User" disabled >As User</option>
                        <option value="costumer">Costumer</option>
                        <option value="owner">Owner</option>
                    </select>
                    <button class="btnsingup2" onClick={handelSubmit}>SINGUP</button>
                    <p class="already-have-acc">Already have an account ?  <span class="login-here" onClick={toggle}>Klik Here</span></p>
                </form>
            </div>
        </Wrapper>
        </Bg>
    )
}

export default Register;