import React from 'react';
import './RecentlyJoined.scss'
import { Row, Col } from 'reactstrap';
import 'react-multi-carousel/lib/styles.css';
import ListCard from '../../common/list_card/ListCard';
import { connect } from 'react-redux';
import { recentlyJoined, discoverRecentlyData } from '../../../../redux/discovery/action'
import {History} from "history";
import {  getProfileById, playTrack } from '../../../../redux/user/action'; 
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash';

class RecentlyJoined extends React.Component<IProps, IState> {
        
    constructor(props: any){
        super(props);
    }

    componentWillMount(){ 
        this.props.recentlyJoined();
        this.props.discoverRecentlyData();
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
    
        render() {
                
        const titlesData = this.props && this.props.recentDataTitle;
        const title = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'title')
        const description = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'description')
        let { recentJoinedArr } = this.props;

            return (
                <div className="recently">
                    <ToastContainer />
                    <div className="top-head">
                        <div>
                        <h1>{title && title.text}</h1>
                        <p className="f-p">{description && description.text}</p>
                        </div>  
                    </div>
                    <Row>
                        {
                            recentJoinedArr && recentJoinedArr.map((item, index) => (
                                <Col>
                                <ListCard history={this.props.history}  data={item} onClick={ this.trackClicked } />
                                
                                </Col>
                            ))
                        } 
                    </Row>
                </div>
            )
        }
}


interface IProps{
    getProfileById: (id: string) => Promise<any>,
    recentlyJoined: ()=> Promise<any> 
    recentJoinedArr: any[], 
    history: History
    playTrack: (data: any, isPaused: boolean) => Promise<any>,
    playingTrack: any;
    discoverRecentlyData: any,
    recentDataTitle: any
}

interface IState{

}

const mapStateToProps = ( state: any ) => {
    return { 
        recentJoinedArr: state.discovery.recentJoined, 
        playingTrack: state.user.playingTrack,
        recentDataTitle: state.discovery.recentData
    }
}

const mapDispatchToProps =  {
   recentlyJoined, playTrack, discoverRecentlyData,
   getProfileById,
}

export default  connect(mapStateToProps, mapDispatchToProps )(RecentlyJoined);

