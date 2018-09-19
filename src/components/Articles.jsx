import React, { Component } from 'react';
import './Article.css';
import * as API from '../api';

class Articles extends Component {
    state = {
        articles: []
    }
    render() {
        const articles = this.state.articles;
        console.log(articles);
        return (
            <div >
                <ul>
                    {articles.map(article => {
                        return <li key={article.id}>{article.title}</li>
                    }
                    )}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.getArticles()
    }

    getArticles = async () => {
        const res = await API.fetchArticles();
        const articles = res.data.articles;
        this.setState({
            articles
        });
    }
}

export default Articles;