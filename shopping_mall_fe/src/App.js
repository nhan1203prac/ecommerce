
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,BrowserRouter, Route} from "react-router-dom"
import Navigation from './component/navigation';
import Home from './page/home';
import Login from './page/login';
import Signup from './page/signup';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';
import NewProduct from './page/NewProduct';
import ProductPage from './page/ProductPage';
import CategoryPage from './page/CategoryPage';
import ScollToTop from './component/ScollToTop';
import CartPage from './page/CartPage';
import OrderPage from './page/OrderPage';
import AdminDashBoard from './page/AdminDashboard';
import EditProductPage from './page/EditProductPage';
import { OrderContext } from './context/orderContext';
import { io } from "socket.io-client";
import axios from 'axios'
function App() {
  const {user,dispatchUser} = useContext(UserContext)
  const {orderdispatch} = useContext(OrderContext)
  useEffect(()=>{
    const socket = io("ws://localhost:8080");
        socket.off("notification").on("notification", (msgObj, user_id) =>{
      if(user_id===user._id){
        console.log(msgObj)
      }
    })

    socket.off("new-order").on("new-order", (msgObj) => {
      if (user.isAdmin) {
        console.log(msgObj)
        dispatchUser({type:"ADD_NOTIFICATION",payload:msgObj});


      }
      }

    );
    if(user){
      
      const res = axios.get(`/users/${user._id}`).then((res)=>
      dispatchUser({type:"UPDATE_USER",payload:res.data})
    )
    }

  },[])
  // console.log(notification)
  return (
    <div className="App">
        <BrowserRouter>
          <ScollToTop/>
            <Navigation/>
            <Routes>
                <Route index element={< Home/>}/>
                {!user&&(
                  <>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/signup' element={<Signup/>}/>
                  </>
                )}
                {user && (
                  <>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='/orders' element={<OrderPage/>}/>
                  </>
                )}

                {user && user.isAdmin&&(
                  <>
                    <Route path='/admin/' element={<AdminDashBoard/>}/>
                    <Route path='/product/:id/edit' element={<EditProductPage/>}/>
                  </>
                )}
                <Route path='/product/:id' element={<ProductPage/>}/>
                <Route path='/category/:category' element={<CategoryPage/>}/>

                <Route path="/new-product" element={<NewProduct/>}/>
                <Route path='*' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
