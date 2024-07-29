import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import axios from 'axios'
import Loading from "../component/loading"
import ProductPreview from "./ProductPreview"
import {Container,Row,Col} from 'react-bootstrap'
import "./CategoryPage.css"
const CategoryPage = ()=>{
    const {category} = useParams()
    const [loading , setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(()=>{
        setLoading(true)
        axios.get(`/products/category/${category}`)
        .then((data)=>{
            setLoading(false)
            setProducts(data.data)
        }
        
    )
        .catch((e)=>{
            setLoading(false)
            console.log(e.message)
        })
        
    },[category])
    if(loading){
        <Loading/>
    }
    const productSearch = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return(
        <div className="category-page">
            <div className={`pt-3 ${category}-banner category-banner`}>
                <h1 className="text-center">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            </div>
            <div className="filters-container d-flex justify-content-center pt-4 pb-4">
                <input type="search" placeholder="Search" onChange={e=>setSearchTerm(e.target.value)}/>
            </div>
            {productSearch.length===0?(
                <h1>No products to show</h1>
            ):(
                <Container>
                    <Row>
                        <Col md={{span:10,offset:1}}>
                            <div className="d-flex justify-content-center align-items-center flex-wrap">
                                {productSearch.map(product=>{
                                   return <ProductPreview {...product}/>
                                })}
                            </div>
                        </Col>
                    </Row>
                </Container>
            )}
        </div>
    )
}
export default CategoryPage