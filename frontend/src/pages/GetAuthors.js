import React, { Component } from 'react'
import {Row, Col} from 'react-bootstrap'
import ReactSelect from '../components/ReactSelect'

//axios
import instance from '../axios'

export default class GetAuthors extends Component {

    constructor(){
        super();

        this.handlePublisherSelectChange = this.handlePublisherSelectChange.bind(this);

        this.state = {
            publishers: [],
            selectedpublish: '',
            authors: [],
            error: ''
        }
    }

    componentDidMount() {

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

    }

    handlePublisherSelectChange = selectedpublish => {
        this.setState({selectedpublish});
        console.log(this.state.selectedpublish);
        let url = '/core/getauthours/' + selectedpublish.value;
        console.log(url);
        instance.get(url)
            .then((res)=>{
                if(res.data.length===0){
                    this.setState({
                        error: 'No Authors'
                    })
                }
                this.setState({
                    authors: res.data
                })
            })
        
    }

    render() {
        return (
            <div>
                <div className="mb-5 pb-4">
                    <h1 className="text-center">Get Authors</h1>
                </div>
                <Row>
                    <Col md="4">
                        <p>Select Publisher: </p>
                        <ReactSelect 
                            selectedOption = {
                                this.state.selectedpublish
                            }
                            handleChange = {
                                this.handlePublisherSelectChange
                            }
                            options = {
                                this.state.publishers
                            }
                        />
                    </Col>
                </Row>

                <div className="mt-4">
                    <h4>All Author Under Publisher {this.state.selectedpublish.label}</h4>
                    
                    <div className="mt-3">
                        <div>
                            <span className="text-danger">{this.state.error}</span>
                        </div>
                        <ul>
                            {
                                this.state.authors.map((author) => {
                                    return(
                                        <li key={author.userid}>{author.userid}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
