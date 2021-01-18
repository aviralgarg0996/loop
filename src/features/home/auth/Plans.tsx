import React, {useState}  from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
// import './sign-in.scss'
import logo from '../../../assets/images/logo.svg'
import { Link } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth_footer/AuthFooter';


const Plan = () => {
    const [isPlanFirstOpen, setIsPlanFirstOpen] = useState(false);
    const [isPlanSecondOpen, setIsPlanSecondOpen] = useState(true);
    const [isPlanThirdOpen, setIsPlanThirdOpen] = useState(false);
    const planActice = (plan: any) => {
        if(plan === 'plan1'){
            setIsPlanFirstOpen(true);
            setIsPlanSecondOpen(false);
            setIsPlanThirdOpen(false)
        } else if (plan === 'plan2'){
            setIsPlanFirstOpen(false);
            setIsPlanSecondOpen(true);
            setIsPlanThirdOpen(false)
        } else {
            setIsPlanFirstOpen(false);
            setIsPlanSecondOpen(false);
            setIsPlanThirdOpen(true)
        }
        
    }
    return (
        <>
       <div className="signin signup purchase pb-250">
            <Container>
                <Row>
                    <Col sm="10"  md="10" lg="7">
                        <Link to={'/'}>
                            <img alt=''src={logo} className="logo-banner"/>
                            <h1>Choose your membership</h1>
                        </Link>
                        <Row>
                            <Col md="11">
                                <div className="plan-section">
                                    <div className={isPlanFirstOpen ? "plan-row d-flex justify-content-between selected": "plan-row d-flex justify-content-between"} onClick={() => planActice('plan1')}>
                                        <p>Just want to browse? That’s cool - our free version is just right for you.</p>
                                        <h2>Free</h2>
                                    </div>
                                    <div className={isPlanSecondOpen ? "plan-row d-flex justify-content-between selected": "plan-row d-flex justify-content-between"} onClick={() => planActice('plan2')}>
                                        <p>Want the full LOOP experience? Good choice - pay monthly, cancel anytime.</p>
                                        <h2>25£ <br /><small>MONTH</small></h2>
                                    </div>
                                    <div className={isPlanThirdOpen ? "plan-row d-flex justify-content-between selected": "plan-row d-flex justify-content-between"} onClick={() => planActice('plan3')}>
                                        <p>The full LOOP Experience for a whole year, at a discounted price? Bingo.</p>
                                        <h2>125£ <br /><small>PER YEAR</small></h2>
                                    </div>
                                </div>
                                <Row>
                                    <Col md="8">
                                        <Link to='/purchase'>
                                            <Button className="button-btnGradiant">Select</Button>
                                        </Link>
                                    </Col>
                                </Row>
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
export default Plan;