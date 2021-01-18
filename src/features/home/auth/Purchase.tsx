import React from 'react';
import { Col, Container, Row, Form, FormGroup, Input, Button } from 'reactstrap';

// import './sign-in.scss'
import logo from '../../../assets/images/logo.svg'
import Select from 'react-select';
import { Link } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth_footer/AuthFooter';

const options = [
    { value: 'Debit Card', label: 'Debit Card' },
    { value: 'Credit Card', label: 'Credit Card' },
];

const Purchase = () => {
    return (
        <>
        <div className="signin signup pb-250">
            <Container>
                <Row>
                    <Col sm="8"  md="8" lg="5">
                    <Link to={'/'}>
                        <img alt=''src={logo} className="logo-banner" />
                        </Link>
                        <h1>Purchase membership</h1>
                        <Row>
                            <Col md="10">
                                <Form>
                                    <Select
                                        options={options}
                                        placeholder={'Choose your payment method'}
                                    />
                                    <FormGroup className="mt-3">
                                        <Input type="text" name="cardnumber" id="cardid" placeholder="Enter your card number" />
                                        <Row className="purchase-form">
                                            <Col md="6">
                                                <Input type="text" name="Expiration" id="exampleEmail" placeholder="Expiration date" />

                                            </Col>
                                            <Col md="6">
                                                <Input type="text" name="Expiration" id="exampleEmail" placeholder="Security code (CVV)" />

                                            </Col>
                                        </Row>
                                        <Link to='/purchase-success'>
                                            <Button className="button-btnGradiant">Purchase</Button>
                                        </Link>
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
export default Purchase;