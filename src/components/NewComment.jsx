import React, { Component } from 'react';

class NewComment extends Component {
    state = {
        newComment: ''
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.newComment} onChange={this.updateComment}></input>
                    <button>Add Comment</button>
                </form>
            </div>
        );
    }

    updateComment = (e) => {
        this.setState({ newComment: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newComment = this.state.newComment;
        this.setState({ newComment: '' });
        console.log(this.state);
        this.props.addComment(newComment);
    }
}

export default NewComment;