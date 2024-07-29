
import { Button, Form, Col, Row,Alert } from "react-bootstrap"
import Container from "react-bootstrap/esm/Container"
import { Link } from "react-router-dom"
import "./NewProduct.css"
import { useNavigate } from "react-router-dom"
import { useState,useContext } from "react"
import { ProductContext } from "../context/productContext"
import axios from 'axios'

function NewProduct(){
    // const [creadential, setCreadential] = useState({
    //     name:'',
    //     description:"",
    //     price:"",
    //     category:"",
    //     images:[],
    //     imgToRemove:null,
    // })
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [images,setImages] = useState([])
    const [imgToRemove,setImgToRemove] = useState(null)

    const {product,success,error,loading,dispatch} = useContext(ProductContext)

    const handleRemoveImg = async(imgObj)=>{
        // setImgToRemove(imgObj.public_id)
        console.log(imgObj.public_id)
        try {
            await axios.delete(`/images/${imgObj.public_id}`)
            setImages(prev=>prev.filter(img=>img.public_id !== imgObj.public_id))
        } catch (error) {
            console.log(error)
        }
        
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!name ||  !description  ||!price||!category)
            alert("Please fill out all the fields")
        dispatch({type:"CREATE_START"})
        try {
            const res = await axios.post("/products",{name,description,price,category,images})
            dispatch({type:"CREATE_SUCCESS",payload:res.data})
            navigate('/')
        } catch (error) {
            dispatch({ type: "CREATE_FAILURE", payload: error.response ? error.response.data : "Something went wrong", })
        }
    
        

}
    const showWidget = ()=>{
        const widget = window.cloudinary.createUploadWidget(
            {
            cloudName:"dqmlemao7",
            uploadPreset:"imgload",
        },(error,result)=>{
            if(!error && result.event ==="success"){
                setImages(prev=>[...prev,{url:result.info.url,public_id:result.info.public_id}])
            }
        })
        widget.open()
    }
    return(
        <Container>
            <Row>
                <Col md={6} className = "new-product-container">
                <Form style={{ width: "100%" }}>
                        <h1 className="mt-4">Create a product</h1>
                        {success&& <Alert>Create product success</Alert>}
                        {error&& <Alert>{error}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type='text' placeholder="Enter product name" value={name}  onChange={e=>setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter product description" value={description}  onChange={e=>setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Price($)</Form.Label>
                            <Form.Control type='number' placeholder="Enter price" value={price}  onChange={e=>setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" onChange={e=>setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select>
                                <option disabled selected>--Select One--</option>
                                <option value="technology">technology</option>
                                <option value = "tables">tables</option>
                                <option value="phones">phones</option>
                                <option value="laptops">laptops</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type="button" onClick={showWidget}>Upload Images</Button>
                            <div className="images-preview-container">
                                {images.map(image=>(
                                    <div className="image-preview">
                                        <img src={image.url}/>
                                        <i className="fa fa-times-circle" onClick={()=>handleRemoveImg(image)}/>
                                    </div>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={loading} onClick={handleSubmit} >Create Product</Button>
                            
                        </Form.Group>
                       

                
                    </Form>
                </Col>
                <Col md={6} className="img-product-container">
                </Col>
            </Row>
        </Container>
    )
}
export default NewProduct