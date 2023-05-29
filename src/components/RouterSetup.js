import React ,{useState,useEffect,useContext} from 'react';
import jwt from 'jsonwebtoken';
//React router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import DetailPage from './DetailPage';
import ProfilePage from './ProfilePage';
import TransactionPage from './TransactionPage';
import CartPage from './CartPage';
import AddProduct from './AddProduct';
import Product from './Product';
import LandingPage from './LandingPage';
import Header from './Header';
import Checkout from './Checkout';
import DetailTrans from './detailTrans';

import {API, handleError} from '../config/api'
import { UserContext } from '../Context/userContext';


const RouterSetup = () => {

    const {state, dispatch} = useContext(UserContext)
    const check = async () => {
      try {
        const res = await API.get('/login')
        const verify = jwt.verify(res.data.token, process.env.REACT_APP_JWT_TOKEN);
        const {role } = verify
        dispatch({
          status: 'login',
          payload: {...res.data,role}
        })
      } catch (err) {
        handleError(err)
      }
    }
    useEffect(() => {
        check()
    }, [])
  const { isLogin, user } = state
  let isOwner = false
  if (user.role === 'owner') {
    isOwner = true
  }
    return (
        <Router>
            <Routes>
          {isLogin ?
            <>
             <Route exact path="/" element={<LandingPage />}/>
             {/* <Route path="/Edit/Profile" element={<EditProfile/>}/> */}
             <Route path="/Detail/:id" element={<DetailPage/>}/>
              {isOwner ?
                <>
                <Route path="/Store" element={<Product/>}/>
                <Route path="/Transaction" element={<TransactionPage/>}/>
                <Route path="/Add-Product" element={<AddProduct />}/>
                </>
                :
                <>
                <Route path="/Profile" element={<ProfilePage/>}/>
                <Route exact path="/Cart" element={<CartPage/>} />
                <Route exact path="/Transaction/detail/:id" element={<DetailTrans/>} />
                <Route exact path="/Cart/Checkout" element={<Checkout/>} />
                </>
              }
             </>
            :
            <Route exact path="/" element={<LandingPage />} />}
                <Route path="*" element={<><Header/><h1>Error 404 </h1></>}/>
            </Routes>
    </Router>
    )
}

export default RouterSetup