import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Comments from './Comments';
import * as API from '../api';
import moment from 'moment';
import './Article.css';

class Article extends Component {
    state = {
        article: {},
        voteChange: 0,
        redirect: false,
        error: {}
    }
    render() {
        if (this.state.redirect) return <Redirect to={{ pathname: '/error', state: this.state.error }} />
        if (this.state.article) {
            const { article } = this.state.article;
            return (
                <div className="chosen-article-container">
                    {article && <div className="chosen-article">
                        <div className="article-contents">
                            <div className="article-img"><img alt='' src={article.img_url}></img></div>
                            <div className="voter"><button onClick={() => this.handleVote('up')}><i className="far fa-arrow-alt-circle-up"></i></button><p>{article.votes + this.state.voteChange}</p>
                                <button onClick={() => this.handleVote('down')}> <i className="far fa-arrow-alt-circle-down"></i></button></div>
                            <article className="article-body"><h4>{article.title}</h4>
                                <p>By {article.created_by.username} {'(' + moment(article.created_at).format("MMM Do YY") + ')'}</p>
                                <p>{article.body}</p></article>
                            <button className="back-button" onClick={this.props.history.goBack}>Back</button></div> </div>
                    }
                    {article && <Comments className="comments" id={this.state.article.article._id} user={this.props.user} />}
                </div>
            );
        }
    }
    componentDidMount() {
        this.getArticle();
    }

    handleVote = async (direction) => {
        const articleID = (this.props.match.params.article);
        await API.voteOnArticle(articleID, direction);
        this.setState({
            voteChange: direction === 'up' ? 1 : direction === 'down' ? -1 : 0
        })
    }

    getArticle = async () => {
        const articleID = (this.props.match.params.article);
        const res = await API.fetchArticleById(articleID)
            .catch(error => {
                this.setState({
                    redirect: true,
                    error: { error }
                })
            });
        if (res) {
            const article = res.data;
            this.setState({
                article
            });
        }
    }
}

export default Article;