import React, { Component } from 'react';
import moment from 'moment';
import './Comments.css';

class Comment extends Component {
    render() {
        console.log(this.props.user);
        const comment = this.props.comment;
        const myComment = (comment.created_by._id === this.props.user);
        const createdAt = moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a');
        return <div key={comment._id} className={myComment ? "my-comment" : null} >
            <div className="voter"> {!myComment ?
                <div>
                    <i className="far fa-arrow-alt-circle-up"></i>
                    <p>{comment.votes}</p>
                    <i className="far fa-arrow-alt-circle-down"></i>
                </div>
                : <p>Votes: {comment.votes}</p>
            }</div>
            <p className="bold">{comment.created_by.username} </p>
            <p>{'(' + createdAt + ')'}</p>
            <p key={comment._id}>{comment.body}</p>
            {myComment ? <i className="fas fa-trash-alt" onClick={((e) => this.props.deleteComment(e, comment))}></i> : null}
        </div>
    }
}
export default Comment;
