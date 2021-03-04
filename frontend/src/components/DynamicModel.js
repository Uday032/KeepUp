import React, { Component } from 'react'
import {Button, Modal, Form} from 'react-bootstrap'

export default class DynamicModel extends Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.text}</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>User Id</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter User id" 
                                onChange={this.props.handleInputChange}
                                value= {this.props.value}
                            
                            />
                        </Form.Group>
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
