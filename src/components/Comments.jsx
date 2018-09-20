import React, { Component } from 'react';
import * as API from '../api';
import NewComment from './NewComment.jsx';
import './Comments.css';
import moment from 'moment';

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
                        this.state.comments ?
                            this.state.comments.map(comment => {
                                if (!this.state.deletedComments.includes(comment)) {
                                    console.log(comment);
                                    const myComment = (comment.created_by._id === this.props.user);
                                    const createdAt = moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a');
                                    return <div key={comment._id} className={myComment ? "my-comment" : null} >
                                        <p className="bold">{comment.created_by.username} </p>
                                        <p>{'(' + createdAt + ')'}</p>
                                        <p key={comment._id}>{comment.body}</p>
                                        {myComment ? <i className="fas fa-trash-alt" onClick={((e) => this.deleteComment(e, comment))}></i> : null}
                                    </div>
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
    }

    deleteComment = async (e, comment) => {
        e.preventDefault();
        console.log(this.state.comments.length);
        const res = await API.removeComment(comment._id)
        console.log(res);
        this.setState({
            deletedComments: [...this.state.deletedComments, comment]
        }, () => {
            console.log(this.state.comments.length);
        })
    }
}

export default Comments;