import React, { Component } from 'react';
import './Article.css';
import * as API from '../api';
import { Link } from 'react-router-dom';

class Articles extends Component {
    state = {
        articles: []
    }
    render() {
        const articles = this.state.articles;
        return (
            <div >
                <ul>
                    {articles.map(article => {
                        return (
                            <div>
                                <Link to={`/articles/${article._id}`} > <article key={article._id}>{article.title}</article></Link>
                            </div>)
                    }
                    )}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.getArticles();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) this.getArticles();
    }

    getArticles = async () => {
        const topic = this.props.match.params.topic ? this.props.match.params.topic : null;
        console.log(topic);
        const res = (topic ? await API.fetchArticlesByTopic(topic) : await API.fetchArticles());
        const articles = res.data.articles;
        this.setState({
            articles
        });
    }
}

export default Articles;