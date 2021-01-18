import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import './HowItWork.scss'
import howItWorkOne from '../../../assets/images/how-it-work1.png'
import howItWorkTwo from '../../../assets/images/how-it-work2.png'
import howItWorkThree from '../../../assets/images/how-it-work3.png'
import howItWorkFour from '../../../assets/images/how-it-work4.png'
import howItWorkFive from '../../../assets/images/how-it-work5.png'
import genre from '../../../assets/images/icons/genre.svg'
import rocket from '../../../assets/images/icons/rocket.svg'
import location from '../../../assets/images/icons/location.svg'
import ContactFooter from '../../../layouts/contact_footer/ContactFooter';
import { connect } from 'react-redux';
import { homeData } from '../../../redux/home/action';
import { howItWorkData } from '../../../redux/how-it-work/action';
interface IProps {
    howItWorkData: any,
    howItWorkDataNew: any[]
}

class HowItWork extends React.Component<IProps> {
    constructor(props: any) {
        super(props);
      }

      componentWillMount() {
        this.props.howItWorkData();
      }

    render(){
    const data = this.props &&  this.props.howItWorkDataNew && this.props.howItWorkDataNew[0]
    return (
        <div className="how-work-page">
            <div className="signin section-1">
                <Container>
                    <Row>
                        <Col md="8" className="bg">
                            <h1>{data && data.how_it_works_section_1_title}</h1>
                            <p>{data && data.how_it_works_section_1_description}</p>
                        </Col>
                        <Col md="4">
                        <img alt='' src={howItWorkOne} className="image-dashboard" />

                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="section-2">
                <Container>
                    <Row className="align-items-center">
                        <Col md="6" className="mobile-order left-section">
                            <img src={howItWorkTwo} className="w-100" alt=''/>
                            <img src={howItWorkThree} className="postion-img" alt=''/>
                        </Col>
                        <Col md="6">
                            <Row>
                                <Col sm={{size: 11, offset: 1}} md={{size: 10, offset: 2}} lg={{size: 9, offset: 3}}   className="right-text">
                                    <p>{data && data.how_it_works_section_2_bullet_1_title}</p>
                                    <p>{data && data.how_it_works_section_2_bullet_1_description}</p>
                                    <ul className="list">
                                        <li><img alt=''src={genre} /> {data && data.how_it_works_section_2_bullet_2_title}</li>
                                        <li><img alt=''src={rocket} /> {data && data.how_it_works_section_2_bullet_3_title}</li>
                                        <li><img alt=''src={location} /> <span>{data && data.how_it_works_section_2_bullet_4_title} - <span>you can even filter by future trips to book in sessions based on your upcoming travel plans (cool, right?). </span></span></li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="m-150 align-items-center">
                        <Col md="6">
                            <Row>
                                <Col sm="11" md="10" lg="9" className="right-text">
                                    <p className="p-1">{data && data.how_it_works_section_3_title}</p>
                                    <p>{data && data.how_it_works_section_3_description}</p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="6">
                            <img alt=''src={howItWorkFour} className="w-100" />
                            <img alt=''src={howItWorkFive} className="postion-img2" />
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
        howItWorkDataNew: state.howitwork.data
    }
}

const mapDispatchToProps =  {
    howItWorkData 
}
export default connect(mapStateToProps, mapDispatchToProps )(HowItWork);