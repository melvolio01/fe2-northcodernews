import React, { Component } from 'react';
import './Article.css';
import * as API from '../api';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Articles extends Component {
    state = {
        articles: []
    }
    render() {
        const articles = this.state.articles;
        return (
            <div >
                <ul>
                    {console.log(articles[0])}
                    {articles.map(article => {
                        const createdAt = moment(article.created_at).format('MMMM Do YYYY, h:mm:ss a');
                        return (
                            <div key={article._id}>
                                <div className="voter"><i class="far fa-arrow-alt-circle-up"></i><p>{article.votes}</p><i class="far fa-arrow-alt-circle-down"></i></div>
                                <Link key={article._id} to={`/articles/${article._id}`} > <article key={article._id}>{article.title}</article></Link>
                                <p>Topic: {article.belongs_to}</p>
                                <p>Comments: {article.comment_count}</p>
                                <p>Posted by {article.created_by.username} {'(' + createdAt + ')'}</p>
                            </div>)
                    }
                    )}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        console.log(this.props.user);
        this.getArticles();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) this.getArticles();
    }

    getArticles = async () => {
        const topic = this.props.match.params.topic ? this.props.match.params.topic : null;
        const res = (topic ? await API.fetchArticlesByTopic(topic) : await API.fetchArticles());
        const articles = res.data.articles;
        this.setState({
            articles
        });
    }
}

export default Articles;