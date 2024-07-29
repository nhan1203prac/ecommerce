import {Col, Container, Nav, Row, Tab} from "react-bootstrap"
import DashBoardProduct from "../component/DashBoardProduct"
import DashBoardOrder from "../component/DashBoardOrder"
import DashBoardClient from "../component/DashBoardClient"
function AdminDashBoard(){
    return(
        <Container>
            <Tab.Container defaultActiveKey="products">
                <Row>
                    <Col md={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="products">Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">Orders</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="clients">Clients</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={10} >
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                                <DashBoardProduct />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <DashBoardOrder />
                            </Tab.Pane>
                            <Tab.Pane eventKey="clients">
                                <DashBoardClient />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}
export default AdminDashBoard