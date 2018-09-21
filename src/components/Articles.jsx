import React, { Component } from 'react';
import './Article.css';
import * as API from '../api';
import { Link } from 'react-router-dom';
import moment from 'moment';
import sortBy from 'lodash.sortby';

class Articles extends Component {
    state = {
        articles: [],
        page: 0
    }
    render() {
        const articles = this.state.articles;
        const dateSorted = sortBy(articles, article => article.created_at).reverse();
        const popularitySorted = sortBy(articles, article => (article.votes + article.comment_count)).reverse()
        // dateSorted.forEach((article) => {
        //     console.log(article.created_at)
        // })
        // popularitySorted.forEach((article) => {
        //     console.log(article)
        // })
        return (
            <div className="articles grid-container">
                <div className="article-sort">
                    <button className="sorting" onClick={() => this.dateSortArticles('newest')}>Newest</button>
                    <button className="sorting" onClick={() => this.dateSortArticles('oldest')}>Oldest</button>
                    <button className="sorting" onClick={() => this.trendSortArticles()}>Trending</button>
                </div>
                {articles.slice(this.state.page, 8).map((article, i) => {
                    const articleRating = (+article.votes + +article.comment_count);
                    const articleAge = article.created_at;
                    // console.log(articleAge);
                    // console.log(articleRating);

                    const createdAt = moment(article.created_at).format('MMMM Do YYYY, h:mm:ss a');
                    return (
                        <div className={`article area${i}`} key={article._id}>
                            <div className="voter"><button><i className="far fa-arrow-alt-circle-up"></i></button><p>{article.votes}</p>
                                <button><i className="far fa-arrow-alt-circle-down"></i></button></div>
                            <Link key={article._id} to={`/articles/${article._id}`} > <article key={article._id}>{article.title}</article></Link>
                            <p>Topic: {article.belongs_to}</p>
                            <p>Comments: {article.comment_count}</p>
                            <p>Posted by: {article.created_by.username} {'(' + createdAt + ')'}</p>
                        </div>)
                }
                )}
                <div class="pagination">
                    <p>Pagination</p>
                </div>
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
        const res = (topic ? await API.fetchArticlesByTopic(topic) : await API.fetchArticles());
        const articles = res.data.articles;
        this.setState({
            articles
        });
    }

    dateSortArticles = (criterion) => {
        const sortable = this.state.articles;
        let dateSorted = sortBy(sortable, article => article.created_at);
        criterion === 'oldest' ? dateSorted : dateSorted.reverse();
        this.setState({
            articles: dateSorted
        });
    }

    trendSortArticles = () => {
        const sortable = this.state.articles;
        const popularitySorted = sortBy(sortable, article => (article.votes + article.comment_count)).reverse()
        this.setState({
            articles: popularitySorted
        })
    }
}

export default Articles;