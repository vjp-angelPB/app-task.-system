import { Modal, Button, Container, ListGroup } from "react-bootstrap";
import React, { useState, useEffect, useCallback } from "react";
import {
  getTask,
  deleteTask,
  InvitePersons,
  deleteCollaborator,
  getCollaborationsForTask,
  deleteAllCollaborations
} from "../../api";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./ShowTask.css";
import "react-datepicker/dist/react-datepicker.css";

function MostrarTask({ user }) {
  let navigate = useNavigate();
  const { taskID } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const [idTask, setidTask] = useState("");

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(""); // Initialize time as an empty string
  const [priority, setPriority] = useState("Low");
  const [lItems, setItems] = useState([]);
  const [status, setStatus] = useState("Incomplete");
  const userSender = user;
  const [isCollaborator, setIsCollaborator] = useState(false);

  const handleDelete = async (taskID) => {
    try {
      await deleteTask(taskID);

      // Si el usuario es un colaborador, entonces elimina la colaboración
      if (isCollaborator) {
        await deleteCollaborator(taskID, user.idUser);
      } else {
        await deleteAllCollaborations(taskID);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Esta función solo se llama cuando se hace clic en el botón "Stop collaborating"
  const handleStopCollaborating = async (taskID) => {
    try {
      await deleteCollaborator(taskID, user.idUser);
      navigate("/"); // Redirigir a la página principal después de borrar la tarea
    } catch (error) {
      console.error(error);
    }
  };

  const handleInvite = async (event) => {
    event.preventDefault();
    // llamada a metodo

    InvitePersons(idTask, userSender, inviteEmail);

    setShowInvite(false);
  };

  const collaborator = useCallback(async (taskID) => {
    const collaborations = await getCollaborationsForTask(taskID);

    // Verifica si el usuario es un colaborador en esta tarea
    const isUserCollaborator = collaborations.some(collaboration => collaboration.idUserCollaborator === user.idUser);

    // Actualiza el estado de isCollaborator
    setIsCollaborator(isUserCollaborator);
  }, [user]);

  useEffect(() => {
    if (taskID) {
      setidTask(taskID);
      getTask(taskID).then((task) => {
        setTitle(task.title);
        setDate(new Date(task.date));
        setPriority(task.priority);
        setItems(task.items);
        setStatus(task.status);
        setTime(task.time); // Set time as the received time string

        collaborator(taskID);
      });
    }
  }, [taskID, collaborator]);

  return (
    <div
      style={{
        background:
          "linear-gradient(341deg, rgb(217 191 206), rgb(197 216 249))",
        minHeight: "100vh",
        paddingTop: "25px",
        paddingLeft: "25px",
        paddingRight: "25px",
      }}
    >
      <Container className="mb-4">
        <div className="NameAndInvite">
          <h2 style={{
            marginTop: "20px",
            marginBottom: "15px",
            fontSize: "2.5rem",
            color: "#333",
            letterSpacing: "1px",
          }}>{title}</h2>
          <Button
            variant="primary"
            className="mt-3"
            style={{ padding: "8px", fontSize: "1.3rem", width: "100px" }}
            onClick={() => setShowInvite(true)}
          >
            Invite
          </Button>
          {showInvite && (
            <Modal show={showInvite} onHide={() => setShowInvite(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Invite person to Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={handleInvite}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <label>
                    Email:
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                      style={{
                        width: "385px",
                        marginLeft: "30px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </label>
                  <input
                    type="submit"
                    value="Send Invite"
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
        </div>
        <ListGroup variant="flush" style={{
            borderRadius: "15px", background: "linear-gradient(179deg, #dde6f6, #f3e7e9)", border: "none", fontSize: "1.2rem" }}>
          <ListGroup.Item style={{ border: "none" }}>
            <strong>Date:</strong> {date.toDateString()}
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            <strong>Time:</strong> {time} {/* Display the time string */}
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            <strong>Priority:</strong> {priority}
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            <strong>Details:</strong>
            <ul>
              {lItems &&
                lItems.map((item, index) => (
                  <li key={index} style={{ wordWrap: "break-word" }}>
                    {item}
                  </li>
                ))}
            </ul>
          </ListGroup.Item>
          <ListGroup.Item style={{ border: "none" }}>
            <strong>Status:</strong> {status}
          </ListGroup.Item>
        </ListGroup>
        <Button
          variant="primary"
          className="mt-3"
          style={{ marginLeft: "10px" , fontSize: "1.3rem", padding: "10px" }}
          as={Link}
          to={`/update/${taskID}`}
        >
          Edit Task
        </Button>
        <Button
          variant="danger"
          className="mt-3"
          style={{ marginLeft: "10px" , fontSize: "1.3rem", padding: "10px" }}
          onClick={handleShow}
        >
          Delete Task
        </Button>
        {isCollaborator && <Button style={{ marginLeft: "10px", marginTop: "15px", background: "green", borderStyle: "none" }} onClick={() => { handleStopCollaborating(taskID) }}>Stop collaborating</Button>}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                handleClose();
                handleDelete(taskID);
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default MostrarTask;