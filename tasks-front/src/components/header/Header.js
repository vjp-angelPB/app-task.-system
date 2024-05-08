import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faBell } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteNotification, addCollaborator } from "../../api";
import "./header.css";

const TaskManagerHeader = ({ user, onLogout, notifications }) => {
  const location = useLocation();
  let navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleNotificationClick = (notification) => {
    addCollaborator(notification.taskID, user.idUser);
    deleteNotification(notification.idNotification);
    navigate(notification.link);
  };


  // Función que cierra el panel de notificaciones si haces clic fuera de él
  const handleClickOutside = (event) => {
    if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    // Agrega el controlador de eventos al cargar el componente
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Elimina el controlador de eventos al descargar el componente
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to={user ? "/" : "/login"}>
          <FontAwesomeIcon icon={faTasks} style={{ marginRight: "10px" }} />
          Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          style={{ justifyContent: "flex-end" }}
        >
          <Nav className="ml-auto custom-nav">
            {location.pathname !== "/weather" && (
              <>
                {user && (
                  <span
                    className="bell-icon"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <FontAwesomeIcon
                      icon={faBell}
                      style={{
                        fontSize: "1.5em",
                        color: notifications.length > 0 ? "red" : "white",
                        marginRight: "20px",
                        marginTop: "6px",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                )}
                <Button
                  variant="light"
                  as={Link}
                  to="/weather"
                  className="me-2 custom-button"
                >
                  Weather
                </Button>
              </>
            )}
            {user &&
              location.pathname !== "/new" &&
              !location.pathname.startsWith("/update") && (
                <Button
                  variant="light"
                  as={Link}
                  to="/new"
                  className="me-2 custom-button"
                >
                  New Task
                </Button>
              )}
            {user && location.pathname !== "/login" && (
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {user.name}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ minWidth: "auto", width: "90px" }}>
                  <Dropdown.Item onClick={() => navigate("/account")} style={{
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: "15px",
                    }}>Account</Dropdown.Item>
                    
                  <Dropdown.Item
                    onClick={handleLogout}
                    style={{
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      paddingLeft: "15px",
                    }}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
        {showNotifications && (
          <div className="notification-panel" ref={notificationsRef}>
            <h4 className="notification-title">Notifications</h4>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>
                  {notification.message}
                  <Button className="notification-button" onClick={() => handleNotificationClick(notification)}>
                    Haz clic aquí
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default TaskManagerHeader;