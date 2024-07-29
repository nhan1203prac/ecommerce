import axios from 'axios'
import { useContext, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { UserContext } from '../context/userContext'
import { ProductContext } from '../context/productContext'
import { Link } from 'react-router-dom'
import "./DashBoardProduct.css"
const DashBoardProduct = ()=>{
    const {user} = useContext(UserContext)
    const {product,dispatch} = useContext(ProductContext)

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await axios.get("/products");
                dispatch({ type: "UPDATE_PRODUCT", payload: res.data });
                // console.log(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        if(product==null){
            fetchData()
        }
    },[])
    const handleDeleteProduct = async(id, user_id)=>{
        console.log(id)
        if(window.confirm("Are you sure?")){
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        user_id: user_id
                    }
                };
                
                const res = await axios.delete(`/products/${id}`,config)
                dispatch({type:"UPDATE_PRODUCT_AFTER_DELETE",payload:res.data})
                console.log(res.data)
            } catch (error) {
                console.log(error.message)
            }
        }

    }

    console.log(product)
    // console.log(user)
    return(
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th></th>
                    <th>Product Id</th>
                    <th>Product Pame</th>
                    <th>Product Price</th>

                </tr>

            </thead>
            <tbody>
    {product && product.length > 0 ? (
        product.map(p => (
            <tr key={p._id}>
                <td>
                    <img src={p.pictures[0].url} className='dashboard-product-preview'/>
                </td>
                <td>{p._id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                    <Button onClick={() => handleDeleteProduct(p._id, user._id)}>Delete</Button>
                    <Link to={`/product/${p._id}/edit`} className='btn btn-warning'>Edit</Link>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="5">No products available</td>
        </tr>
    )}
</tbody>

        </Table>
    )
}
export default DashBoardProduct