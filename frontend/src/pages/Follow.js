import React, { Component } from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import ReactSelect from '../components/ReactSelect'

//axios
import instance from '../axios'

export default class Follow extends Component {

    constructor(){
        super();

        this.handleFollowPublisher = this.handleFollowPublisher.bind(this);
        this.handleFollowAuthor = this.handleFollowAuthor.bind(this);

        this.handleUserTopSelectChange = this.handleUserTopSelectChange.bind(this);
        this.handleUserBelowSelectChange = this.handleUserBelowSelectChange.bind(this);
        this.handlePublisherSelectChange = this.handlePublisherSelectChange.bind(this);
        this.handleAuthorSelectChange = this.handleAuthorSelectChange.bind(this);

        this.state = {
            authors: [],
            publishers: [],
            users: [],
            selectedusertop: '',
            selecteduserbelow: '',
            selectedpublisher: '',
            selectedauthor: '',
            success: '',
            error: ''
        }
    }

    componentDidMount() {
        instance.get('/core/users')
            .then((res) => {
                this.setState({
                    users: res.data.map((user) => {
                        return({
                            'value': user.id,
                            'label': user.userid
                        })
                    })
                })
            })

        instance.get('/core/publisher')
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

        instance.get('/core/author')
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
    }

    handleUserTopSelectChange = selectedusertop => {
        this.setState({
            selectedusertop
        })
    }   

    handleUserBelowSelectChange = selecteduserbelow => {
        this.setState({
            selecteduserbelow
        })
    }

    handlePublisherSelectChange = selectedpublisher => {
        this.setState({
            selectedpublisher
        })
    }

    handleAuthorSelectChange = selectedauthor => {
        this.setState({
            selectedauthor
        })
    }

    handleFollowAuthor(e) {
        e.preventDefault();
        const data = {
            'followerid': this.state.selecteduserbelow.value,
            'followingid': this.state.selectedauthor.value
        }


        instance.post('/core/followauthor/', data)
            .then((res) => {
                if(res.data.error) {
                    this.setState({
                        error: res.data.error,
                        success: ''
                    })
                } else {
                    this.setState({
                        error: '',
                        success: this.state.selecteduserbelow.label + ' Followed Author ' + this.state.selectedauthor.label
                    })
                }
            })
        
    }

    handleFollowPublisher(e) {
        e.preventDefault();
        const data = {
            'followerid': this.state.selectedusertop.value,
            'followingid': this.state.selectedpublisher.value
        }
        
        instance.post('/core/followpublisher/', data)
            .then((res) => {
                if (res.data.error) {
                    this.setState({
                        error: res.data.error,
                        success: ''
                    })
                } else {
                    this.setState({
                        error: '',
                        success: this.state.selectedusertop.label + ' Followed Publisher ' + this.state.selectedpublisher.label
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <div className="mb-5 pb-4">
                    <h1 className="text-center">Follow Publishers and Authors</h1>
                </div>
                
                <Row>
                    <Col md="4">
                        <p>Select User: </p>
                        <ReactSelect 
                            selectedOption = {
                                this.state.selectedusertop
                            }
                            handleChange = {
                                this.handleUserTopSelectChange
                            }
                            options = {
                                this.state.users
                            }
                        />
                    </Col>
                    <Col md="4">
                        <p>Select Publisher: </p>
                        <ReactSelect 
                            selectedOption = {
                                this.state.selectedpublisher
                            }
                            handleChange = {
                                this.handlePublisherSelectChange
                            }
                            options = {
                                this.state.publishers
                            }
                        />
                    </Col>
                    <Col md="4">
                            <div className="mt-4 pt-3"></div>
                            <Button variant="primary" onClick={this.handleFollowPublisher}>Follow Publisher</Button>{' '}
                    </Col>
                </Row>

                <div className="mt-4">
                    <Row>
                        <Col md="4">
                            <p>Select User: </p>
                            <ReactSelect 
                                selectedOption = {
                                    this.state.selecteduserbelow
                                }
                                handleChange = {
                                    this.handleUserBelowSelectChange
                                }
                                options = {
                                    this.state.users
                                }
                            />
                        </Col>
                        <Col md="4">
                            <p>Select Author: </p>
                            <ReactSelect 
                                selectedOption = {
                                    this.state.selectedauthor
                                }
                                handleChange = {
                                    this.handleAuthorSelectChange
                                }
                                options = {
                                    this.state.authors
                                }
                            />
                        </Col>
                        <Col md="4">
                                <div className="mt-4 pt-3"></div>
                                <Button variant="dark" onClick={this.handleFollowAuthor}>Follow Author</Button>{' '}
                        </Col>
                    </Row>
                </div>
                <div className="mt-4">
                    <div>
                    <span className="text-success">{this.state.success}</span>
                    </div>
                    <div>
                        <span className="text-danger">{this.state.error}</span>
                    </div>
                </div>
                
            </div>
        )
    }
}
