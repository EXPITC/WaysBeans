import { React ,useContext ,useState} from 'react';
import { API , handleError} from '../../config/api'
import {UserContext} from '../../Context/userContext'

import Header from '../Header';
import Clip from '../../img/clip.svg'
import { Wrapper ,WrapperMain ,Flex} from './AddProduct.styled'

const AddProduct = () => {
    const { state } = useContext(UserContext)
    // const { user } = state
    const [form, setForm] = useState({
        title: '',
        image: '',
        price: ''
    })
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
            const formData = new FormData();
            formData.set('title', form.title)
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name);
            }
            formData.set('price', form.price)
            await API.post('/add/product', formData ,config)
            setForm({
                title: '',
                image: '',
                price: ''
            })
            setPre(Clip)
        } catch (err) {
            handleError(err)
        }
    }
   
    
    
    return (
        <>
            <Header noTroll/>
            <Wrapper>
                <h1 >Add Product</h1>
                    <Flex btwn>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            className="first"
                            onChange={handleChange}
                            value= {form.title}
                            />
                        <label className="second" htmlFor='imgFile'>Attach Image
                            <img src={pre}/>
                        <input type="file" name='image' id="imgFile" onChange={handleChange}hidden/>
                        </label>
                    </Flex>
                    <input
                        className="third"
                        type="text"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        value= {form.price}
                        />
                <WrapperMain>
                    <button onClick={handleSubmit}>Save</button>
                </WrapperMain>
            </Wrapper>
        </>
    )
}

export default AddProduct