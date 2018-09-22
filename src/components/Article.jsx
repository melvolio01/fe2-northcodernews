import React, { Component } from 'react';
import Comments from './Comments';
import * as API from '../api';
import './Article.css';

class Article extends Component {
    state = {
        article: {},
        voteChange: 0
    }
    render() {
        console.log(this.props);
        const { article } = this.state.article;
        return (
            <div className="chosen-article-container">
                {article ? <div class="chosen-article">
                    <div>
                        <div className="article-img"><img src={article.img_url}></img></div>
                        <div className="voter"><button onClick={() => this.handleVote('up')}><i className="far fa-arrow-alt-circle-up"></i></button><p>{article.votes + this.state.voteChange}</p>
                            <button onClick={() => this.handleVote('down')}> <i className="far fa-arrow-alt-circle-down"></i></button></div>
                        <article class="article-body"><h4>{article.title}</h4><p>{article.body}</p></article><button className="back-button" onClick={this.props.history.goBack}>Back</button></div> </div>
                    : null}
                {article ? <Comments className="comments" id={this.state.article.article._id} user={this.props.user} /> : null}
            </div>
        );
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
        console.log(this.props.match.params.article)
        const res = await API.fetchArticleById(articleID);
        const article = res.data;
        console.log(article);
        this.setState({
            article
        });
    }
}

export default Article;