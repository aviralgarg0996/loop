import React from 'react';
import { Col, Container, Row, Form, FormGroup, Input, Button } from 'reactstrap';
import logo from '../../../assets/images/logo.svg'
import AuthFooter from '../../../layouts/auth_footer/AuthFooter';
import { connect } from 'react-redux';
import { login } from '../../../redux/auth/action'
import _ from 'lodash';
import { History } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import { Validators } from '../../../utils/Validators';
import { Link } from 'react-router-dom';

interface State {
    email: string;
    password: string;
    [key: string]: string;
}

interface Props {
    history: History,
    login: (email?: string, password?: string) => Promise<any>
}

class SignIn extends React.Component<Props, State> {
    readonly state: State = { email: '', password: '' };

    constructor(props: any) {

        super(props);
    }

    onInputChange = (event: any) => {
        this.setState(
            { [event.target.name]: event.target.value }
        )
    }

    signIn = () => {
        let { email, password } = this.state;

        if (!Validators.isEmail(email)) {
            toast.error("Invalid email");
            return;
        }

        if (!(_.isEmpty(email) && _.isEmpty(password))) {
            this.props.login(email, password).then((response) => {
                toast('Successfully Logged in');
                if (response && !response.full_name && !response.last_name && !response.image) {
                    this.props.history.replace('/hub/edit-profile');
                }
                else {
                    setTimeout(() => {
                        this.props.history.replace('/discovery');
                    }, 200);
                }
            })
                .catch((error) => {
                    toast('Login failed')
                });
        }
    }
    enterSaveChanges = (event: any) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.signIn();
        }
    }
    render() {
        return (
            <>
                <div className="signin pb-250">
                    <Container>

                        <ToastContainer />

                        <Row>
                            <Col sm="8" md="7" lg="5">
                                <Link to={'/'}>
                                    <img alt='' src={logo} className="logo-banner" />
                                </Link>
                                <h1>Welcome back  to LOOP</h1>
                                <p>Let’s get you signed in</p>
                                <Row>
                                    <Col md="10">
                                        <Form>
                                            <FormGroup>
                                                <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email" onChange={this.onInputChange} onKeyUp={this.enterSaveChanges} />
                                                <Input type="password" name="password" id="exampleEmail" placeholder="Enter your password" onChange={this.onInputChange} onKeyUp={this.enterSaveChanges} />
                                                {/* <Link to='/plan'> */}
                                                <Button className="button-btnGradiant" onClick={this.signIn} >Sign In</Button>
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

const mapStateToProps = (state: RootState) => {
    return { auth: state.auth }
}

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);