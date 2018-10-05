const DB_URL = `https://mighty-refuge-69006.herokuapp.com/api`;
const axios = require('axios');


export const fetchArticles = () => axios.get(`${DB_URL}/articles`).catch(error => {
    let errorObj = JSON.stringify(error);
    errorObj = JSON.parse(errorObj);
    errorObj = errorObj.response
    throw errorObj;
});

export const fetchTopics = () => axios.get(`${DB_URL}/topics`)


export const fetchArticlesByTopic = (topic) => axios.get(`${DB_URL}/topics/${topic}/articles`).catch(error => {
    let errorObj = JSON.stringify(error);
    errorObj = JSON.parse(errorObj);
    errorObj = errorObj.response;
    throw errorObj;
});

export const postArticleByTopic = (topic, article) => axios.post(`${DB_URL}/topics/${topic}/articles`, {
    article
}).catch(error => {
    let errorObj = JSON.stringify(error);
    errorObj = JSON.parse(errorObj);
    errorObj = errorObj.response;
    throw errorObj;
});

export const fetchArticleById = (id) => axios.get(`${DB_URL}/articles/${id}`).catch(error => {
    let errorObj = JSON.stringify(error);
    errorObj = JSON.parse(errorObj);
    errorObj = errorObj.response
    throw errorObj;
});

export const fetchCommentsByArtId = (id) => axios.get(`${DB_URL}/articles/${id}/comments`).catch(error => {
    let errorObj = JSON.stringify(error);
    errorObj = JSON.parse(errorObj);
    errorObj = errorObj.response
    throw errorObj;
});

export const addCommentToArticle = (articleId, comment, user) => {
    if (comment !== '') {
        return axios.post(`${DB_URL}/articles/${articleId}/comments`, {
            body: comment,
            created_by: user
        }).catch(error => {
            let errorObj = JSON.stringify(error);
            errorObj = JSON.parse(errorObj);
            errorObj = errorObj.response
            throw errorObj;
        });
    }
}

export const removeComment = (commentId) => {
    return axios.delete(`${DB_URL}/comments/${commentId}`)
}

export const getUser = (username) => {
    return axios.get(`${DB_URL}/users/${username}`)
}

export const voteOnArticle = (id, direction) => {
    return axios.put(`${DB_URL}/articles/${id}?vote=${direction}`)
}

export const voteOnComment = (id, direction) => {
    return axios.put(`${DB_URL}/comments/${id}?vote=${direction}`)
}
