import React, { Component } from 'react';
import './Article.css';
import * as API from '../api';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';
import sortBy from 'lodash.sortby';

class Articles extends Component {
    state = {
        articles: [],
        page: 0,
        voteChange: 0,
        redirect: false,
        error: {}
    }
    render() {
        if (this.state.redirect) console.log(this.state.error)
        if (this.state.redirect) return <Redirect to={{ pathname: '/error', state: this.state.error }} />
        const articles = this.state.articles;
        let pages = Math.ceil(this.state.articles.length / 8);
        pages = Array.from({ length: pages }, (e, i) => i + 1)
        // first and last args for slice of articles per pages
        const firstArt = this.state.page === 0 ? 0 : ((this.state.page * 8))
        const lastArt = firstArt + 8;
        return (
            <div className="articles front-page-container">
                <div className="article-sort">
                    <button className="sorting" onClick={() => this.dateSortArticles('newest')}>Newest</button>
                    <button className="sorting" onClick={() => this.dateSortArticles('oldest')}>Oldest</button>
                    <button className="sorting" onClick={() => this.trendSortArticles()}>Popular</button>
                </div>
                {articles.slice(firstArt, lastArt).map((article, i) => {

                    const createdAt = moment(article.created_at).fromNow();
                    return (
                        <div className={`article area${i}`} key={article._id}>
                            <div className="img-container"><img src={article.img_url}></img></div>
                            <div class="article-info">
                                <Link className="article-title" key={article._id} to={`/articles/${article._id}`} > <article key={article._id}>{article.title}</article></Link>
                            </div>
                            <div className="article-details">
                                <p>Topic: {article.belongs_to}</p>
                                <p>Votes: {article.votes}</p>
                                <p>Comments: {article.comment_count}</p>
                                <p>Posted by: {article.created_by.username} {'(' + createdAt + ')'}</p>
                            </div>
                        </div>)
                }
                )}
                <div class="pagination">
                    <p>More Articles</p>
                    <div className="pages">
                        {pages.map((page) => {
                            return <button className="paginate" onClick={(e) => this.changePage(e)}>{page}</button>
                        })}
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getArticles();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) this.getArticles()
    }

    getArticles = async () => {
        const topic = this.props.match.params.topic ? this.props.match.params.topic : null;
        const res = topic ? await API.fetchArticlesByTopic(topic)
            .catch(error => {
                console.log(error)
                this.setState({
                    redirect: true,
                    error: error
                })
            })
            : await API.fetchArticles()
                .catch(error => {
                    console.log(error)
                    this.setState({
                        redirect: true,
                        error: error
                    })
                })
        if (res) {
            const articles = res.data.articles;
            const page = 0;
            this.setState({
                articles,
                page
            });
        }
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

    changePage = (e) => {
        e.preventDefault();
        const page = +e.target.innerText - 1;
        this.setState({
            page
        });
    }
}

export default Articles;