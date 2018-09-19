const DB_URL = `https://mighty-refuge-69006.herokuapp.com/api`;
const axios = require('axios');

export const fetchArticles = () => axios.get(`${DB_URL}/articles`);

export const fetchArticlesByTopic = (topic) => axios.get(`${DB_URL}/topics/${topic}/articles`);