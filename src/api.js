const DB_URL = `https://mighty-refuge-69006.herokuapp.com/api`;
const axios = require('axios');


export const fetchArticles = () => axios.get(`${DB_URL}/articles`).catch(error => {
    let errorObj = JSON.stringify(error);
    errorObj = JSON.parse(errorObj);
    errorObj = errorObj.response
    console.log(errorObj);
    throw errorObj;
});

export const fetchArticlesByTopic = (topic) => axios.get(`${DB_URL}/topics/${topic}/articles`).catch(error => {
    console.dir(error);
    let errorObj = JSON.stringify(error);
    errorObj = JSON.parse(errorObj);
    errorObj = errorObj.response;
    console.log(errorObj);
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

export const voteOnArticle = (id, direction) => {
    return axios.put(`${DB_URL}/articles/${id}?vote=${direction}`)
}

export const voteOnComment = (id, direction) => {
    return axios.put(`${DB_URL}/comments/${id}?vote=${direction}`)
}