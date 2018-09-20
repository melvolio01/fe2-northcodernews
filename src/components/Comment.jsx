import React, { Component } from 'react';
import moment from 'moment';
import './Comments.css';
import * as API from '../api'

class Comment extends Component {
    state = {
        voteChange: 0
    }
    render() {
        console.log(this.props.user);
        const comment = this.props.comment;
        const myComment = (comment.created_by._id === this.props.user);
        const createdAt = moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a');
        return <div key={comment._id} className={myComment ? "my-comment" : null} >
            <div className="voter"> {!myComment ?
                <div>
                    <button onClick={() => this.handleVote('up')}><i className="far fa-arrow-alt-circle-up"></i></button>
                    <p>{comment.votes + this.state.voteChange}</p>
                    <button onClick={() => this.handleVote('down')} > <i className="far fa-arrow-alt-circle-down"></i></button>
                </div>
                : <p>Votes: {comment.votes}</p>
            }</div>
            <p className="bold">{comment.created_by.username} </p>
            <p>{'(' + createdAt + ')'}</p>
            <p key={comment._id}>{comment.body}</p>
            {myComment ? <i className="fas fa-trash-alt" onClick={((e) => this.props.deleteComment(e, comment))}></i> : null}
        </div>
    }

    handleVote = async (direction) => {
        const commentID = (this.props.comment._id);
        await API.voteOnComment(commentID, direction);
        this.setState({
            voteChange: direction === 'up' ? 1 : direction === 'down' ? -1 : 0
        })
    }

}
export default Comment;
