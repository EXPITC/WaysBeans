import { React ,useContext, useState ,useEffect } from 'react';
import {Link ,useNavigate} from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import { API , handleError} from '../../config/api';
import {io} from 'socket.io-client'
import convertRupiah from 'rupiah-format'
import Barcode from './barcode';

import Header from '../Header'
import Icon from '../../img/Icon.svg'
import { Wrapper ,FlexCollum,TextW, Flex ,Pp ,Pp2, ButtonsC ,ButtonsComp, ButtonsW ,ButtonsS,Preview ,Spliter} from './ProfilePage.styled';

let socket;

const ProfilePage = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext)
    const { user } = state
    let isOwner = false
    if (user?.role === 'owner') {
      isOwner = true
    }
    const [refresh,setRefresh] =  useState()
    const [historyTransaction,setHistoryTransaction] =  useState([])
    const [transaction, setTransaction] = useState()
    // useEffect(() => {
    //     API.get('/transaction/active')
    //         .then(res => setTransaction(res))
    //         .catch(err => handleError(err))
    // }, [refresh])

    const data = [
        {
            title1: (isOwner? 'Profile Partner' : 'My Profile'),
            title2: (isOwner? 'History Order' :'History Transaction'),
            titleName: (isOwner?'Name Partner':'Full Name'),
            img: (isOwner?'Partner':'profile'),
            history: (isOwner? 'Andi' :'Geprek Bensu')
        }
    ]

   useEffect(() =>{
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
    socket.on('newtransactions', (x) => {
        // console.log(x)
        // loadTrans()
    })
    // socket.emit("loadTransaction",state.user.id)
    loadTrans()
    socket.on("connect_error", (err) => {
        console.error(err.message); 
    });
    return () => {
        socket.disconnect()
    }
   }, [])
    const loadTrans = () => {
        socket.emit("loadTransaction",state.user.id)
        socket.on("transaction", (data) => {
            setHistoryTransaction(data)
        })
    }
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
    const [pre, setPre] = useState(user?.image)

    const handleChange = async (e) => {
        try {
        let x =  e.target.files[0]
        setPre(URL.createObjectURL(e.target.files[0]));
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const formData = new FormData();
            formData.set("image", x, x?.name);
            await API.patch('/user', formData, config)
            const response = await API.get('/login')
            await dispatch({
                status: 'login',
                payload: response.data
            })
        } catch (err) {
            handleError(err)
        }
    }

    return (
        <>
            <Header/>
            <Wrapper>
                <FlexCollum>
                    <h1>{data[0].title1}</h1>
                    <Flex>
                        <FlexCollum>
                        <label className="second" htmlFor='imgFile'>
                            <img className="img" src={pre} alt={user.fullname}/>
                            <input type="file" name='image' id= "imgFile" hidden onChange={handleChange}/>
                        </label>
                        </FlexCollum>
                        <FlexCollum className="h">
                            <div>
                                <Pp b c>{data[0].titleName}</Pp>
                                <Pp>{user.fullname}</Pp>
                            </div>
                            <div>
                                <Pp b c>Email</Pp>
                                <Pp>{user.email}</Pp>
                            </div>
                        </FlexCollum>
                    </Flex>
                </FlexCollum>
                <FlexCollum>
                    <h1>{data[0].title2}</h1>
                    {/* Loop */}
                    {historyTransaction.map((x) => 
                        <>
                        {
                            x.product.map((y) => {
                                return (
                                    <Flex w onClick={() => { navigate(`/Transaction/detail/${x.id}`) }} key={x.id}>
                                    <Spliter>
                                    <Preview src={y.img}/>
                                    <FlexCollum >
                                        <div className={'split'}>
                                            <h1> {y.title}</h1>
                                            <Pp2 n b>{check('day',y.order.createdAt)} </Pp2>
                                            <Pp2 n a>{check('oneDay',y.order.createdAt)} ,{check('month',y.order.createdAt)} ,{check('year',y.order.createdAt)}</Pp2>
                                        </div>
                                        <Pp2 >Price : {y.price}</Pp2>
                                        <Pp2 >Qty : {y.order.qty}</Pp2>
                                        <Pp2 bb b>Sub Total : {convertRupiah.convert(y.price * y.order.qty)}</Pp2>
                                    </FlexCollum>
                                    </Spliter>
                                    {x.status === 'Cancel' ?
                                    <FlexCollum  btwn i c t>
                                        <img src={Icon} className={'icon'}/>
                                        <Barcode src={x.status}/>
                                        <ButtonsC c red>{x.status}</ButtonsC>
                                    </FlexCollum> : null
                                    }
                                    {
                                        x.status === 'Waiting Approve' ?
                                        <FlexCollum  btwn i c t >
                                            <img src={Icon} className={'icon'}/>
                                            <Barcode src={x.status}/>
                                            <ButtonsW w><TextW >{x.status}</TextW></ButtonsW>
                                        </FlexCollum> 
                                        :null
                                    }
                                    {
                                        x.status === 'On The Way' ?
                                            <FlexCollum  btwn i t c>
                                            <img src={Icon} className={'icon'}/>
                                            <Barcode src={x.status}/>
                                            <ButtonsS>{x.status}</ButtonsS>
                                        </FlexCollum> 
                                        :null
                                        }
                                     {
                                        x.status === 'Succes' ?
                                            <FlexCollum  btwn i t c>
                                            <img src={Icon} className={'icon'}/>
                                            <Barcode src={x.status}/>
                                            <ButtonsS>{x.status}</ButtonsS>
                                        </FlexCollum> 
                                        :null
                                    }
                                    </Flex>
                                )
                            })
                        }
                        
                        </>
                    )}
                </FlexCollum>
            </Wrapper>
        </>
    )
}

export default ProfilePage;