import React from 'react';
import './Trending.scss'
import { Row, Col } from 'reactstrap';
import 'react-multi-carousel/lib/styles.css';
// import audioProfile1 from '../../../assets/images/audio1.png'
// import audioProfile2 from '../../../assets/images/audio2.png'
// import audioProfile3 from '../../../assets/images/audio3.png'
// import audioProfile4 from '../../../assets/images/audio4.png'
// import audioProfile5 from '../../../assets/images/audio5.png'
import ListCard from '../../common/list_card/ListCard';
import { connect } from 'react-redux';
import { trending, discoverTrendingData } from '../../../../redux/discovery/action'
import {History} from 'history';
import { getProfileById, playTrack } from '../../../../redux/user/action'; 
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash';

class Trending extends React.Component<IProps, IState> {
        
    constructor(props: any){
        super(props);
    }

    componentWillMount(){ 
        this.props.trending();
        this.props.discoverTrendingData();
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
        const titlesData = this.props && this.props.trendingDataTitle;
        const title = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'title')
        const description = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'description')
        
        let { trendingArr } = this.props;
        return (
            <div className="trending">
                <ToastContainer />
                <div className="top-head">
                    <h1>{title && title.text}</h1>
                    <p className="f-p">{description && description.text}</p>
                </div>
                
                <Row>
                    {
                        trendingArr && trendingArr.map((item, index) => (
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
    trending: ()=> Promise<any> 
    trendingArr: any[], 
    history: History
    playTrack: (data: any, isPaused: boolean) => Promise<any>,
    playingTrack: any;
    getProfileById: (id: string) => Promise<any>,
    discoverTrendingData: any,
    trendingDataTitle: any,
}

interface IState{

}

const mapStateToProps = ( state: any ) => {
    return { 
        trendingArr: state.discovery.trending, 
        trendingDataTitle: state.discovery.trendData, 
        playingTrack: state.user.playingTrack,
    }
}

const mapDispatchToProps =  {
    trending, playTrack, discoverTrendingData,
    getProfileById 
}

export default  connect(mapStateToProps, mapDispatchToProps )(Trending);
