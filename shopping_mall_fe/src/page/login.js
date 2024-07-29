import { useState } from "react"
import { Button, Form, Col, Row } from "react-bootstrap"
import Container from "react-bootstrap/esm/Container"
import { Link } from "react-router-dom"
import './signup.css'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../context/userContext"
import { useContext } from "react"

const Login = () => {
    const [creadential, setCreadential] = useState({
        email: '',
        password: ''
    });
    const handleChange = (e) => {
        setCreadential((pre) => ({ ...pre, [e.target.id]: e.target.value }));
    };
    const {loading, dispatchUser, error } = useContext(UserContext)
    const [err,setErr] = useState("")
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatchUser({ type: "LOGIN_START" })
        try {
            const res = await axios.post('/users/login', creadential)
            // console.log(res.data)
            dispatchUser({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate('/')
        } catch (error) {
            // console.log()
            setErr(error.response.data)
            dispatchUser({ type: "LOGIN_FAILURE", payload: error.response ? error.response.data : "Something went wrong", })
            
        }
    }
    return (
        <Container>
            <Row>
                <Col md={6} className="login_form">
                    <Form style={{ width: "100%" }}>
                        <h1>Login to your account</h1>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' placeholder="Enter email" value={creadential.email} id='email' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder="Enter password" value={creadential.password} id='password' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={loading} onClick={handleLogin}>Login</Button>
                            
                        </Form.Group>
                       

                        <p>Don't have an account?
                            <Link to="/signup">Create account</Link>
                            
                            <>
                        <span className="error-message" style={{display:"block"}}>{err}</span>
                            </>
                        </p>
                    </Form>
                    
                        
                </Col>
                <Col md={6} className="login_image">
                </Col>
            </Row>
        </Container>
    )
}
export default Login
