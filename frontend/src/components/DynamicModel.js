import React, { Component } from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import ReactSelect from './ReactSelect'

//axios
import instance from '../axios'

export default class DynamicModel extends Component {

    constructor() {
        super();
        
        this.state = {
            publishers: [],
            showpublishers: 0
        }
    }

    componentDidMount() {
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

                this.setState({
                    publishers: this.state.publishers.concat({
                        value: null,
                        label: "None"
                    })
                })
            })
    }

    render() {
            let Select;
            if (this.props.modelid==="Author") {
                Select = <ReactSelect
                    selectedOption = {
                        this.props.selected
                    }
                    handleChange = {
                        this.props.handleChange
                    }
                    options = {
                        this.state.publishers
                    }
                />
            }
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.text}</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>{this.props.modelid} Id</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder = "Enter id"
                                onChange={this.props.handleInputChange}
                                value= {this.props.value}
                            
                            />
                        </Form.Group>

                        <Form.Group>
                            <div style={{display: (this.props.modelid==="Author") ? "block" : "none"}}>
                                <p>Select Publisher: </p>
                            </div>
                            {
                                Select
                            }
                        </Form.Group>
                        <div>
                            <span className="text-success">{this.props.success}</span>
                        </div>
                        <div>
                            <span className="text-danger">{this.props.error}</span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.handlesubmit}>
                        {this.props.text}
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}
