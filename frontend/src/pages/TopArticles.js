import React, { Component } from 'react'
import ArticleCard from '../components/ArticlesCard'
import {CardColumns} from 'react-bootstrap'
//Axios
import instance from '../axios'

export default class TopArticles extends Component {

    constructor(){
        super();

        this.state = {
            articles: [],
            error: ''
        }
    }

    componentDidMount() {
        instance.get('/core/getarticles/top')
            .then((res) => {
                if(res.data.length===0) {
                    this.setState({
                        error: 'No Articles'
                    })
                } else {
                    this.setState({
                        articles: res.data,
                        error: ''
                    })
                }
            })
    }

    render() {
        return (
            <div>
                <div className="mb-5 pb-4">
                    <h1 className="text-center">Top Articles</h1>
                </div>
                
                <CardColumns>
                    {
                        this.state.articles.map((article) => {
                            return ( <
                                ArticleCard key = {
                                    article.id
                                }
                                Title = {
                                    article.ArticleTitle
                                }
                                authorname = '' /
                                >
                            );
                        })
                    }
                </CardColumns>
            </div>
        )
    }
}
