import React, { Component } from 'react';
import * as API from '../api';
import Comment from './Comment';
import NewComment from './NewComment';
import './Comments.css';
import moment from 'moment';
import sortBy from 'lodash.sortby';


class Comments extends Component {
    state = {
        comments: [],
        deletedComments: []
    }
    render() {
        return (
            < div className="comments" >
                <NewComment addComment={this.addComment} />
                <div class="comment-box">
                    <div>
                        <button className="comment-sorting" onClick={() => this.dateSortComments('newest')}>New</button>
                        <button className="comment-sorting" onClick={() => this.dateSortComments('oldest')}>Old</button>
                        <button className="comment-sorting" onClick={() => this.trendSortComments()}>Popular</button>
                    </div>
                    {
                        this.state.comments.length > 0 ?
                            this.state.comments.map(comment => {
                                if (!this.state.deletedComments.includes(comment)) {
                                    return <Comment key={comment._id} user={this.props.user} comment={comment} deleteComment={this.deleteComment} />

                                } else return null
                            })
                            : null}

                </div>
            </div >
        );
    }
    componentDidMount() {
        this.getComments()
    }

    componentDidUpdate = (prevProps) => {
        if (this.props !== prevProps) {
            this.getComments();
        }
    }

    getComments = async () => {
        const artId = this.props.id;
        const res = await API.fetchCommentsByArtId(artId);
        let comments = res.data.comments;
        comments = sortBy(comments, comment => comment.created_at).reverse();
        this.setState({
            comments
        });
    }

    addComment = async (comment) => {
        const res = await API.addCommentToArticle(this.props.id, comment, this.props.user);
        if (res) {
            const newComment = res.data.comment;
            if (this.state.comments !== undefined) {
                this.getComments();
            }
        }
    }

    deleteComment = async (e, comment) => {
        e.preventDefault();
        await API.removeComment(comment._id)
        this.setState({
            deletedComments: [...this.state.deletedComments, comment]
        })
    }

    dateSortComments = (criterion, prevState) => {
        if (this.state !== prevState) {
            const sortable = this.state.comments;
            let dateSorted = sortBy(sortable, comment => comment.created_at);
            criterion === 'oldest' ? dateSorted : dateSorted.reverse();
            this.setState({
                comments: dateSorted
            });
        }
    }

    trendSortComments = () => {
        const sortable = this.state.comments;
        const popularitySorted = sortBy(sortable, comment => (comment.votes)).reverse()
        this.setState({
            comments: popularitySorted
        })
    }
}

export default Comments;