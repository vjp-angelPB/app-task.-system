import React, { useState } from "react";
import { Modal, Form, Button, Container, Row, Col } from "react-bootstrap";
import { updateUser, deleteUser, changePasswordUser } from "../../api";
import { useNavigate } from "react-router-dom";

const validatePassword = (password) => {
  if (password.length < 8) {
    return false;
  }
  const regexStartsWithCapital = /^[A-Z].*/;
  if (!regexStartsWithCapital.test(password)) {
    return false;
  }
  const regexSpecialCharacters = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
  if (!regexSpecialCharacters.test(password)) {
    return false;
  }
  return true;
};

const Account = ({ onLogout, user }) => {
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const handleCloseChangePassword = () => setShowChangePassword(false);
  const handleShowChangePassword = () => setShowChangePassword(true);
  const [showPassword, setShowChangePassword] = useState(false);
  const [PasswordChange, setPasswordChange] = useState("");

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [city, setCity] = useState(user.city || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const NewUser = { name, email, city };

    if (!validatePassword(PasswordChange)) {
      // Si la contraseña no cumple con los requisitos de validación, muestra un mensaje de error
      alert("La contraseña debe tener al menos 8 caracteres, comenzar con mayúscula y contener al menos un carácter especial.");
      return;
    }

    updateUser(user.idUser, NewUser);

    onLogout();
    navigate("/login");
  };

  const handleChangePassword = (password) => {
    changePasswordUser(user.idUser, { password });
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user);
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(204deg, rgb(242, 213, 230), rgb(219, 228, 243))",
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div>
              <h2 className="text-center mb-5">Account Information</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName" className="mb-4">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-4">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formCity" className="mb-4">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>

                <div className="text-center mb-4">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="me-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleShowChangePassword}
                    className="me-2"
                  >
                    Change Password
                  </Button>
                  {showPassword && (
                    <Modal
                      show={showPassword}
                      onHide={handleCloseChangePassword}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Change Your Password</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleChangePassword(PasswordChange);
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <label>
                            New Password:
                            <div style={{ position: 'relative', marginLeft: '0px', width: '100%' }}>
                              <input
                                type="password"
                                value={PasswordChange}
                                onChange={(e) =>
                                  setPasswordChange(e.target.value)
                                }
                                required
                                style={{
                                  width: "385px",
                                  marginLeft: "0px",
                                  marginTop: "5px",
                                  padding: "10px",
                                  borderRadius: "5px",
                                  border: "1px solid #ccc",
                                }}
                                />
                            </div>
                          </label>
                          <input
                            type="submit"
                            value="Change Password"
                            style={{
                              backgroundColor: "#007bff",
                              color: "white",
                              padding: "10px",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          />
                        </form>
                      </Modal.Body>
                    </Modal>
                  )}
                  <Button variant="danger" size="lg" onClick={handleShow}>
                    Delete Account
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to delete your account?
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        No
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleClose();
                          handleDeleteAccount();
                        }}
                      >
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Account;
