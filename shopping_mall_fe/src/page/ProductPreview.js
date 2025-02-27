import {LinkContainer} from "react-router-bootstrap"
import {Card,Badge} from 'react-bootstrap'
const ProductPreview = ({_id,category,name,pictures})=>{
    return(
        <LinkContainer to = {`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
            <Card style={{width:"20rem",margin:"10px"}}>
                <Card.Img variant="top" className="product-preview-img" src = {pictures[0].url} style={{ height: "100px", objectFit: "contain" }} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Badge bg="warning" text="dark">
                        {category}
                    </Badge>
                </Card.Body>

                
            </Card>
        </LinkContainer>
    )
}
export default ProductPreview