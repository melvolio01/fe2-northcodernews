import React, { Component } from 'react';
import * as API from '../api';
import Comment from './Comment';
import NewComment from './NewComment';
import './Comments.css';


class Comments extends Component {
    state = {
        comments: [],
        deletedComments: []
    }
    render() {
        return (
            <div>
                <div>
                    {
                        this.state.comments.length > 0 ?
                            this.state.comments.map(comment => {
                                if (!this.state.deletedComments.includes(comment)) {
                                    return <Comment key={comment._id} user={this.props.user} comment={comment} deleteComment={this.deleteComment} />

                                } else return null
                            })
                            : null}
                </div>
                <NewComment addComment={this.addComment} />
            </div>
        );
    }
    componentDidMount() {
        this.getComments();
    }

    componentWillUpdate = (prevProps) => {
        if (this.props !== prevProps) {
            this.getComments();
        }
    }

    getComments = async () => {
        const artId = this.props.id;
        const res = await API.fetchCommentsByArtId(artId);
        const comments = res.data.comments;
        this.setState({
            comments
        });
    }

    addComment = async (comment) => {
        const res = await API.addCommentToArticle(this.props.id, comment, this.props.user);
        if (res) {
            const allComments = [...this.state.comments, res.data.comment];
            this.setState({
                comments: allComments
            });
        }
        this.getComments();
    }

    deleteComment = async (e, comment) => {
        e.preventDefault();
        await API.removeComment(comment._id)
        this.setState({
            deletedComments: [...this.state.deletedComments, comment]
        })
    }
}

export default Comments;