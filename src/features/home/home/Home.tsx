import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import './Home.scss'
import play from '../../../assets/images/icons/play.svg'
import rocketLaunch from '../../../assets/images/icons/rocket-launch.svg'
import ContactFooter from '../../../layouts/contact_footer/ContactFooter';
import { homeData } from '../../../redux/home/action'
import { connect } from 'react-redux';
import * as Scroll from 'react-scroll';
var scroll    = Scroll.animateScroll;

interface IProps {
    homeData: any,
    homeTitleData: any
}
class HomePage extends React.Component<IProps> {
    
      constructor(props: any) {
        super(props);
      }

      componentWillMount() {
        this.props.homeData();
      }
      
render() {
    // const {
    //     homeTitleData = [],
    //   } = this.state;
      
      const data = this.props && this.props.homeTitleData[0];

    return (
        <div className="home-page">
            <div className="signin section-1">
                <Container>
                    <Row>
                        <Col md="5">
                            <h1>{data && data.home_section_1_title_1}</h1>
                            <h1><img alt=''src={play} />{data && data.home_section_1_title_2}</h1>
                            <h1>{data && data.home_section_1_title_3}</h1>
                            <Button 
                            onClick={()=>scroll.scrollToBottom()}
                            className="button-btnGradiant be-the-first-btn mt-5">Try The Beta</Button>
                        </Col>
                    </Row>
                    <div className="overlay-gradiant">

                    </div>
                </Container>
            </div>
            <div className="section-2 section-2-bg">
                <Container>
                <Row className="m-0 about-row">
                    <Col sm="11" md="7" lg="6">
                        <h1 className="heading">{data && data.home_section_2_title}</h1>
                         
                         <div dangerouslySetInnerHTML={ {__html: data && data.home_section_2_description} }></div>
                        <div className="bottom-text">
                            <img src={rocketLaunch} alt=''/>
                            ... {data && data.home_section_2_notes}
                        </div>
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
        homeTitleData: state.home.data,
    }
}

const mapDispatchToProps =  {
    homeData 
}
export default connect(mapStateToProps, mapDispatchToProps )(HomePage);
