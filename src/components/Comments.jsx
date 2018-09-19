import React, { Component } from 'react';
import * as API from '../api';
import NewComment from './NewComment.jsx';

class Comments extends Component {
    state = {
        comments: []
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.comments ?
                        this.state.comments.map(comment => {
                            return <div key={comment._id}><p>{comment.body}</p></div>
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
}

export default Comments;