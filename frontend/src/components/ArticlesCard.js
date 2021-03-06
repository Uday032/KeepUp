import React, { Component } from 'react'
import {Card} from 'react-bootstrap'

export default class ArticlesCard extends Component {
    render() {
        return (
            <Card border="dark">
                <Card.Body>
                <Card.Title>{this.props.Title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Posted By {this.props.authorname}</small>
                </Card.Footer>
            </Card>
        )
    }
}
