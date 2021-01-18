import React, {useState} from 'react';
import './Expertise.scss'
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import 'react-multi-carousel/lib/styles.css'; 
import ListCard from '../../common/list_card/ListCard';
import { getExpertiseView, discoverExpertiseData } from '../../../../redux/discovery/action'
import { connect } from 'react-redux';
import { expertiseList } from '../../../../redux/master-data/action';
import {History} from 'history'
import { getProfileById, playTrack } from '../../../../redux/user/action';  
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash';

class Expertise extends React.Component<IProps, IState> {

    readonly state : IState = {activeTab: 0}

    constructor(props: any){
        super(props);
    }

    componentWillMount(){
      this.props.expertiseList(); 
      this.props.discoverExpertiseData();
      this.props.expertiseArr && this.props.expertiseArr[this.state.activeTab] && this.props.getExpertiseView(this.props.expertiseArr[this.state.activeTab].expertise_id);
    }

    toggle = (activeTab: number, expertise_id: string) => {
      this.setState({activeTab});
      this.props.getExpertiseView(expertise_id);
    }

    componentDidUpdate(prevProps: IProps){
      if( prevProps.expertiseArr != this.props.expertiseArr ){
        this.props.getExpertiseView(this.props.expertiseArr[this.state.activeTab].expertise_id)
      }
    }


  trackClicked = (item: any) => {
    const { playingTrack } = this.props;
    this.props.getProfileById(item.user_id).then((res: any) => {
      let demoTrack = (res.data.demo_track || []).find((item: any) => item.primary === 1);
      if(demoTrack){
          demoTrack.first_name = res.data.first_name;
          demoTrack.last_name = res.data.last_name;
          let isPaused  = false;
          if(playingTrack){
              isPaused =  playingTrack.track_id != demoTrack.track_id ? false : !playingTrack.isPaused ;
          }
          this.props.playTrack(demoTrack, isPaused)
      }else{
          toast.error("Demo track not found")
      }
    });
  }

  render(){
    console.log('data exp', this.props);
    
    const titlesData = this.props && this.props.expertiseData;
    const title = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'title')
    const description = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'description')
    
    const { activeTab } = this.state;
    const { expertiseViewArr, expertiseArr } = this.props;
    return (
        <div className="expertise">
          <ToastContainer />
            <div className="top-head">
                <h1>{title && title.text}</h1>
                <p className="f-p">{description && description.text}</p>
            </div>
            <div  className="dashboardTab">
            <Nav tabs>
            {
              expertiseArr && expertiseArr.map((item, index) => (
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === index })}
                    onClick={() => {
                      this.toggle(index, item.expertise_id); }}>
                      {item.name}
                  </NavLink>
                </NavItem>
              ))
            }
            </Nav>
      
            <Row>
              {
                expertiseViewArr && expertiseViewArr.map((item, index) => (
                  <Col>
                    <ListCard history={this.props.history} data={item}  onClick={ this.trackClicked }/>
                  </Col>
                ))
              } 
            </Row>
        
            </div>
            
            
        </div>
    )
  }
}


interface IProps{
  getExpertiseView: (expertise_id?: string)=> Promise<any>
  expertiseList: ()=> Promise<any>
  expertiseViewArr: any[]
  expertiseArr: any[]
  history: History
  playTrack: (data: any, isPaused: boolean) => Promise<any>,
  playingTrack: any;
  getProfileById: (id: string) => Promise<any>,
  discoverExpertiseData: any,
  expertiseData: any
}

interface IState{
  activeTab: number
}

const mapStateToProps = ( state: any ) => {
  return { 
    expertiseViewArr: state.discovery.expertiseView,
    expertiseArr: state.masterData.expertiseList,
    playingTrack: state.user.playingTrack,
    expertiseData: state.discovery.expData
  }
}

const mapDispatchToProps =  {
  getExpertiseView, 
  expertiseList, playTrack, getProfileById,
  discoverExpertiseData
}

export default connect(mapStateToProps, mapDispatchToProps )(Expertise);

