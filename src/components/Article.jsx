import React, { Component } from 'react';
import * as API from '../api';

class Article extends Component {
    state = {
        article: {}
    }
    render() {
        const { article } = this.state.article;
        if (article) console.log(article.title);
        return (
            <div>
                {article ? <div><h4>{article.title}</h4><p>{article.body}</p> </div>
                    : null}


            </div>
        );
    }

    componentDidMount() {
        this.getArticle();
    }

    getArticle = async () => {
        const articleID = (this.props.match.params.article);
        const res = await API.fetchArticleById(articleID);
        const article = res.data;
        this.setState({
            article: article
        });
    }
}

export default Article;