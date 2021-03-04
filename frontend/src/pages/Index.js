import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import DynamicModel from '../components/DynamicModel'

import {
    Link
} from "react-router-dom";

export default class index extends Component {
    constructor(){
        super();

        this.handleUserShow = this.handleUserShow.bind(this);
        this.handleUserClose = this.handleUserClose.bind(this);
        this.handlePublisherShow = this.handlePublisherShow.bind(this);
        this.handlePublisherClose = this.handlePublisherClose.bind(this);
        this.handleAuthorShow = this.handleAuthorShow.bind(this);
        this.handleAuthorClose = this.handleAuthorClose.bind(this);

        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleAddPublisher = this.handleAddPublisher.bind(this);
        this.handleAddAuthor = this.handleAddAuthor.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            usershow: 0,
            publishershow: 0,
            authorshow: 0,
            inputtext: ''
        }
    }

    handleAddUser(e) {

    }

    handleAddPublisher(e) {

    }

    handleAddAuthor(e) {

    }

    handleUserShow(e) {
        this.setState({
            usershow: 1
        })
    }

    handleUserClose(e) {
        this.setState({
            usershow: 0
        })
    }

    handlePublisherShow(e) {
        this.setState({
            publishershow: 1
        })
    }

    handlePublisherClose(e) {
        this.setState({
            publishershow: 0
        })
    }

    handleAuthorShow(e) {
        this.setState({
            publishershow: 1
        })
    }

    handleAuthorClose(e) {
        this.setState({
            authorshow: 0
        })
    }

    handleInputChange(e) {
        this.setState({
            inputtext: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleUserShow}>Add User</Button>{' '}
                <Button variant="success" onClick={this.handlePublisherShow}>Add Publisher</Button>{' '}
                <Button variant="dark" onClick={this.handleAuthorShow}>Add Author</Button>{' '}

                <DynamicModel 
                    show = {this.state.usershow}
                    handleClose = {this.handleUserClose}
                    text = "Add User"
                    handleInputChange= {this.handleInputChange}
                    value = {this.state.inputtext}
                    handlesubmit = {this.handleAddUser}
                />

                <DynamicModel 
                    show = {this.state.publishershow}
                    handleClose = {this.handlePublisherClose}
                    text = "Add Publisher"
                    handleInputChange= {this.handleInputChange}
                    value = {this.state.inputtext}   
                    handlesubmit = {this.handleAddPublisher} 
                />

                <DynamicModel 
                    show = {this.state.authorshow}
                    handleClose = {this.handleAuthorClose}
                    text = "Add Author"
                    handleInputChange= {this.handleInputChange}
                    value = {this.state.inputtext}
                    handlesubmit= {this.handleAddAuthor}
                />

                <div className="mt-4">
                    <div>
                        <Link to="/follow">Follow Authors and Publishers</Link>
                    </div>
                    <div>
                        <Link to="/getarticles">Get Articles</Link>
                    </div>
                </div>
            </div>
        )
    }
}
