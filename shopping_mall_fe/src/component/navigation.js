import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { UserContext } from "../context/userContext";
import { useContext, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./navigation.css";
import axios from "axios";
import Loading from "./loading"
import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const { user, dispatchUser } = useContext(UserContext);
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const [bellPos, setBellPos] = useState({});
  const navigate = useNavigate()
  // console.log(user);
  // const handleLogout = () => {
  //   setLoading(true)
  //   setTimeout(()=>{
  //     dispatchUser({ type: "LOGOUT" });
  //   },1500)
  //   setLoading(false)
  // };
  const handleLogout = async () => {
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        dispatchUser({ type: "LOGOUT" });
        navigate("/login");
    } catch (error) {
        console.error("Error during logout:", error);
    } finally {
    }
};

  // Đếm tin chưa đọc
  const unreadNotifications = user?.notifications.reduce((acc, curr) => {
    if (curr.status == "unread") return acc + 1;
    return acc;
  }, 0);

  const handleToggleNotifications = async () => {
    // Lấy vị trí của chuông thông báo
    const position = bellRef.current.getBoundingClientRect();
    setBellPos(position);

    // Hiển thị hoặc ẩn container thông báo
    notificationRef.current.style.display =
      notificationRef.current.style.display === "block" ? "none" : "block";

    // Nếu có thông báo chưa đọc
    if (unreadNotifications > 0) {
      try {
        // Gọi API để cập nhật trạng thái thông báo
        const res = await axios.post(`/users/${user._id}/updateNotifications`);

        // Cập nhật dữ liệu người dùng
        dispatchUser({ type: "UPDATE_USER", payload: res.data });
      } catch (error) {
        console.error("Error updating notifications:", error);
      }
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Ecomern</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            {user && !user.isAdmin && (
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>
                  {user?.cart.count > 0 && (
                    <span className="badge badge-warning" id="cartcount">
                      {user.cart.count}
                    </span>
                  )}
                </Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <>
                <Nav.Link
                  style={{ position: "relative" }}
                  onClick={handleToggleNotifications}
                >
                  <i
                    className="fas fa-bell"
                    ref={bellRef}
                    data-count={unreadNotifications}
                  ></i>
                </Nav.Link>
                <NavDropdown
                  title={user.email || "Dropdown"}
                  id="basic-nav-dropdown"
                >
                  {user.isAdmin && (
                    <>
                      <LinkContainer to="/admin">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/new-product">
                        <NavDropdown.Item>Create product</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  {!user.isAdmin && (
                    <>
                      <LinkContainer to="/cart">
                        <NavDropdown.Item>Cart</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orders">
                        <NavDropdown.Item>My orders</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Divider />
                  <Button
                    variant="danger"
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    Logout
                  </Button>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div
        className="notifications-container"
        ref={notificationRef}
        style={{
          position: "absolute",
          top: bellPos.top + 30,
          left: bellPos.left,
          display: "none",
        }}
      >
        {user?.notifications.length > 0 ? (
          user?.notifications.map((notification) => (
            <p className={`notification-${notification.status}`}>
              {notification.message}
              <br />
              <span>
                {notification.time.split("T")[0] +
                  " " +
                  notification.time.split("T")[1]}
              </span>
            </p>
          ))
        ) : (
          <p>No notifcations yet</p>
        )}
      </div>
    </Navbar>
  );
};

export default Navigation;
