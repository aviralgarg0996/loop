import React, {useState} from 'react';
import './Genre.scss';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import ListCard from '../../common/list_card/ListCard'; 
import { genreView, discoverGenreData} from '../../../../redux/discovery/action'
import { connect } from 'react-redux';
import { genreList } from '../../../../redux/master-data/action';
import {History} from "history";
import {getProfileById, playTrack } from '../../../../redux/user/action'; 
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash';

interface IProps{
    genreView: (genre_id?: string)=> Promise<any>
    genreList: ()=> Promise<any>
    genreViewArr: any[]
    genreArr: any[]
    history: History
    playTrack: (data: any, isPaused: boolean) => Promise<any>,
    playingTrack: any;
    getProfileById: (id: string) => Promise<any>,
    discoverGenreData: any,
    genreData: any
 }

interface IState{
  activeTab: number
}

class Genre extends React.Component<IProps, IState> {

    readonly state : IState = {activeTab: 0}

    constructor(props: any){
        super(props);
    }

    componentWillMount(){
      this.props.genreList();
      this.props.discoverGenreData();
      this.props.genreArr && this.props.genreArr[this.state.activeTab] && this.props.genreView(this.props.genreArr[this.state.activeTab].expertise_id)
    }

    toggle = (activeTab: number, genre_id: string) => {
      this.setState({activeTab})
      this.props.genreView(genre_id);
    }
    componentDidUpdate(prevProps: IProps){
      if( prevProps.genreArr != this.props.genreArr ){
        this.props.genreView(this.props.genreArr[this.state.activeTab].expertise_id)
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
      const titlesData = this.props && this.props.genreData;
      const title = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'title')
      const description = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'description')
      
      
      const { activeTab } = this.state;
      const { genreViewArr, genreArr } = this.props;
      return (
        <div className="genre">
          <ToastContainer />
            <div className="top-head">
                <h1>{title && title.text}</h1>
                <p className="f-p">{description && description.text}</p>
            </div>
            <div  className="dashboardTab">
            <Nav tabs>
              {
                genreArr && genreArr.map((item, index) => (
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === index })}
                      onClick={() => { this.toggle(index, item.genre_id); }}>
                        {item.name}
                    </NavLink>
                  </NavItem>
                ))
              }
            </Nav>
              {/* <TabContent activeTab={activeTab}>
                <TabPane tabId={1}> */}
            <Row>
                {
                  genreViewArr && genreViewArr.map((item, index) => (
                    <Col>
                    <ListCard history={this.props.history}  data={item} onClick={ this.trackClicked } />
                    </Col>
                  ))
                } 
            </Row>
                {/* </TabPane> */}
                {/* <TabPane tabId={2}>
                <Row>
                        <Col className="first-row-col">
                            <ListCard />
                        </Col>
                      
                    </Row>
                </TabPane> */}
              {/* </TabContent> */}
            </div>
            
            
        </div>
    )
    }

    
}

const mapStateToProps = ( state: any ) => {
  return { 
    genreViewArr: state.discovery.genreView,
    genreArr: state.masterData.genreList,
    playingTrack: state.user.playingTrack,
    genreData: state.discovery.genData,

  }
}

const mapDispatchToProps =  {
  genreView, 
  genreList, playTrack, 
  getProfileById,
  discoverGenreData
}

export default connect(mapStateToProps, mapDispatchToProps )(Genre);

