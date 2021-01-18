import React from 'react';
import './FeelingRandom.scss';
import { Row, Col, Button } from 'reactstrap';
// import classnames from 'classnames';
// import ListCard from '../common/list_card/ListCard';
import globeBg from "../../../assets/images/random-bg.svg"
import globeBg2 from "../../../assets/images/random-bg-mobile.svg"
import pointer from "../../../assets/images/pointer.png"
import profile1 from "../../../assets/images/audio1.png"
import profile2 from "../../../assets/images/audio2.png"
import profile3 from "../../../assets/images/audio3.png"
import profile4 from "../../../assets/images/audio4.png"
import profile5 from "../../../assets/images/audio5.png"
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { random } from '../../../redux/discovery/action'
import {History} from 'history';

class FeelingRandom extends React.Component<IProps, IState > {
  readonly state: IState = {randomObj:{}}
  constructor(props: any){
    super(props);
  }

  componentWillMount(){
    this.props.random();
    this.genrateData();
  }

  componentDidUpdate(prevPops: IProps){
    if(prevPops.randomList != this.props.randomList){
      this.genrateData();
    }
  }

  genrateData = () => {
    let {randomList} = this.props;
    let randomObj: any = {};
    randomList && randomList.forEach((item: any, index: number) => {
      randomObj[index] = item;
    })
    this.setState({randomObj})
  }

  getName = (data : any) => `${data.first_name || ""} ${data.last_name || ""}`
  getExpertise = (data : any) => (data && data.expertise && data.expertise.map((item: any) => item && item.name) || []).join(' | ')

  viewProfile = (data: any) => {
    this.props.history.push(`/discovery/view-profile/${data.user_id}`)
 }
  render(){
    let {randomObj} = this.state;

    return (
        <div className="feeling-random">
          <Row className="justify-content-center m-0 top-section">
            <Col md="6" className="text-center"> 
              <h1>Feeling Random</h1>
              <p>Feeling a bit stuck? Press the button below and we’ll generate a LOOP member you’ve never collaborated with before. Let’s get those spontaneous juices flowing…</p>
              <Button className="button-btnGradiant" onClick={()=> this.props.random()} ><i className="icon icon-hand-point-up"></i> Click on Me</Button>
            </Col>
          </Row>
          <div className="bottom-section">
            {randomObj[0] && <div className="pointer pointer1"> 
                <div className="profile-img">
                  <div className="p-relative">
                    <div onClick={() => this.viewProfile(randomObj[0])}><img src={randomObj[0].photo || profile1} /></div>
                    <img src={pointer} className="pointer-icon"/>
                  </div>
                </div> 
              <div className="hover-text">
                  <p>{this.getName(randomObj[0])}</p>
                  <p>{this.getExpertise(randomObj[0])}</p>
                </div>
            </div>}
            {randomObj[1] && <div className="pointer pointer2"> 
                <div className="profile-img">
                  <div className="p-relative">
                    <div onClick={() => this.viewProfile(randomObj[1])}><img src={randomObj[1].photo || profile2} /></div>
                    <img src={pointer} className="pointer-icon"/>
                  </div>
                </div> 
              <div className="hover-text">
                  <p>{this.getName(randomObj[1])}</p>
                  <p>{this.getExpertise(randomObj[1])}</p>
                </div>
            </div>}
            {randomObj[2] && <div className="pointer pointer3"> 
                <div className="profile-img">
                  <div className="p-relative">
                    <div onClick={() => this.viewProfile(randomObj[2])}><img src={randomObj[2].photo || profile3} /></div>
                    <img src={pointer} className="pointer-icon"/>
                  </div>
                </div> 
              <div className="hover-text">
                  <p>{this.getName(randomObj[2])}</p>
                  <p>{this.getExpertise(randomObj[2])}</p>
                </div>
            </div>}
            {randomObj[3] && <div className="pointer pointer3"> 
                <div className="profile-img">
                  <div className="p-relative">
                    <div onClick={() => this.viewProfile(randomObj[3])}><img src={randomObj[3].photo || profile3} /></div>
                    <img src={pointer} className="pointer-icon"/>
                  </div>
                </div> 
              <div className="hover-text">
                  <p>{this.getName(randomObj[3])}</p>
                  <p>{this.getExpertise(randomObj[3])}</p>
                </div>
            </div>}
            {randomObj[4] && <div className="pointer pointer4"> 
                <div className="profile-img">
                  <div className="p-relative">
                    <div onClick={() => this.viewProfile(randomObj[4])}><img src={randomObj[4].photo || profile4} /></div>
                    <img src={pointer} className="pointer-icon"/>
                  </div>
                </div> 
              <div className="hover-text">
                  <p>{this.getName(randomObj[4])}</p>
                  <p>{this.getExpertise(randomObj[4])}</p>
                </div>
            </div>}
            {randomObj[5] && <div className="pointer pointer5"> 
                <div className="profile-img">
                  <div className="p-relative">
                    <div onClick={() => this.viewProfile(randomObj[5])}><img src={randomObj[5].photo || profile5} /></div>
                    <img src={pointer} className="pointer-icon"/>
                  </div>
                </div> 
              <div className="hover-text">
                  <p>{this.getName(randomObj[5])}</p>
                  <p>{this.getExpertise(randomObj[5])}</p>
              </div>
            </div>}
            {randomObj[6] && <div className="small-pointer small-pointer1">
              <img src={randomObj[6].photo || profile5} onClick={() => this.viewProfile(randomObj[6])} />
            </div>
            }
            {randomObj[7] && <div className="small-pointer small-pointer2">
              <img src={randomObj[7].photo || profile5} onClick={() => this.viewProfile(randomObj[7])} />
            </div>}
            {randomObj[8] && <div className="small-pointer small-pointer3">
              <img src={randomObj[8].photo || profile5} onClick={() => this.viewProfile(randomObj[8])} />
            </div>}
            {randomObj[9] && <div className="small-pointer small-pointer4">
              <img src={randomObj[9].photo || profile5} onClick={() => this.viewProfile(randomObj[9])} />
            </div>}
            {randomObj[10] && <div className="small-pointer small-pointer5">
              <img src={randomObj[10].photo || profile5} onClick={() => this.viewProfile(randomObj[10])} />
            </div>}
            <img src={globeBg} className="w-100 globedesktop" />
            <img src={globeBg2} className="w-100 globemobile" />
          </div>
        </div>
    )
  }
}

interface IProps {
  random: ()=> Promise<any>;
  randomList: any[];
  history: History
}

interface IState {
  randomObj: any;
}

const mapStateToProps = (state: any) => {
  return {
    randomList: state.discovery.random || [], 
  }
}

const mapDispatchToProps = { 
  random
}

export default connect(mapStateToProps, mapDispatchToProps)(FeelingRandom);