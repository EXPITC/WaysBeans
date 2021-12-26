import { React ,useContext ,useState ,useEffect} from 'react';
import { API , handleError} from '../../config/api'
import { UserContext } from '../../Context/userContext'
import convertRupiah from 'rupiah-format'
import {io} from 'socket.io-client'
import Header from '../Header';
import Clip from '../../img/clip.svg'
import Icon from '../../img/Icon.svg'

import { Wrapper, Preview , InputSide, Flex, FlexCollum, Pp ,Popout ,Modal} from './Checkout.styled'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

let socket;
const AddProduct = () => {
    const navigate = useNavigate()
    const [orderStatus ,setOrderStatus] = useState(false)
    const { state } = useContext(UserContext)
    const { user } = state
    const [refresh,setRefresh]= useState(false)
    const [order, setOrder] = useState([])
    const [transaction, setTransaction] = useState([])
    const [total, setTotal] = useState([])
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        postcode: '',
        attachment: '',
        status: 'Waiting Approve',
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
            formData.set('name', form.name)
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name);
            }
            formData.set('email', form.email)
            formData.set('phone', form.phone)
            formData.set('status', form.status)
            formData.set('address', form.address)
            formData.set('postcode', form.postcode)
            formData.set('attachment', form. attachment)
            await API.patch(`/transaction/${transaction.id}`, formData ,config)
            setForm({
                name: '',
                email: '',
                phone: '',
                address: '',
                postcode: '',
                attachment: '',
                status: 'Waiting Approve',
            })
            setPre(Clip)
            setOrderStatus(true)
            socket.emit('newtransactions', 'catch')
            socket.emit('toOrder')
        } catch (err) {
            handleError(err)
        }
    }
   
    useEffect(() => {
        socket = io('http://localhost:5000', {
            auth: {
                token: localStorage.getItem("token") 
            },
            query: {
                id: state.user.id
            }
        })
        socket.on('connect', () => {
            console.log(socket);
        })
        socket.emit('toOrder', 'catch')
        // socket.emit('newtransactions', 'catch')
        socket.on("connect_error", (err) => {
            console.error(err.message); 
        });
        
        return () => {
            socket.disconnect()
        }
    }, [])
    useEffect(async () => {
        await API.get('/order/count')
            .then(res => setTotal(res.data.total))
            .catch(err => handleError(err))
        await API.get('/transaction/active')
            .then(res => {
                setOrder(res.data.data.transactions[0].product);
                setTransaction(res.data.data.transactions[0])
            })
            .catch(err => { handleError(err); navigate('/');})
    }, [])
    useEffect(() => {
        if (transaction.status === 'Waiting Approve' ) {
            setOrderStatus(true)
        }
    },[transaction])
    const check = (state,x) => {
        let y = x.split('T')[0]
        let z = y.split('-')
        switch (state) {
            case 'day': 
                return (new Date(z[0], z[1], z[2]).toLocaleString('en-us', { weekday: 'long' }))
            case 'month': 
                return (new Date(z[0], z[1] - 1, z[2]).toLocaleString('en-us', { month: 'long' }))
            case 'oneDay':
                return z[2]
            case 'year':
                return z[0]
        }
        
    }
  
    return (
        <>
            {orderStatus ? <Popout>
                <Modal>
                    <p>Thank you for ordering in us, please wait 1 x 24 hours to verify you order</p>
                </Modal>
            </Popout> : null}
        <>
            <Header noTroll/>
            <Wrapper>
                <InputSide>
                    <h2>Shipping</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="first"
                        onChange={handleChange}
                        value= {form.name}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="first"
                        onChange={handleChange}
                        value= {form.email}
                    />
                    <input
                        className="third"
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                        value= {form.phone}
                    />
                     <textarea
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="first"
                        onChange={handleChange}
                        value={form.address}
                    />
                      <input
                        className="third"
                        type="text"
                        name="postcode"
                        placeholder="Post Code"
                        onChange={handleChange}
                        value= {form.postcode}
                    />
                    <label className="second" htmlFor='imgFile'>Attache of transaction
                    <img src={pre}/>
                        <input type="file" name='image' id="imgFile" onChange={handleChange} hidden/>
                    </label>
                </InputSide>
                <Flex >
                    {order.map((x) => {
                        return (
                        <>
                        <Flex w>
                        <Preview src={x.img}/>
                        <FlexCollum btwn>
                            <div>
                                <h1>{x.title}</h1>
                                <Pp n b>{check('day',x.order.createdAt)} </Pp>
                                <Pp n a>{check('oneDay',x.order.createdAt)} ,{check('month',x.order.createdAt)} ,{check('year',x.order.createdAt)}</Pp>
                            </div>
                            <Pp >Price : {convertRupiah.convert(x.price)}</Pp>
                            <Pp >Qty : {x.order.qty}</Pp>
                            <Pp bb b>Sub Total : {convertRupiah.convert(x.price * x.order.qty)}</Pp>
                        </FlexCollum>
                        <Preview I src={Icon}/>
                        </Flex>
                        </>
                        )
                    })}
                        <button onClick={handleSubmit}>Pay</button>
                </Flex>
            </Wrapper>
        </>
        </>
    )
}

export default AddProduct