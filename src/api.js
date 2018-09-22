const DB_URL = `https://mighty-refuge-69006.herokuapp.com/api`;
const axios = require('axios');

// withErrorHandling = (func, args) => {

// }

export const fetchArticles = () => axios.get(`${DB_URL}/articles`).catch(error => {
    console.dir('FROM API ' + JSON.stringify(error.response))
});


export const fetchArticlesByTopic = (topic) => axios.get(`${DB_URL}/topics/${topic}/articles`).catch(error => {
    console.dir('FROM API ' + JSON.stringify(error.response))
});

export const fetchArticleById = (id) => axios.get(`${DB_URL}/articles/${id}`).catch(error => {
    console.dir('FROM API ' + JSON.stringify(error.response))
});

export const fetchCommentsByArtId = (id) => axios.get(`${DB_URL}/articles/${id}/comments`).catch(error => {
    console.dir('FROM API ' + JSON.stringify(error.response))
});

export const addCommentToArticle = (articleId, comment, user) => {
    if (comment !== '') {
        return axios.post(`${DB_URL}/articles/${articleId}/comments`, {
            body: comment,
            created_by: user
        }).catch(error => {
            console.dir('FROM API ' + error)
        });
    }
}

export const removeComment = (commentId) => {
    return axios.delete(`${DB_URL}/comments/${commentId}`)
}

export const voteOnArticle = (id, direction) => {
    return axios.put(`${DB_URL}/articles/${id}?vote=${direction}`)
}

export const voteOnComment = (id, direction) => {
    return axios.put(`${DB_URL}/comments/${id}?vote=${direction}`)
}