import React, { Component } from 'react';
import './Article.css';
import * as API from '../api';
import { Link, Redirect } from 'react-router-dom';
import sortBy from 'lodash.sortby';
import ArticleCard from './ArticleCard';
import moment from 'moment';


class Articles extends Component {
    state = {
        articles: [],
        page: 0,
        voteChange: 0,
        redirect: false,
        error: {}
    }
    render() {
        if (this.state.redirect) return <Redirect to={{ pathname: '/error', state: this.state.error }} />
        const articles = this.state.articles;
        let pages = Array.from({ length: Math.ceil(this.state.articles.length / 8) }, (e, i) => i + 1)
        // first and last args for slice of articles per pages
        const firstArt = this.state.page === 0 ? 0 : ((this.state.page * 8))
        const lastArt = firstArt + 8;
        return (
            <div className="articles front-page-container">
                <div className="article-sort">
                    <button className="sorting" onClick={() => this.dateSortArticles('newest')}>Newest</button>
                    <button className="sorting" onClick={() => this.dateSortArticles('oldest')}>Oldest</button>
                    <button className="sorting" onClick={() => this.trendSortArticles()}>Popular</button>
                    <button className="sorting"><Link id="new-article" to='/newArticle'>New Article</Link></button>
                </div>
                {articles.slice(firstArt, lastArt).map((article, i) => {
                    return <ArticleCard article={article} i={i} />
                }
                )}
                <div className="pagination">
                    <p>More Articles</p>
                    <div className="pages">
                        {pages.map((page) => {
                            return <button key={page} className="paginate" onClick={() => this.changePage({ page })}>{page}</button>
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
        const topic = this.props.match.params.topic && this.props.match.params.topic;
        const res = topic ? await API.fetchArticlesByTopic(topic)
            .catch(error => {
                this.setState({
                    redirect: true,
                    error: error
                })
            })
            : await API.fetchArticles()
                .catch(error => {
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

    changePage = (thisPage) => {
        const page = +thisPage.page - 1;
        this.setState({
            page
        });
    }
}

export default Articles;