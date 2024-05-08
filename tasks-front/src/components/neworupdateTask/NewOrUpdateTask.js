import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Collapse,
  ListGroup,
  Card,
} from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { createTask, updateTask, getTask, getWeather } from "../../api";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import "./NewOrUpdateTask.css";

function TaskForm({ addTask, user }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [priority, setPriority] = useState("Low");
  const [lItems, setItems] = useState([]);
  const [status, setStatus] = useState("Incomplete");
  const [idUser, setIdUser] = useState(user?.idUser || "");
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [temperature, setTemperature] = useState("");
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showBorder, setShowBorder] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();
  let initialDate = location.state?.initialDate;
  let taskData = location.state?.taskData;

  let { taskID } = useParams();

  const fetchWeather = async () => {
    const data = await getWeather(user.city);
    setWeather(data.current);
  };

  const setTemperatureMessage = () => {
    if (weather) {
      let message = `Just a reminder, today's temperature in ${user.city} is ${weather.temperature_2m}º.`;
      if (weather.temperature_2m >= 31 && weather.temperature_2m <= 50) {
        message += ` It's a very hot day, bring a hat and stay hydrated.`;
      } else if (weather.temperature_2m >= 30) {
        message += ` It's a very hot day, stay hydrated.`;
      } else if (weather.temperature_2m >= 17 && weather.temperature_2m <= 29) {
        message += ` It's a hot day, stay hydrated.`;
      } else if (weather.temperature_2m >= 11 && weather.temperature_2m <= 16) {
        message += ` You might need a jacket.`;
      } else if (weather.temperature_2m <= 10) {
        message += ` It's a cold day, make sure to wear warm clothes.`;
      } else {
        message += ` It's a cold day, make sure to bundle up and carry an umbrella just in case.`;
      }
      setTemperature(message);
    }
  };

  useEffect(() => {
    if (initialDate) {
      setDate(new Date(initialDate));
      setIdUser(user.idUser);
    } else if (taskID) {
      getTask(taskID).then((task) => {
        setTitle(task.title);
        setPriority(task.priority);
        setItems(task.items);
        setIdUser(task.idUser);

        let date = new Date(task.date);
        let timeParts = task.time.split(":");
        date.setHours(timeParts[0], timeParts[1], timeParts[2]);

        setDate(date);
      });
    } else if (taskData) {
      setTitle(taskData.title);
      setPriority(taskData.priority);
      setItems(taskData.items);
      setIdUser(user.idUser);
    }
  }, [taskID, initialDate, taskData, user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert date to YYYY-MM-DD format
    const dateStr = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    // Convert time to HH:mm:ss format
    const timeStr = `${String(time.getHours()).padStart(2, "0")}:${String(
      time.getMinutes()
    ).padStart(2, "0")}:${String(time.getSeconds()).padStart(2, "0")}`;

    // Create a new Date object from the date and time
    const dateTime = new Date(`${dateStr}T${timeStr}`);

    // Adjust the timezone offset
    dateTime.setMinutes(dateTime.getMinutes() - dateTime.getTimezoneOffset());

    const taskData = {
      title,
      date: dateTime.toISOString().split('T')[0], // Get the date part
      time: dateTime.toTimeString().split(' ')[0], // Get the time part
      priority,
      items: lItems,
      status,
      idUser,
    };

    if (taskID) {
      updateTask(taskID, taskData);
    } else {
      createTask(taskData);
    }

    setTitle("");
    setDate(new Date());
    setTime(new Date()); // Reset time
    setPriority("Low");
    setItems([]);
    setStatus("Incomplete");
    navigate("/");
  };

  const handleAdd = () => {
    if (input.trim() !== "") {
      setItems([...lItems, input]);
      setInput("");
    }
  };

  const handleDelete = (index) => {
    const newItems = [...lItems];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleEdit = (index) => {
    setInput(lItems[index]);
    setEditingIndex(index);
  };

  const handleSave = () => {
    const newItems = [...lItems];
    if (input.trim() !== "") {
      newItems[editingIndex] = input;
      setItems(newItems);
      setInput("");
      setEditingIndex(null);
    }
  };

  const isToday = date.toDateString() === new Date().toDateString();

  const handleSunIconClick = () => {
    fetchWeather().then(() => {
      setTemperatureMessage();
    });
    setShowMessage(!showMessage);
    setShowBorder(!showBorder);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f2d5e6, #dbe4f3)",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Card
          className="w-75 p-4"
          style={{
            background: "linear-gradient(135deg, #dde6f6, #f3e7e9)",
            border: `4px solid ${priority === "High"
              ? "red"
              : priority === "Medium"
                ? "orange"
                : "green"
              }`, // Red for High, Orange for Medium, Green for Low
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            paddingTop: "30px",
          }}
        >
          <Form
            onSubmit={handleSubmit}
            className="mb-2 mt-2"
            style={{ width: "90%" }}
          >
            <Form.Group className="mb-4 d-flex justify-content-center align-items-center">
              <Form.Label className="me-2" style={{ fontSize: "1.7rem" }}>
                Title:
              </Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ flexGrow: 1, padding: "0.5rem", fontSize: "1.2rem" }}
              />
            </Form.Group>
            <Form.Group className="mb-4 d-flex align-items-center flex-wrap">
              <Form.Label className="me-2" style={{ fontSize: "1.7rem", marginBottom: "0", marginRight: "10px" }}>
                Date:
              </Form.Label>
              <Col xs={12} md={9}>
                <DatePicker
                  selected={date}
                  onChange={(date) => {
                    setDate(date);
                    setTime(date);
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-100"
                  style={{ marginTop: "8px" }}
                />
              </Col>
            </Form.Group>
            <Button
              variant="warning"
              className="w-100"
              onClick={handleSunIconClick}
              style={{ cursor: "pointer", marginBottom: "15px", backgroundColor: "#FFA500" }}
            >
              Weather
            </Button>
            {isToday && !taskID && (
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <div
                  style={{
                    padding: "10px",
                    fontSize: "1.2rem",
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: showBorder ? "red" : "transparent",
                    borderRadius: "10px",
                    marginBottom: showMessage ? "30px" : "0px",
                    color: "black",
                    maxWidth: "100%",
                    paddingBottom: "5px",
                  }}
                >
                  {showMessage && <p>{temperature}</p>}
                </div>
              </Form.Group>
            )}
            <Form.Group className="mb-4 d-flex justify-content-center align-items-center">
              <Form.Label className="me-2" style={{ fontSize: "1.7rem" }}>
                Priority:
              </Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ flexGrow: 1, padding: "0.5rem", fontSize: "1.2rem" }}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-4 d-flex justify-content-center align-items-center">
              <Form.Label className="me-2" style={{ fontSize: "1.7rem" }}>
                Status:
              </Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ flexGrow: 1, padding: "0.5rem", fontSize: "1.2rem" }}
              >
                <option value="Complete">Complete</option>
                <option value="Incomplete">Incomplete</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-4">
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                style={{ marginBottom: "0.7rem" }}
              >
                Details
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  <ListGroup>
                    {lItems &&
                      lItems.map((item, index) => (
                        <ListGroup.Item
                          style={{ wordWrap: "break-word" }}
                          key={index}
                        >
                          {item}
                          <Button
                            variant="danger"
                            style={{ float: "right", marginLeft: "10px" }}
                            onClick={() => handleDelete(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                          <Button
                            variant="primary"
                            style={{ float: "right" }}
                            onClick={() => handleEdit(index)}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </Button>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                  <Form.Control
                    placeholder="Add detail..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ marginTop: "1rem", fontSize: "1.2rem" }}
                  />
                  {editingIndex !== null ? (
                    <Button
                      onClick={handleSave}
                      className={`border-0`}
                      style={{ marginTop: "1rem" }}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={handleAdd}
                      className={`border-0`}
                      style={{ marginTop: "1rem" }}
                    >
                      Add
                    </Button>
                  )}
                </div>
              </Collapse>
            </Form.Group>
            <Row className="justify-content-center">
              <Col xs="auto" className="text-center">
                {location.pathname === "/new" && (
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-3 py-2 fs-4 me-2"
                  >
                    ADD
                  </Button>
                )}
                {location.pathname.startsWith("/update") && (
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-3 py-2 fs-4 me-2"
                  >
                    UPDATE
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default TaskForm;
