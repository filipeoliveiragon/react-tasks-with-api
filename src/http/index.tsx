import axios from 'axios';

export const httpHome = axios.create({
    baseURL: 'http://localhost:8000'
});