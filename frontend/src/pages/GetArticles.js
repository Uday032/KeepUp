import React, { Component } from 'react'
import {Tab, Row, Col, Nav, CardColumns} from 'react-bootstrap'
import ReactSelect from '../components/ReactSelect'
import ArticleCard from '../components/ArticlesCard'

//axios
import instance from '../axios'

export default class GetArticles extends Component {

    constructor() {
        super();

        this.handleAuthorSelect = this.handleAuthorSelect.bind(this);
        this.handlePublisherSelect = this.handlePublisherSelect.bind(this);
        this.handleUserSelect = this.handleUserSelect.bind(this);

        this.GetPublishers = this.GetPublishers.bind(this);
        this.GetUsers = this.GetUsers.bind(this);
        this.GetAuthor = this.GetAuthor.bind(this);

        this.state = {
            authors: [],
            publishers: [],
            users: [],
            authorarticles: [],
            publisherarticles: [],
            userfollwedarticles: [],
            selectedauthor: '',
            selectedpublisher: '',
            selecteduser: '',
            error: ''
        }
    }

    handleAuthorSelect = selectedauthor => {
        this.setState({selectedauthor})
        let url = '/core/getarticles/author/' + selectedauthor.value;

        instance.get(url)
            .then((res) => {
                if(res.data.length===0) {
                    this.setState({
                        error: 'No Articles',
                        authorarticles: []
                    })
                } else {
                    this.setState({
                        authorarticles: res.data,
                        error: ''
                    })
                }
            })
    }

    handlePublisherSelect = selectedpublisher => {
        this.setState({selectedpublisher})
        let url = '/core/getarticles/publisher/'+selectedpublisher.value;

        instance.get(url)
            .then((res)=> {
                if (res.data.length === 0) {
                    this.setState({
                        error: 'No Articles',
                        publisherarticles: []
                    })
                } else {
                    this.setState({
                        publisherarticles: res.data,
                        error: ''
                    })
                }
            })
    }

    handleUserSelect = selecteduser => {
        this.setState({selecteduser})
        let url = '/core/getarticles/' + selecteduser.value;

        instance.get(url)
            .then((res)=> {
                if (res.data.length === 0) {
                    this.setState({
                        error: 'No Articles of Followed Authors and Publishers',
                        userfollwedarticles: []
                    })
                } else {
                    this.setState({
                        userfollwedarticles: res.data,
                        error: ''
                    })
                }
            })
    }

    GetAuthor(e) {
        this.setState({
            error: ''
        })
    }
    
    GetUsers(e) {
        this.setState({
            error: ''
        })
        instance.get('/core/users/')
            .then((res) => {
                this.setState({
                    users: res.data.map((user) => {
                        return ({
                            'value': user.id,
                            'label': user.userid
                        })
                    })
                })
            })
    }

    GetPublishers(e){
        this.setState({
            error: ''
        })
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
    }

    componentDidMount() {
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
    }

    render() {
        return (
            <div>
                <div className="mb-5 pb-4">
                    <h1 className="text-center">Get Articles</h1>
                </div>

                <Tab.Container id="left-tabs-example" defaultActiveKey="first">    
                    <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                            <Nav.Link eventKey="first" onClick={this.GetAuthor}>Articles By Author</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second" onClick={this.GetPublishers}>Articles By Publisher</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third" onClick={this.GetUsers}>All Articles from user following</Nav.Link>
                        </Nav.Item>
                    </Nav>         
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <div className="mt-5">
                                <Row>
                                    <Col md="4">
                                        <p>Select Author: </p>
                                        <ReactSelect 
                                            selectedOption = {
                                                this.selectedauthor
                                            }
                                            handleChange = {
                                                this.handleAuthorSelect
                                            }
                                            options = {
                                                this.state.authors
                                            }
                                        />
                                    </Col>
                                </Row>
                                <div className="mt-5">
                                    <CardColumns>
                                        {
                                            this.state.authorarticles.map((article) => {
                                                return(
                                                    <ArticleCard 
                                                        key={article.id}
                                                        Title={article.ArticleTitle}
                                                        authorname={this.state.selectedauthor.label}
                                                    />
                                                )
                                            })
                                        }
                                    </CardColumns>
                                </div>
                                <div>
                                    <span className="text-danger">{this.state.error}</span>
                                </div>
                            </div>        
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <div className="mt-5">
                                <Row>
                                    <Col md="4">
                                        <p>Select Publisher: </p>
                                        <ReactSelect 
                                            selectedOption = {
                                                this.selectedpublisher
                                            }
                                            handleChange = {
                                                this.handlePublisherSelect
                                            }
                                            options = {
                                                this.state.publishers
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className="mt-5">
                                <CardColumns>
                                    {
                                        this.state.publisherarticles.map((article) => {
                                            return(
                                                <ArticleCard 
                                                    key={article.id}
                                                    Title={article.ArticleTitle}
                                                    authorname={this.state.selectedauthor.label}
                                                />
                                            )
                                        })
                                    }
                                </CardColumns>
                            </div>
                            <div>
                                <span className="text-danger">{this.state.error}</span>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <div className="mt-5">
                                <Row>
                                    <Col md="4">
                                        <p>Select User: </p>
                                        <ReactSelect 
                                            selectedOption = {
                                                this.selecteduser
                                            }
                                            handleChange = {
                                                this.handleUserSelect
                                            }
                                            options = {
                                                this.state.users
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                            <div className="mt-5">
                                <CardColumns>
                                    {
                                        this.state.userfollwedarticles.map((article) => {
                                            return(
                                                <ArticleCard 
                                                    key={article.id}
                                                    Title={article.ArticleTitle}
                                                />
                                            )
                                        })
                                    }
                                </CardColumns>
                            </div>
                            <div>
                                <span className="text-danger">{this.state.error}</span>
                            </div>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        )
    }
}
