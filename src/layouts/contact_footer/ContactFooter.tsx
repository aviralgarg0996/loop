import React from 'react';
import { Col,  Row, Button, FormGroup, Form, Input, Container } from 'reactstrap';
import envelope from '../../assets/images/icons/envelope.svg'
import instagram from '../../assets/images/icons/instagram.svg'
 import  './ContactFooter.scss';
import { connect } from 'react-redux';
import { contactUs } from '../../redux/auth/action'
import { ContactUsReq } from '../../utils/models/other.model';
import _ from 'lodash';
import { Validators } from '../../utils/Validators';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import { contactData } from '../../redux/home/action'

interface State {
    isChecked: boolean,
    contactUs: ContactUsReq
}

interface Props {
    contactUs: (data: ContactUsReq)=> Promise<any>,
    contactData: any,
    contactTitleData: any
}

class ContactFooter extends React.Component<Props,State> {
    
    readonly state : State = { isChecked: false, contactUs: {email:'', name: '',message: 'dummy' }} 
  //  const [isChecked, setIsChecked] = useState(true);
    componentWillMount() {
        this.props.contactData();
    }
    setIsChecked = () => {
        this.setState({isChecked: !this.state.isChecked})
    }

    inputHandler = (event: any) => {
        const { contactUs } = this.state;
        switch(event.target.name){
            case 'name': 
                contactUs.name = event.target.value;
            break;
            case 'email': 
                contactUs.email = event.target.value;
            break;
        }
        this.setState({ contactUs })
    }

    onSubmit = () => {
        const { contactUs, isChecked } = this.state;
        if(_.isEmpty(contactUs.email) || _.isEmpty(contactUs.name)){
            toast.error("Please provide all fields");
            return;
        }
        if(!Validators.isEmail(contactUs.email)){
            toast.error("Invalid email");
            return;
        }
        if(!isChecked){
            toast.error("Please accept terms and conditions");
            return;
        }
        
        this.props.contactUs(this.state.contactUs).then((res: any) => {
            console.log("#res", res);
            toast(res.data)
        });
        
    }

    render(){
        const { isChecked } = this.state;
        const contactDataAll = this.props && this.props.contactTitleData && this.props.contactTitleData[0]
        return(
            <div className="section-3">
                <ToastContainer/>
            <Container>
            <h1>{contactDataAll && contactDataAll.contact_title}</h1>
            <p className="p-1">{contactDataAll && contactDataAll.contact_description}</p>
            <Row className="justify-content-center m-0 flex-nowrap social-icon">
                <div className="d-flex mr-30">
                    <img src={envelope} className="mr-2" alt=''/> {contactDataAll && contactDataAll.contact_email}
                </div>
                <div className="d-flex  ml-30">
                    <img src={instagram} className="mr-2" alt=''/> {contactDataAll && contactDataAll.contact_instagram}
                </div>
            </Row>
            <Form className="mt-4 pt-1">
                <FormGroup>
                    <Row className="justify-content-center m-0">
                        <Col sm="10" md="10" lg="10" className="contact-form">
                            <Row>
                                <Col md="8">
                                    <Row>
                                        <Col md="6">
                                            <Input type="email" name="name" id="exampleEmail" onChange={this.inputHandler} placeholder="Enter your name" />
                                        </Col>
                                        <Col md="6">
                                            <Input type="email" name="email" id="exampleEmail" onChange={this.inputHandler} placeholder="Enter your email" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="8" md="8" lg="8">

                                            <label className="custom-checkbox"> 
                                                <span className="label-text">I accept Terms & Conditions</span>
                                                <div>
                                                <input type="checkbox" checked={isChecked} onChange={() => this.setIsChecked()} />
                                                <span className="checkmark"></span>
                                                </div>
                                                
                                            </label>

                                        </Col>
                                    </Row>

                                </Col>
                                <Col md="4">
                                         <Button className="button-btnGradiant" onClick={this.onSubmit} >Submit</Button>
                                 </Col>
                            </Row>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
            <div className="container footer-contact">
                <div className="footer  d-flex justify-content-between">
                <Link to="/hub/settings/terms-and-condition">
                    <p>Privacy Policy & Terms of Service</p>
                </Link>

                    <p>© 2020 LOOP Inc. All rights reserved.</p>
                </div>
            </div>
            </Container>
            
        </div>
        )
    }
}
const mapStateToProps = ( state: any ) => {
    return { 
        contactTitleData: state.home.contact,

    }
}

const mapDispatchToProps = {
    contactUs,
    contactData
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFooter);