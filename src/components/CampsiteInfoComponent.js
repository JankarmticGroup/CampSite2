import { Card, CardImg, Modal, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, ModalHeader, ModalBody,
     Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { LocalForm, Control } from 'react-redux-form';
import ModalFooter from 'reactstrap/lib/ModalFooter';
const errors = {
    author: ''
};
const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
class CommentForm extends Component{   


    constructor(props) {
        super(props);

        this.state = { 
                      isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    validate(author) {

        

        if (this.state.touched.author) {
            if (author.length < 2) {
                errors.author = 'Name must be at least 2 characters.';
            } else if (author.length > 15) {
                errors.author = 'Name must be 15 or less characters.';
            }
        }}

    render () {
        return (
        <React.Fragment>
            <Button outline onClick={this.toggleModal} color="secondary" className="fa-lg"><i class="fa fa-pencil" aria-hidden="true"></i>
            Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm>
                <div className="form-group">
                    <Label htmlFor="rating" >Rating</Label>
                    <Control.select model=".rating" id="rating" name="rating">
                    <option value="">--Please choose a Rating--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </Control.select>  
                </div>
                <div className="form-group">
                    <Label htmlFor="author" >Your Name</Label>
                    <Control.text model=".author" id="author" name="author"
                     placeholder="Your Name" className="form-control"
                     validators={{
                        required, 
                        minLength: minLength(2),
                        maxLength: maxLength(15)
                    }}/>
                </div>
                <div className="form-group">
                    <Label htmlFor="Comment" >Your Comment</Label><span></span>
                    <Control.textarea model=".text" id="text" name="text" placeholder="Comment" className="md-6" />
                </div>
                <Button color="primary">Submit</Button>
                </LocalForm>
            </ModalBody>
            <ModalFooter>
                
            </ModalFooter>
            </Modal>

                 
        </React.Fragment>)
        
    }
    
}


 function RenderCampsite ({campsite}) {
     return (
        <div className= 'col-md-5 md-1'>  
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
         </div>)
}; 
function RenderComments({comments}){
    if(comments) {
        return (
            <div className= "md-5 md-1">
                <h4>Comments</h4>
                {comments.map(comment=>  {
                     return(
                        <div key = {comment.id}>
                            <p>{comment.text}<br />
                            {comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:
                            '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    )
                     }
                     )}
          <CommentForm />  </div>)}
                             
       //  <br></br> </div>
    }


function CampsiteInfo(props){
     if (props.campsite) {                                                            
    return (
        <div className = "container">
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
            <div className= "row" >
                <RenderCampsite campsite={props.campsite} />
                <RenderComments comments={props.comments} />
            </div>
            </div>)
} return <div />;}






export default CampsiteInfo;