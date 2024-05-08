// App.js
import React, { useState, useEffect,useCallback , useRef} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaskManagerHeader from "./components/header/Header";
import NotFound from "./components/notFound/NotFound";
import Layout from "./components/Layout";
import { getTasks, getNotificationsByidUser , getTasksCollaborations } from "./api";
import NewOrUpdateTaskForm from "./components/neworupdateTask/NewOrUpdateTask";
import ShowTask from "./components/showTask/ShowTask";
import Calendar from "./components/Calendar/calendar";
import Weather from "./components/weather/Weather";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Account from "./components/account/account";
import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


function App() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const userRef = useRef(user);
 
  const fetchTasks = async (user) => {
    // Obtener las tareas propias del usuario
    const tasksFromServer = await getTasks(user);
   
    // Obtener las tareas de colaboración
    const collaborationTasksFromServer = await getTasksCollaborations(user);
   
    // Combinar las tareas propias y de colaboración
    const combinedTasks = [...tasksFromServer, ...collaborationTasksFromServer];
   
    setTasks(combinedTasks);
  };
 
  const fetchNotifications = async (user) => {
    const notificationsFromServer = await getNotificationsByidUser(user.idUser);
    setNotifications(notificationsFromServer);
  };
 
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    setIsLoading(false);
  }, []);
 
  useEffect(() => {
    userRef.current = user;
  }, [user]);
 
   const connect = useCallback(() => {
    const socket = new SockJS('http://localhost:8080/websocket-app', undefined, {
      protocols: ['xhr-polling', 'websocket'],
      debug: true,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    const client = Stomp.over(socket);
    client.connect({}, frame => {
      console.log('Connected: ' + frame);
      client.subscribe('/topic/updates', message => {
        fetchTasks(userRef.current);
        fetchNotifications(userRef.current);
      });
    });
    setStompClient(client);
  }, []);
 
  const disconnect = useCallback(() => {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
    console.log("Disconnected");
  }, [stompClient]);
 
  useEffect(() => {
    if (user) {
      fetchTasks(user);
      fetchNotifications(user);
      connect();
    }
  }, [user, connect]);
 
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);
 
  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
 
  const handleOnLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
 
  if (isLoading) {
    return <div>Loading...</div>;
  }
 
  return (
    <Router>
      <TaskManagerHeader user={user} notifications={notifications} onLogout={handleOnLogout} />
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user ? <Calendar tasks={tasks} /> : <Navigate to="/login" />
            }
          />
          <Route
            exact
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/new"
            element={user ? <NewOrUpdateTaskForm user={user}/> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/update/:taskID"
            element={user ? <NewOrUpdateTaskForm /> : <Navigate to="/login" />}
          />
          <Route
            exact
            path="/show/:taskID"
            element={user ? <ShowTask user={user} /> : <Navigate to="/login" />}
          />
          <Route exact path="/weather" element={<Weather />} />
          <Route exact path="/account" element={<Account onLogout={handleOnLogout} user={user}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Footer />
    </Router>
  );
}
 
export default App;