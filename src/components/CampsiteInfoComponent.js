import React from 'react'
import { Button, Row, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit(values) {
        this.toggle()
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggle}> <i className='fa fa-pencil' aria-hidden="true"/> Submit Button </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}> Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <Row className='form-group'>
                                    <Label htmlFor='rating'>Rating</Label>
                                    <Control.select
                                        defaultValue={1}
                                        className='form-control'
                                        model='.rating'
                                        name='rating'
                                        id='rating'
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='author'>Author</Label>
                                    <Control.text
                                        className='form-control'
                                        model='.author'
                                        name='rating'
                                        id='rating'
                                        validators={
                                            {minLength: minLength(2),
                                            maxLength: maxLength(15)}}>
                                    </Control.text>
                                    <Errors
                                        className='text-danger'
                                        model='.author'
                                        show='touched'
                                        component='div'
                                        messages={{
                                            minLength: 'Must be at least 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}/>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='text'>Text</Label>
                                    <Control.textarea
                                        className='form-control'
                                        model='.text'
                                        rows='6'
                                        id='text'>
                                    </Control.textarea>
                                </Row>
                                <Button>Submit</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
            </div>
        )
    }
}
    function RenderCampsite({campsite}) {
        return(
            <div className='col-md-5 m-1'>
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    function RenderComments({comments, addComment, campsiteId}) {
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
                        );
                    })}
                      <CommentForm campsiteId={campsiteId} addComment={addComment}/>
                </div>
            )
        }
        return <div />;
    }
    function CampsiteInfo(props) {
        if(props.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        if (props.errMess) {
            return (
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            )
        }
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}/>
                    </div>
                </div>
            );
        }
        return <div />;
    }
    export default CampsiteInfo;
