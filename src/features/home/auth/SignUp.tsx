import React from 'react';
import { Col, Container, Row, Form, FormGroup, Input, Button } from 'reactstrap';
import logo from '../../../assets/images/logo.svg'
// import { Link } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth_footer/AuthFooter';
import {register} from '../../../redux/auth/action'
import { connect } from 'react-redux';
import _ from 'lodash';
import { History } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import { Validators } from '../../../utils/Validators';
import { Link } from 'react-router-dom';

interface IState { 
    email: string,
    password: string, 
    password_confirmation: string,
    [key: string]: string  
};

interface Props {
    history: History,
    register: (email? : string, password?: string, password_confirmation?: string) => Promise<any>
} 
 
class SignUp extends React.Component<Props, IState> {
    readonly state: IState = { email: "", password: "", password_confirmation: "" }

    constructor(props: any ){ 
        super(props);
        this.state = {
            email: '',
            password: '',
            password_confirmation: ''
        }
    }

    onInputChange = (event: any) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    register = () => {
        const { email, password, password_confirmation } = this.state;
        if(  _.isEmpty(email) || _.isEmpty(password) || _.isEmpty(password_confirmation) ){
            toast.error('Please provide all fields');
            return;
        }
        if(!Validators.isEmail(email)){
            toast.error("Invalid email");
            return;
        }
        if(password_confirmation != password){
            toast.error("Both password should match");
            return;
        }
        if(password.length < 8 ) {
            toast.error("Password must contain atleast 8 characters")
            return;
        }
        this.props.register(email, password, password_confirmation).then((response) => {
            console.log("##response", response, response['data']['success']);
            if(response['data']['success']){
                toast.success('Successfully registered');
                setTimeout(() => this.props.history.push('sign-in'),200);
            }
        })
        .catch((error) => {
            toast.error('Something went wrong')
        }); 
    }
    enterSaveChanges = (event: any) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          this.register();
        }
      }
    render(){
        return (
            <>
            <div className="signin signup pb-250">
                <Container>
                        <ToastContainer />
                    <Row>
                        <Col sm="8"  md="7" lg="5">
                            <Link to={'/'}>
                            <img alt=''src={logo} className="logo-banner" />
                            </Link>
                            <h1>Sign Up to LOOP</h1>
                            <Row>
                                <Col md="10">
                                    <p>It’s time to change the way you network. Ready?</p>

                                    <Form>
                                        <FormGroup>
                                            <Input type="email" name="email" placeholder="Enter your email" onChange={this.onInputChange}  onKeyUp={this.enterSaveChanges}/>
                                            <Input type="password" name="password" placeholder="Enter your password" onChange={this.onInputChange}  onKeyUp={this.enterSaveChanges}/>
                                            <Input type="password" name="password_confirmation" placeholder="Confirm your password" onChange={this.onInputChange}  onKeyUp={this.enterSaveChanges}/>
                                            {/* <Link to='/plan'> */}
                                                <Button className="button-btnGradiant" onClick={this.register} >Let’s go!</Button>
                                            {/* </Link> */}
                                        </FormGroup>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <AuthFooter />
            </>
        )
    }
}


interface RootState {
    auth: object
}

const mapStateToProps = ( state: RootState ) => {
    return { auth: state.auth}
}

const mapDispatchToProps = { register }


export default  connect(mapStateToProps, mapDispatchToProps )(SignUp);