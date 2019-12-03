import React from 'react'
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCampsite({campsite}) {
        console.log(campsite)
        console.log(campsite.image)

        return(
            <div className='col-md-5 m-1'>
                <Card>
                    <CardImg src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

function RenderComments({comments}) {
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
function CampsiteInfo(props){
        if(props.campsite) {
            return(
                <div className='container'>
                    <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                    </div>
                </div>
                    <div className='row'>
                        <RenderCampsite campsite={props.campsite}/>
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>
            )
        } else {
            return(
                <div>
                </div>
            )
        }
    }

export default CampsiteInfo;
