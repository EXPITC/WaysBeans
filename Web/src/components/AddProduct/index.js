import { React ,useContext ,useState } from 'react';
import { API , handleError} from '../../config/api'
import {UserContext} from '../../Context/userContext'

import Header from '../Header';
import Clip from '../../img/clip.svg'
import AddImg from '../../img/add.png'
import { Wrapper ,Preview, InputSide ,Flex , Popout , Modal} from './AddProduct.styled'

const AddProduct = () => {
    const [success, setSuccess ] = useState(false)
    const { state } = useContext(UserContext)
    // const { user } = state
    const [form, setForm] = useState({
        title: '',
        image: '',
        price: '',
        stock: '',
        description: '',
    })
    let [pre , setPre] = useState(AddImg)
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        });
        if (e.target.type === "file") {
            try {
                setPre(URL.createObjectURL(e.target.files[0]));
            } catch (e) {
                setPre(AddImg)
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
            formData.set('stock', form.stock)
            formData.set('description', form.description)
            await API.post('/add/product', formData ,config)
            setForm({
                title: '',
                image: '',
                price: '',
                stock: '',
                description: ''
            })
            setPre(AddImg)
            setSuccess(true)
        } catch (err) {
            handleError(err)
        }
    }
   
    
    
    return (
        <>
            {success ? <Popout onClick={()=> setSuccess(false)}>
            <Modal>
                <p>Success Add Product</p>
            </Modal>
        </Popout> : null}
        <>
            <Header noTroll/>
            <Wrapper>
                <InputSide>
                    <h2>Add Product</h2>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="first"
                        onChange={handleChange}
                        value= {form.title}
                    />
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        className="first"
                        onChange={handleChange}
                        value= {form.stock}
                    />
                    <input
                        className="third"
                        type="text"
                        name="price"
                        placeholder="Price"
                        onChange={handleChange}
                        value= {form.price}
                    />
                    <textarea
                        type="text"
                        name="description"
                        placeholder="Description Product"
                        className="first"
                        onChange={handleChange}
                        value={form.description}
                    />
                    <label className="second" htmlFor='imgFile'>Photo Product
                    <img src={Clip}/>
                        <input type="file" name='image' id="imgFile" onChange={handleChange} hidden/>
                    </label>
                    <Flex >
                        <button onClick={handleSubmit}>Add Product</button>
                    </Flex>
                </InputSide>
                <Preview  src={pre} />
            </Wrapper>
        </>
        </>
    )
}
{/* <h1 >Add Product</h1>
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
                </WrapperMain> */}
export default AddProduct