import React, { useState, useEffect, useContext } from 'react';
import { API, handleError } from '../../config/api'
import { Wrappper , Flexx } from './AddResto.styled.'
import { Wrapper ,WrapperMain ,Flex} from '../AddProduct/AddProduct.styled'
import Header from '../Header';
import Clip from '../../img/clip.svg'
import Map from '../Map'
import map from '../../img/map.svg'
import { UserContext } from '../../Context/userContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const AddResto = () => {
    const navigate = useNavigate()
    const { state } = useContext(UserContext)
    const {user} = state
    const [showMap, setShowMap] = useState(false);
    const toggle = () => setShowMap(!showMap);
    
    const [form, setForm] = useState({
        title: '',
        img: '',
        loc:''
    })
    const [loc, setLoc] = useState(user.location?.split(' '))
    const [address, setAddress] = useState(null)
    useEffect(() => {
        if (loc) {
            try {
                axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc[0]}&lon=${loc[1]}`)
                    .then((res) => { setAddress(res.data.display_name) })
                    setForm({
                        ...form,
                        loc: loc[0]+' '+loc[1]
                    })
            } catch (err) {
                console.log(err)
            }         
        }
    }, [loc])
    let [pre , setPre] = useState(Clip)
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
            try {
                setPre(URL.createObjectURL(e.target.files[0]));
            } catch (e) {
                setPre(Clip)
            }
        }
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.set('title', form.title)
            if (form.img) {
                formData.set("img", form.img[0], form.img[0].name);
            }
            formData.set('loc', form.loc)
            console.log(formData)
            const res = await API.post('/add/resto', formData ,config)
            navigate(`/Resto/${res.data.data.resto.response.id}`)
        } catch (err) {
            handleError(err)
        }
    }
    const handleSubmit2 = async (e) => {
        try {
            e.preventDefault();
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            let formData = new FormData();
            formData.set('title', form.title)
            if (form.img) {
                formData.set("img", form.img[0], form.img[0].name);
            }
            formData.set('loc', form.loc)
            console.log(formData)
            const res = await API.post('/add/resto', formData ,config)
            navigate(`/Resto/${res.data.data.resto.response.id}`)
        } catch (err) {
            handleError(err)
        }
    }
    return (
        <>
            {showMap ? <Map toggle={toggle} setLocEdit={setLoc}/>: null}
        <Header/>
        <Wrappper>
        <Wrapper>
                <h1 >Add Resto</h1>
                    <Flexx btwn>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            className="first"
                            onChange={handleChange}
                            // value= {form.title}
                            />
                        <label className="second" htmlFor='imgFile'>Attach Image
                            <img src={pre} />
                            <input type="file" name='img' id="imgFile" onChange={handleChange}hidden/>
                        </label>
                    </Flexx>
                      <Flex btwn>
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            className="firsts"
                            value={address}
                            />
                        <button className="secondbtn" onClick={toggle}>Select On Map
                            <img src={map}/>
                        </button>
                    </Flex>
                <WrapperMain>
                    <button onClick={handleSubmit}>Save</button>
                </WrapperMain>
            </Wrapper>
            </Wrappper>
        </>
        
    )
}


export default AddResto