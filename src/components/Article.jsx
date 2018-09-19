import React, { Component } from 'react';
import * as API from '../api';

class Article extends Component {
    state = {
        article: {}
    }
    render() {
        console.log(this.props.history);
        const { article } = this.state.article;
        return (
            <div>
                {article ? <div><h4>{article.title}</h4><p>{article.body}</p><button onClick={this.props.history.goBack}>Back</button> </div>
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