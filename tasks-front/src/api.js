// api.js
import { weatherInstance, tasksInstance, usersInstance, notifyInstance, collaborationsInstance } from "./api/axiosConfig";

// TASKS
export const getTasks = async (user) => {
  const response = await tasksInstance.get(`/user/${user.idUser}`);
  return response.data;
};

export const getTask = async (taskID) => {
  const response = await tasksInstance.get(`/${taskID}`);
  return response.data;
};

export const createTask = async (task) => {
  const response = await tasksInstance.post("/new", task);
  return response.data;
};

export const updateTask = async (taskID, task) => {
  const response = await tasksInstance.put(`update/${taskID}`, task);
  return response.data;
};

export const deleteTask = async (taskID) => {
  const response = await tasksInstance.delete(`delete/${taskID}`);
  return response;
};

// WEATHER

export const getWeather = async (city) => {
  const response = await weatherInstance.get(`/${city}`);
  return response.data;
};

// USERS

export const createUser = async (user) => {
  const response = await usersInstance.post("/register", user);
  return response.data;
};

export const updateUser = async (idUser, user) => {
  const response = await usersInstance.put(`update/${idUser}`, user);
  return response.data;
};

export const deleteUser = async (user) => {
  const response = await usersInstance.delete(`delete/${user.idUser}`);
  return response;
};

export const changePasswordUser = async (idUser, password) => {
  const response = await usersInstance.put(`changePassword/${idUser}`, password);
  return response.data;
};

export const checkUser = async (user) => {
  try {
    const response = await usersInstance.post("/login", user);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert("Inicio de sesión fallido. Por favor, comprueba tus credenciales.");
    } else {
      alert("ERROR");
    }
  }
};

// NOTIFICATIONS

export const InvitePersons = async (taskID, userSender , email) => {
  try {
    const response = await notifyInstance.post(`invite/${taskID}`, {userSender, email});
    return response;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      alert('No se pudo realizar la operacion no se encontro el email introducido.');
    } else {
      alert('ERROR');
    }
  }
};

export const getNotificationsByidUser = async (idUser) => {
    const response = await notifyInstance.get(`messages/${idUser}`);
    return response.data;
};

export const deleteNotification = async (idNotification) => {
  const response = await notifyInstance.delete(`delete/${idNotification}`);
  return response;
};

// COLLABORATIONS

export const addCollaborator = async (taskID, idUser) => {
  const response = await collaborationsInstance.post(`/addCollaborator/${taskID}/${idUser}`);
  return response;
};

export const deleteCollaborator = async (taskID, idUser) => {
  const response = await collaborationsInstance.delete(`/deleteCollaboration/${taskID}/${idUser}`);
  return response;
};

export const deleteAllCollaborations = async (taskID) => {
  const response = await collaborationsInstance.delete(`/deleteAllCollaborations/${taskID}`);
  return response;
};

export const getTasksCollaborations = async (user) => {
  const response = await collaborationsInstance.get(`/collaborations/${user.idUser}`);
  return response.data;
};

export const getCollaborationsForTask = async (taskID) => {
  const response = await collaborationsInstance.get(`/collaborations/task/${taskID}`);
  return response.data;
};