import React, { Component } from 'react';

class NewComment extends Component {
    state = {
        newComment: ''
    }
    render() {
        return (
            <div>
                <h4>New Comment Form!</h4>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.updateComment}></input>
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
        this.setState({
            newComment: ''
        });
        this.props.addComment(newComment);
    }
}

export default NewComment;