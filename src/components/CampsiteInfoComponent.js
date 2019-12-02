import React, { Component } from 'react'
import { Jumbotron, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
class CampsiteInfo extends Component {
    constructor(props) {
        super(props)
        this.state={};
    }
    renderCampsite(campsite) {
        return(
            <div className='col-md-5 m-1'>
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    renderComments(comments) {
        if(comments) {
            return(
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return(
                            <div key={comment.id}>
                                <p>{comment.text}</p>
                                <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>
                        )
                    })}
                </div>
            )
        }
        return(
            <div>
            </div>
        )
    }
    render() {
        const {campsite } = this.props
        if(campsite) {
            return(
                <Jumbotron className='col-md-10 m-1'>
                    <div className='row'>
                        {this.renderCampsite(campsite)}
                        {this.renderComments(campsite.comments)}
                    </div>
                </Jumbotron>
            )
        } else {
            return(
                <div>
                </div>
            )
        }
    }
}
export default CampsiteInfo;
