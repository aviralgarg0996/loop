import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Button } from 'reactstrap';

import logo from '../../../assets/images/logo.svg'
import AuthFooter from '../../../layouts/auth_footer/AuthFooter';

const PurchaseSuccess = () => {
    return (
        <>
        <div className="signin signup pb-250">
            <Container>
                <Row>
                    <Col sm="6"  md="6" lg="4">
                    <Link to={'/'}>
                    <img alt='' src={logo} className="logo-banner" />
                    </Link>
                        
                        <h1>You’re In!</h1>
                        <p>You’re now part of the LOOP Community <a href="#/">#intheloop</a></p>
                        <Button className="button-btnGradiant mt-5">Get Started</Button>
                    </Col>
                </Row>
            </Container>
        </div>
        <AuthFooter />
        </>
    )
}
export default PurchaseSuccess;