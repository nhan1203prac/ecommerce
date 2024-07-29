import {
    PaymentElement,
    useStripe,
    useElements,
    CardElement
  } from '@stripe/react-stripe-js';
import { UserContext } from '../context/userContext';
import { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { OrderContext } from '../context/orderContext';
import { Button ,Form,Col,Row,Alert} from 'react-bootstrap';
import axios from 'axios'
function CheckoutForm(){
    const stripe = useStripe()
    const elements = useElements()
    const {user,dispatchUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState("")
    const {order,isLoading,isError} = useContext(OrderContext)
    const [country, setCountry] = useState("")
    const [address, setAddress] = useState("")
    const [paying,setPaying] = useState(false)
    const handlePay = async(e)=>{
        e.preventDefault()
        if(!elements||!stripe||user.cart.count<=0)
            return;
        setPaying(true)
        try {
            const response = await axios.post('/create-payment', {amount:user.cart.total}, {
                headers: {
                    'Content-Type': 'application/json', // Thiết lập Content-Type là JSON
                },
            });
    
            // Xử lý phản hồi
            console.log(response.data);
            const {client_secret} = response.data
            const {paymentIntent} = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card:elements.getElement(CardElement)
                }
            })
            setPaying(false)
            if(paymentIntent){
                const res = await axios.post("/orders",{userId:user._id,cart:user.cart,address,country})
                .then((res)=>{
                    if(!isLoading &&!isError){
                        setAlertMessage(`Payment ${paymentIntent.status}`)
                        console.log(res.data)
                        dispatchUser({type:"UPDATE_USER",payload:res.data})

                        setTimeout(()=>{
                            navigate("/orders")
                        },1000)
                    }
                })
            }
        } catch (error) {
            // Xử lý lỗi
            console.error('Có lỗi xảy ra:', error);
        }

        
        }
    return(
        <Col className="cart-payment-container">
            <Form onSubmit={handlePay}>
                <Row>
                    {alertMessage && <Alert>{alertMessage}</Alert>}
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" value={user.name} disabled />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Email" value={user.email} disabled />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={7}>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                <label htmlFor="card-element">Card</label>
                <CardElement id="card-element" />
                <Button className="mt-3" type="submit" disabled={user.cart.count <= 0 || paying || isLoading}>
                    {paying ? "Processing..." : "Pay"}
                </Button>
            </Form>
        </Col>
    )
}
export default CheckoutForm