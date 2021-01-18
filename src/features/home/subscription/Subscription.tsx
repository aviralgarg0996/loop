import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row, Card, Button } from 'reactstrap';
import ContactFooter from '../../../layouts/contact_footer/ContactFooter';
import { subData } from '../../../redux/subscription/action'

import './Subscription.scss'

interface IProps {
    subData: any,
    subscriptionData: any
} 

class Subscription extends React.Component<IProps> {
    constructor(props: any) {
        super(props);
      }

      componentWillMount() {
        this.props.subData();
      }
render() {
    const data = this.props &&  this.props.subscriptionData && this.props.subscriptionData[0]

    return (
        <div className="subscription-page">
            <div className="section-1">
                <Container>
                    <Row>
                        <Col md="5" className="left-section">
                            <h1>{data && data.subscription_title}</h1>
                            <p>{data && data.subscription_description}</p>
                        </Col>
                        <Col md="7">
                            <Row>
                                <Col md="12">
                                <Card>
                                    
                                        {/* <Button className="free-btn">Free</Button> */}
                                        <Row>
                                            <Col md="12">
                                                <p>{data && data.subscription_plan_title}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                                <ul className="pr-2">
                                                    <li>{data && data.subscription_bullet_1_title}</li>
                                                    <li>{data && data.subscription_bullet_2_title}</li>
                                                </ul>
                                            </Col>
                                            <Col md="6">
                                                <ul className="pr-2">
                                                    <li>{data && data.subscription_bullet_3_title}</li>
                                                </ul>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6">
                                            <Button className="border-gradiant-btn select-sub-btn">
                                                <div className="inner-module">
                                                <span>{data && data.subscription_button_title}</span></div>
                                            </Button>
                                            </Col>
                                             
                                        </Row>
                                        
                                    </Card>
                                </Col>
                                {/* <Col md="6">
                                    <Card>
                                        <Button className="pro-btn">Pro</Button>
                                        <p>Get a feel for the platform with the following features:</p>
                                        <ul>
                                            <li>Connect with others worldwide</li>
                                            <li>Collaborate on projects. Includes Virtual Sessions, file sharing and voice memo features</li>
                                            <li>Feeling Random generator</li>
                                        </ul>
                                        <Button className="border-gradiant-btn">
                                        <div className="inner-module">
                                        <span>Select</span></div>
                                            
                                            </Button>
                                    </Card>
                                </Col> */}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ContactFooter />
            
        </div>
    )
}
}
const mapStateToProps = ( state: any ) => {
    return { 
        subscriptionData: state.subscription.data,
    }
}

const mapDispatchToProps =  {
    subData 
}
export default connect(mapStateToProps, mapDispatchToProps )(Subscription);