import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import "./calendar.css";
import { Container } from "@mui/material";

moment.locale("pt-PT");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar({ tasks }) {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const mappedTasks = tasks.map((task) => {
      // Obtener la fecha y hora combinadas
      const dateTime = moment.utc(`${task.date} ${task.time}`, 'YYYY-MM-DD HH:mm').toDate();
      return {
        start: dateTime,
        end: dateTime, // La tarea termina en el mismo momento en que comienza
        title: task.title,
        id: task.taskID,
        priority: task.priority // Agregamos el campo de prioridad a los eventos
      };
    });
    setEvents(mappedTasks);
  }, [tasks]);

  const handleSelect = ({ start }) => {
    navigate("/new", { state: { initialDate: start } });
  };

  const handleSelectEvent = (task) => {
    navigate(`/show/${task.id}`);
  };

  // Función para obtener el estilo de borde según la prioridad
  const getBorderStyle = (priority) => {
    switch (priority) {
      case "High":
        return { backgroundColor: "red" };
      case "Medium":
        return { backgroundColor: "orange"};
      case "Low":
        return { backgroundColor: "green"};
      default:
        return { border: "none" };
    }
  };

  // Plantillas de tareas
  const p_compras = () => {
    const title = "Shopping";
    const priority = "Medium";
    const items = [
      "Apples",
      "Oranges",
      "Milk",
      "Bread",
      "Chocolate",
      "Coffee",
      "Vegetables",
      "Detergents",
      "Paper",
    ];

    const taskData = { title, priority, items };
    navigate("/new", { state: { taskData: taskData } });
  };

  const p_perros = () => {
    const title = "Dog Walking";
    const priority = "High";
    const items = ["Leash", "Poop bags", "Water", "Food"];

    const taskData = { title, priority, items };
    navigate("/new", { state: { taskData: taskData } });
  };

  const p_project = () => {
    const title = "Projects";
    const priority = "High";
    const items = [
      "Define the goal",
      "Identify tasks",
      "Assign responsibilities",
      "Set deadlines",
      "Review progress",
    ];

    const taskData = { title, priority, items };
    navigate("/new", { state: { taskData: taskData } });
  };

  return (
    <div className="App d-flex">
      <Calendar
        views={["week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        eventPropGetter={(event) => ({
          style: getBorderStyle(event.priority) // Aplicamos el estilo de borde según la prioridad
        })}
        style={{ width: isOpen ? "80%" : "100%", height: "100vh" }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelect}
      />
      <Container
        className={`p-0 m-0 desktop ${isOpen ? 'd-flex desktop' : 'd-none'}`}
        style={{
          width: "20%",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            backgroundColor: "#5eb1eb",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            clipPath: "polygon(100% 0, 100% 100%, -5% 100%, 100% 0)",
          }}
        ></div>
        <h2
          className="mb-3"
          style={{ textDecoration: "underline", marginTop: "20px", zIndex: 1 }}
        >
          Templates
        </h2>
        <div
          className="d-flex flex-column mb-3"
          style={{ width: "70%", zIndex: 1, marginTop: "50px" }}
        >
          <button
            className="mb-4 test-btn"
            style={{
              borderRadius: "8px",
              width: "100%",
              padding: "10px",
              background: "linear-gradient(-50deg, #ffffff 0%, #a5d8ff 100%)",
              color: "black",
              border: "none",
              cursor: "pointer",
              height: "55px",
            }}
            onClick={() => p_compras()}
          >
            <span className="text">Purchase</span>
          </button>
          <button
            className="mb-4 test-btn"
            style={{
              borderRadius: "8px",
              width: "100%",
              padding: "10px",
              background: "linear-gradient(-50deg, #ffffff 0%, #a5d8ff 100%)",
              color: "black",
              border: "none",
              cursor: "pointer",
              height: "55px",
            }}
            onClick={p_perros}
          >
            <span className="text">Dogs</span>
          </button>
          <button
            className="mb-4 test-btn"
            style={{
              borderRadius: "8px",
              width: "100%",
              padding: "10px",
              background: "linear-gradient(-50deg, #ffffff 0%, #a5d8ff 100%)",
              color: "black",
              border: "none",
              cursor: "pointer",
              height: "55px",
            }}
            onClick={() => p_project()}
          >
            <span className="text">Projects</span>
          </button>
        </div>
      </Container>
      <button onClick={toggle} className="desktop" style={{padding : "0px" , border: "none", background: "white", width : "5%" }}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
}
