import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Article.css';

const ArticleCard = (props) => {
    const { article } = props
    const createdAt = moment(article.created_at).fromNow();
    const { i } = props;
    return (
        <div className={`article area${i}`} key={article._id}>
            <div className="img-container"><img alt='' src={article.img_url}></img></div>
            <div className="article-info">
                <Link className="article-title" key={article._id} to={`/articles/${article._id}`} > <article key={article._id}>{article.title}</article></Link>
            </div>
            <div className="article-details">
                <p>Topic: {article.belongs_to}</p>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
                <p>Posted by: {article.created_by.username} {'(' + createdAt + ')'}</p>
            </div>
        </div>)
};

export default ArticleCard;
