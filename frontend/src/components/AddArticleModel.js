import React, { Component } from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import ReactSelect from './ReactSelect'

export default class AddArticleModel extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Article</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Enter Article Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder = "Enter Article Title"
                                onChange={this.props.handleInputChange}
                                value= {this.props.value}
                            
                            />
                        </Form.Group>

                        <Form.Group>
                            <p>Select {this.props.writer}: </p>
                            <ReactSelect
                                selectedOption = {
                                    this.props.selected
                                }
                                handleChange = {
                                    this.props.handleChange
                                }
                                options = {
                                    this.props.publishers
                                }
                            />
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
                        Add Article
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}
