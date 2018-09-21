import React, { Component } from 'react';
import Comments from './Comments';
import * as API from '../api';

class Article extends Component {
    state = {
        article: {},
        voteChange: 0
    }
    render() {
        const { article } = this.state.article;
        return (
            <div>
                {article ? <div className="chosen-article">
                    <div className="voter"><button onClick={() => this.handleVote('up')}><i className="far fa-arrow-alt-circle-up"></i></button><p>{article.votes + this.state.voteChange}</p>
                        <button onClick={() => this.handleVote('down')}> <i className="far fa-arrow-alt-circle-down"></i></button></div>
                    <h4>{article.title}</h4><p>{article.body}</p><button onClick={this.props.history.goBack}>Back</button> </div>
                    : null}
                {article ? <Comments id={this.state.article.article._id} user={this.props.user} /> : null}
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
        const res = await API.fetchArticleById(articleID);
        const article = res.data;
        this.setState({
            article: article
        });
    }
}

export default Article;