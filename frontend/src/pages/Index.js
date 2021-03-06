import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import DynamicModel from '../components/DynamicModel'
import AddArticleModel from '../components/AddArticleModel'

import {
    Link
} from "react-router-dom";


//axios
import instance from '../axios'

export default class index extends Component {
    constructor(){
        super();

        this.handleUserShow = this.handleUserShow.bind(this);
        this.handleUserClose = this.handleUserClose.bind(this);
        this.handlePublisherShow = this.handlePublisherShow.bind(this);
        this.handlePublisherClose = this.handlePublisherClose.bind(this);
        this.handleAuthorShow = this.handleAuthorShow.bind(this);
        this.handleAuthorClose = this.handleAuthorClose.bind(this);
        this.handlePublisherArticleShow = this.handlePublisherArticleShow.bind(this);
        this.handleAuthorArticleShow = this.handleAuthorArticleShow.bind(this);
        this.handlePublisherArticleClose = this.handlePublisherArticleClose.bind(this);
        this.handleAuthorArticleClose = this.handleAuthorArticleClose.bind(this);

        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleAddPublisher = this.handleAddPublisher.bind(this);
        this.handleAddAuthor = this.handleAddAuthor.bind(this);
        this.handlePublisherArticleSubmit = this.handlePublisherArticleSubmit.bind(this);
        this.handleAuthorArticleSubmit = this.handleAuthorArticleSubmit.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleArticleAuthorChange = this.handleArticleAuthorChange.bind(this);
        this.handleArticlePublisherChange = this.handleArticlePublisherChange.bind(this);

        this.state = {
            usershow: 0,
            publishershow: 0,
            authorshow: 0,
            publisherarticleshow: 0,
            authorarticleshow: 0,
            inputtext: '',
            success: '',
            error: '',
            selectedpublisher: '',
            publishers: [],
            authors: [],
            selectedarticleauthor: '',
            selectedarticlepublisher: ''
        }
    }

    handleArticleAuthorChange = selectedarticleauthor => {
        this.setState({
            selectedarticleauthor
        })
    }

    handleArticlePublisherChange = selectedarticlepublisher => {
        this.setState({
            selectedarticlepublisher
        })
    }

    handlePublisherArticleShow(e) {
        instance.get('/core/publisher/')
            .then((res) => {

                this.setState({
                    publishers: res.data.map((publisher) => {
                        return ({
                            'value': publisher.id,
                            'label': publisher.userid
                        })
                    })
                })
            })
        this.setState({
            publisherarticleshow: 1
        })
    }

    handlePublisherArticleClose(e) {
        this.setState({
            publisherarticleshow: 0
        })
    }

    handleAuthorArticleShow(e) {
        instance.get('/core/author/')
            .then((res) => {

                this.setState({
                    authors: res.data.map((author) => {
                        return ({
                            'value': author.id,
                            'label': author.userid
                        })
                    })
                })
            })
        this.setState({
            authorarticleshow: 1
        })
    }

    handleAuthorArticleClose(e){
        this.setState({
            authorarticleshow: 0
        })
    }

    handlePublisherArticleSubmit(e) {
        e.preventDefault();
        const data = {
            'ArticleTitle': this.state.inputtext,
            'Postedbypublisher': this.state.selectedarticlepublisher.value
        }

        instance.post('/core/articles/', data)
            .then((res) => {
                if(res.data.error) {
                    this.setState({
                        error: res.data.error,
                        success: ''
                    })
                } else {
                    this.setState({
                        error: '',
                        success: 'Article Added'
                    })
                }
            })
    }

    handleAuthorArticleSubmit(e) {
        e.preventDefault();
        const data = {
            'ArticleTitle': this.state.inputtext,
            'Postedbyauthor': this.state.selectedarticleauthor.value
        }

        instance.post('/core/articles/', data)
            .then((res) => {
                if (res.data.error) {
                    this.setState({
                        error: res.data.error,
                        success: ''
                    })
                } else {
                    this.setState({
                        error: '',
                        success: 'Article Added'
                    })
                }
            })
    }

    handleAddUser(e) {
        e.preventDefault();
        const data = {
            'userid': this.state.inputtext
        }
        instance.post('/core/users/', data)
            .then((res) => {
                console.log(res);
                if(res.data.error) {
                    this.setState({
                        error: res.data.error,
                        success: ''
                    })
                } else {
                    this.setState({
                        error: '',
                        success: 'User Added'
                    })
                }
            })
    }

