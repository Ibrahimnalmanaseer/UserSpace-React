import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../Styles/Modal.css"
import {Modal,Row,Container,Col} from 'react-bootstrap';
import React from "react";
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class ModalBook extends React.Component{

    constructor(props){

        super(props);
        this.state={

            selectors:[],
            termOfService:false,
           
            

        }

        
    }

handleChangeTerm = (e) => {

        if(this.state.termOfService === true){
           this.setState({
               termOfService:false 
           })
        }else{
           this.setState({
            termOfService:true 
           })
        }  
        
       
         }



componentDidMount = () => {
            axios
              .get(`https://blooming-woodland-26589.herokuapp.com/`)
              .then((result) => {
                
                
                this.setState({
                    selectors: result.data,
                });
              })
              .catch((err) => {
                
                console.log(err);
              });
          }


handleData=(event)=>{


    event.preventDefault();
    const {user}=this.props.auth0
    
    const obj={

        Email:user.email,
        Name:event.target.name.value,
        Sector:event.target.category.value,
        AgreeToTerms:this.state.termOfService,
    }
    this.props.updateUserInfo(obj)
    axios
    .put('https://blooming-woodland-26589.herokuapp.com/updateinfo',obj)

    
    
}

    
    
    render(){

   
        
        return (
     
        <>
          <Modal show={this.props.showModal} onHide={this.props.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>User Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Form onSubmit={this.handleData} className="py-4">
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicText">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Your name" name="name" defaultValue={this.props.userInfo.Name} />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Sector</Form.Label>
                      <Form.Select id="category" defaultValue={this.props.userInfo.Sector} onClick={this.handleChangeCategory}>
                        {this.state.selectors.map((item, index) => (
                          <optgroup label={item.category} key={index}>
                            {item.subcategories.map((sub, subIndex) => (
                              <option key={subIndex} value={sub}>
                                {sub}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicCheckbox">
                      <Form.Check
                        defaultChecked={this.props.userInfo.AgreeToTerms}
                        type="checkbox"
                        label="Agree to terms"
                        onClick={this.handleChangeTerm}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={{ span: 6, offset: 3 }} md={{ span: 4, offset: 4 }}>
                      <Button variant="primary" type="submit" onClick={this.props.closeModal}>
                        Save!
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </Modal.Body>
          </Modal>

    </>
        )
    }

}

export default withAuth0(ModalBook) ;