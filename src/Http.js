import axios from 'axios';

const baseURL = 'http://localhost:1234';
const http = axios.create({
  baseURL,
});

export default http;