    handleAddPublisher(e) {
        e.preventDefault();
        const data = {
            'userid': this.state.inputtext
        }
        instance.post('/core/publisher/', data)
            .then((res) => {
                console.log(res);
                if (res.data.error) {
                    this.setState({
                        error: res.data.error,
                        success: ''
                    })
                } else {
                    this.setState({
                        error: '',
                        success: 'Publisher Added'
                    })
                }
            })
    }

    handleAddAuthor(e) {
        e.preventDefault();
        const data = {
            'userid': this.state.inputtext
        }
        if (this.state.selectedpublisher.value !== null) {
            data['publisher'] = this.state.selectedpublisher.value
        }
        instance.post('/core/author/', data)
            .then((res) => {
                console.log(res);
                if (res.data.error) {
                    this.setState({
                        error: res.data.error,
                        success: ''
                    })
                } else {
                    this.setState({
                        error: '',
                        success: 'Author Added'
                    })
                }
            })
    }

    handleUserShow(e) {
        this.setState({
            usershow: 1,
            success: '',
            error: '',
            inputtext: ''
        })
    }

    handleUserClose(e) {
        this.setState({
            usershow: 0
        })
    }

    handlePublisherShow(e) {
        this.setState({
            publishershow: 1,
            success: '',
            error: '',
            inputtext: ''
        })
    }

    handlePublisherClose(e) {
        this.setState({
            publishershow: 0
        })
    }

    handleAuthorShow(e) {
        this.setState({
            authorshow: 1,
            success: '',
            error: '',
            inputtext: ''
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

    handleSelectChange = selectedpublisher => {
        this.setState({
            selectedpublisher
        })
    }

    render() {
        return (
            <div>
                <Button variant="primary" onClick={this.handleUserShow}>Add User</Button>{' '}
                <Button variant="success" onClick={this.handlePublisherShow}>Add Publisher</Button>{' '}
                <Button variant="dark" onClick={this.handleAuthorShow}>Add Author</Button>{' '}
                <Button variant="warning" onClick={this.handlePublisherArticleShow}>Add Publishers Article</Button>{' '}
                <Button variant="info" onClick={this.handleAuthorArticleShow}>Add Author Article</Button>{' '}

                <DynamicModel 
                    show = {this.state.usershow}
                    handleClose = {this.handleUserClose}
                    modelid = "User"
                    text = "Add User"
                    handleInputChange= {this.handleInputChange}
                    value = {this.state.inputtext}
                    handlesubmit = {this.handleAddUser}
                    success = {this.state.success}
                    error= {this.state.error}
                />

                <DynamicModel 
                    show = {this.state.publishershow}
                    handleClose = {this.handlePublisherClose}
                    modelid = "Publisher"
                    text = "Add Publisher"
                    handleInputChange= {this.handleInputChange}
                    value = {this.state.inputtext}   
                    handlesubmit = {this.handleAddPublisher} 
                    success = {this.state.success}
                    error= {this.state.error}
                />

                <DynamicModel 
                    show = {this.state.authorshow}
                    handleClose = {this.handleAuthorClose}
                    modelid = "Author"
                    text = "Add Author"
                    handleInputChange= {this.handleInputChange}
                    value = {this.state.inputtext}
                    handlesubmit= {this.handleAddAuthor}
                    success = {this.state.success}
                    error= {this.state.error}
                    selected= {this.state.selectedpublisher}
                    handleChange = {this.handleSelectChange}
                />
                
                <AddArticleModel
                    show={this.state.publisherarticleshow}
                    handleClose = {this.handlePublisherArticleClose}
                    writer = "Publisher"
                    handleInputChange= {this.handleInputChange}
                    value = {this.state.inputtext}
                    success = {this.state.success}
                    error= {this.state.error}
                    handlesubmit ={this.handlePublisherArticleSubmit}
                    publishers= {this.state.publishers}
                    selected= {this.state.selectedarticlepublisher}
                    handleChange = {this.handleArticlePublisherChange}
                />

                <AddArticleModel
                    show={this.state.authorarticleshow}
                    handleClose = {this.handleAuthorArticleClose}
                    writer = "Author"
                    handleInputChange= {this.handleInputChange}
                    value = {this.state.inputtext}
                    success = {this.state.success}
                    error= {this.state.error}
                    handlesubmit ={this.handleAuthorArticleSubmit}
                    publishers= {this.state.authors}
                    selected= {this.state.selectedarticleauthor}
                    handleChange = {this.handleArticleAuthorChange}
                />

                <div className="mt-4">
                    <div>
                        <Link to="/follow">Follow Authors and Publishers</Link>
                    </div>
                    <div>
                        <Link to="/getarticles">Get Articles</Link>
                    </div>
                    <div>
                        <Link to="/getauthors">Get Authors</Link>
                    </div>
                </div>
            </div>
        )
    }
}
