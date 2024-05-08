// axiosConfig.js
import axios from 'axios';

const tasksInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/tasks',
});

const weatherInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/currentWeather',
});

const usersInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/users',
});

const notifyInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/notify',
});

const collaborationsInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/collaborations',
});

export { tasksInstance, weatherInstance, usersInstance, notifyInstance, collaborationsInstance };