import {Button,Form,Col,Row, Alert} from "react-bootstrap"
import Container from "react-bootstrap/esm/Container"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import './signup.css'
import axios from "axios"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"

const Signup = ()=>{
    const [err,setErr] = useState("")
    const [creadential, setCreadential] = useState({
        name: '',
        email: '',
        password: ''
    }); 
    const { loading, dispatch, error } = useContext(UserContext)
    const navigate = useNavigate()
    const handleChange = (e)=>{
        setCreadential(pre=>({...pre,[e.target.id]:e.target.value}))
    }
    const handleRegister = async(e)=>{
        e.preventDefault()
        dispatch({type:"REGISTER_START"})
        try {
            const res = await axios.post("/users/signup",creadential)
            console.log(res.data)
            dispatch({type:"REGISTER_SUCCESS",payload:res.data})
            navigate('/')
        } catch (error) {
            setErr(error.response.data)
            dispatch({ type: "REGISTER_FAILURE", payload: error.response ? error.response.data : "Something went wrong", })
        }
    }
    return(
        <Container>
        <Row>
            <Col md={6} className="signup_form">
                <Form style={{width:"100%"}}>
                    <h1>Create an account</h1>
                    {error && <Alert variant="danger">{err}</Alert>}
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder="Name" value={creadential.name} id="name" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='email' placeholder="Enter email" value={creadential.email} id="email" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder="Enter password" value={creadential.password} id="password"  onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Button disabled={loading} onClick={handleRegister}>Register</Button>
                    </Form.Group>
                    <p>Do you have a account?
                        <Link to="/login">Let login</Link>
                    </p>
                </Form>
            </Col>
            <Col md={6} className="signup_image">
            </Col>
        </Row>
    </Container>
    )
}
export default Signup