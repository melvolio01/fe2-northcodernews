import React, { Component } from 'react';
import Comments from './Comments';
import * as API from '../api';

class Article extends Component {
    state = {
        article: {}
    }
    render() {
        const { article } = this.state.article;
        return (
            <div>
                {article ? <div>
                    <div className="voter"><i className="far fa-arrow-alt-circle-up"></i><p>{article.votes}</p><i className="far fa-arrow-alt-circle-down"></i></div>
                    <h4>{article.title}</h4><p>{article.body}</p><button onClick={this.props.history.goBack}>Back</button> </div>
                    : null}
                {article ? <Comments id={this.state.article.article._id} user={this.props.user} /> : null}
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