import { React ,useState, useContext ,useEffect} from 'react';

import Header from '../Header';
import Clip from '../../img/clip.svg'
import map from '../../img/map.svg'
import Map from '../Map'
import { Wrapper, WrapperMain, Flex } from './EditProfile.styled'
import { API ,handleError } from '../../config/api'
import axios from 'axios'
import { UserContext } from '../../Context/userContext';
import {useNavigate} from 'react-router-dom'

const EditProfile = ({ U }) => {
    const navigate = useNavigate()
    const [showMap, setShowMap] = useState(false);
    const toggle = () => setShowMap(!showMap);
    const { state, dispatch } = useContext(UserContext)
    const { user } = state
    let isOwner = false
    if (user?.role === 'owner') {
      isOwner = true
    }
    const data = [
        {
            Title1 : (isOwner ?  'Edit Profile Partner':'Edit Profile'),
            Title2 : (isOwner ? 'Name Partner' : 'Full Name' )
        }
    ]
    let [pre , setPre] = useState(user?.image === null? Clip : user.image)
    const [form, setForm] = useState({
        fullname: user.fullname,
        image: user.image,
        email: user.email,
        phone: user.phone,
        location: user.location,
    })

    const [response, setResponse] = useState(null)
    const [loc, setLoc] = useState(user.location?.split(' '))
   
    useEffect(() => {
        if (loc) {
            try {
                axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc[0]}&lon=${loc[1]}`)
                    .then((res) => { setResponse(res.data) })
                    setForm({
                        ...form,
                        location: loc[0]+' '+loc[1]
                    })
            } catch (err) {
                console.log(err)
            }         
        }
    }, [loc])
    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })
        if (e.target.type === "file") {
            try {
                setPre(URL.createObjectURL(e.target.files[0]));
            } catch (e) {
                setPre(Clip)
            }
        }
        console.log(form)
    }
    const handleSubmit = async (e) => {
        try {
            
            e.preventDefault();
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            // const config2 = {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }
            const formData = new FormData();
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name);
            } else (
                formData.set('image', form.image)
            )
            formData.set('fullname', form.fullname)
            formData.set('email', form.email)
            formData.set('phone', form.phone)
            formData.set('location', form.location)
            await API.patch('/user', formData, config)
            const response = await API.get('/login')
            await dispatch({
                status: 'login',
                payload: response.data
            })
            navigate('/Profile')
        } catch (err) {
            handleError(err)
        }
    }
    return (
        <>
            {showMap ? <Map toggle={toggle} setLocEdit={setLoc}/>: null}
            <Header noTroll />
            <Wrapper>
                <h1 >{data[0].Title1}</h1>
                    <Flex btwn>
                        <input
                            type="text"
                            name="fullname"
                            placeholder={data[0].Title2}
                            className="first"
                            value={form.fullname}
                            onChange={handleChange}
                            />
                        <label className="second" htmlFor='imgFile'>Attach Image
                            <img src={pre}/>
                            <input type="file" name='image' id= "imgFile" hidden onChange={handleChange}/>
                        </label>
                    </Flex>
                    <input
                        className="third"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    ></input>
                    <input
                        className="third"
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                    ></input>
                    <Flex btwn>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            className="firsts"
                            value={response?.display_name}
                            />
                        <button className="secondbtn" onClick={toggle}>Select On Map
                            <img src={map}/>
                        </button>
                    </Flex>
                <WrapperMain>
                    <button onClick={handleSubmit}>Save</button>
                </WrapperMain>
            </Wrapper>
        </>
    )
}

export default EditProfile