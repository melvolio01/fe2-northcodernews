import React, { Component } from 'react';
import './NewArticle.css';

class NewArticle extends Component {
    state = {
        newArticle: {}
    }
    render() {
        return (
            <div className="new-article-container">
                <div className="new-article">
                    <h4>Add a new article</h4>
                    <form onSubmit={this.handleSubmit}>
                        <select className="topic-select">
                            <option value="football">Football</option>
                            <option value="coding">Coding</option>
                            <option value="cooking">Cooking</option>
                        </select>
                        <input className="new-article-title" placeholder="Title"></input>
                        <input className="img-url" alt="image url" placeholder="Image Url"></input>
                        <textarea className="new-article-body" placeholder="Type or paste your article here."></textarea>
                        <button>Add Article</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewArticle;