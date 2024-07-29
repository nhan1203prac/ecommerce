import { Row ,Col} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap";
import categories from "../categories"
import { Link } from "react-router-dom"
import './home.css'
import { useContext, useEffect } from "react";
import axios from "axios"
import { ProductContext } from "../context/productContext";
import ProductPreview from "./ProductPreview";
const Home = ()=>{
    const {product,dispatch} = useContext(ProductContext)
    // const lastProducts = product.slice(0,8)
    console.log(product)

    useEffect(()=>{
        
            // const res = axios.get("/products").then((res)=>dispatch({type:"UPDATE_PRODUCT",payload:res.data}))
            // console.log(res.data)
       const fetchData = async()=>{
            try {
                const res =await axios.get("/products")
                dispatch({type:"UPDATE_PRODUCT",payload:res.data})
                // console.log(res.data)
            } catch (error) {
                
            }
       }
       fetchData()
        
        
    },[])
    const lastProducts = Array.isArray(product) ? product.slice(0, 8) : [];

    return(
        <div>
            <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" className="home-banner"/>
            <div className="featured-products mt-4">
                <h2>Last Products</h2>
                <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts?lastProducts.map((product,index)=>(
                        <ProductPreview key={index} {...product}/>
                    )):<></>}
                </div>
                <div>
                    <Link to="/category/all" style={{textAlign:"right",display:"block" ,textDecoration:"none"}}>
                        See more
                    </Link>

                </div>
            </div>
            <div className="sale-banner mt-4">
                <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png"/>
            </div>
            <div className="recent-products mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category,index)=>(
                         <LinkContainer key={index} to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{backgroundImage:`linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${category.img})`,gap:"10px"}} className="category-title">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>

        </div>
    )
}
export default Home