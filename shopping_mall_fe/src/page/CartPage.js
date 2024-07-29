import { useContext, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { ProductContext } from "../context/productContext"
import {Container,Row,Alert, Col, Table} from "react-bootstrap"
import {loadStripe} from "@stripe/stripe-js"
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios'
import "./CartPage.css"
import CheckoutForm from "../component/checkoutForm"

const stripePromise = loadStripe("pk_test_51P5IjLP1PtyodjX47SnvBY3JoM9TeTPxLhuM8gmzWXCT8zGei2uAIg9dj3Jl01FAPtVmGgHNLMAzYv92dmEa7y5O00Icax3DvC")

const CartPage = () => {
    const { product, dispatch } = useContext(ProductContext);
    const { user,dispatchUser } = useContext(UserContext);
    const userCartObj = user.cart;
    let cart = [];

    if (product) { // Kiểm tra nếu product không rỗng
        cart = product.filter(p => userCartObj[p._id] != null);
    }
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/products");
                dispatch({ type: "UPDATE_PRODUCT", payload: res.data });
                // console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []); 

    const handleDecrease = async(e,product)=>{
        e.preventDefault()
        const quantity = user.cart.count;
        if (quantity <= 0) return alert("Can't proceed");
        try {
            const res = await axios.post("/products/decrease-cart",product)
        // dispatch({type:"DECREASE_CART",payload:res.data})
        dispatchUser({type:"DECREASE_CART",payload:res.data})
        } catch (error) {
            
        }

    }
    const handleIncrease = async(e,product)=>{
        e.preventDefault()
        const quantity = user.cart.count;
        if (quantity <= 0) return alert("Can't proceed");
        try {
            const res = await axios.post("/products/increase-cart",product)
        // dispatch({type:"DECREASE_CART",payload:res.data})
        dispatchUser({type:"INCREASE_CART",payload:res.data})
        } catch (error) {
            
        }

    }
    
    const removeFromCart = async(e,product)=>{
        e.preventDefault()
        try {
            const res = await axios.post("/products/remove-from-cart",product)
            dispatchUser({type:"REMOVE_FROM_CART",payload:res.data})
        } catch (error) {
            
        }
    }
    return (
        <Container style={{ minHeight: "95vh" }} className="cart">
            <Row>
                <Col md={7}>
                    <h1 className="pt-2 h3">Shopping cart</h1>
                    {cart.length === 0 ? <Alert variant="info">Shopping cart is empty. Add products to your cart</Alert> : <Elements stripe={stripePromise}><CheckoutForm/></Elements>}
                </Col>
                <Col md={5}>
                    {cart.length>0 && (
                        <>
                            <Table responsive="sm">  
                                <thead>
                                    <tr>
                                        <th>&nbsp;</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quanlity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item,index)=>(
                                        <tr key={index}>
                                            <td>&nbsp;</td>
                                            <td>
                                                <i className="fa fa-times" style={{marginRight:"10px", marginLeft:"10px", cursor:"pointer"}} onClick={e=>removeFromCart(e,{ productId: item._id, price: item.price, userId: user._id})}></i>
                                                <img src={item.pictures[0].url} style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                                            </td>
                                            <td>{item.price}</td>
                                            <td>
                                                <span className="quantity-indicator">
                                                    <i className="fa fa-minus-circle" onClick={(e)=>handleDecrease(e,{ productId: item._id, price: item.price, userId: user._id})}></i>
                                                    <span>{user.cart[item._id]}</span>
                                                    <i className="fa fa-plus-circle" onClick={(e)=>handleIncrease(e,{ productId: item._id, price: item.price, userId: user._id})}></i>
                                                </span>
                                            </td>
                                            <td>${item.price * user.cart[item._id]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div>
                                <h3 className="h4 pt-4">Total: ${user.cart.total}</h3>
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;

