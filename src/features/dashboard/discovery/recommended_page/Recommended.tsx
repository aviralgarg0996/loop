import React from 'react';
import './Recommended.scss'
import { Row, Col } from 'reactstrap';
import 'react-multi-carousel/lib/styles.css'; 
import ListCard from '../../common/list_card/ListCard';
import { recommended, discoverRecommendedData} from '../../../../redux/discovery/action'
import { connect } from 'react-redux';
import { History} from 'history'
import { getProfileById, playTrack } from '../../../../redux/user/action'; 
import { toast, ToastContainer } from 'react-toastify';
import _ from 'lodash';

interface IProps{
    recommended: ()=> Promise<any>
    recommendedArr: any[],
    history: History
    playTrack: (data: any, isPaused: boolean) => Promise<any>,
    playingTrack: any;
    getProfileById: (id: string) => Promise<any>,
    discoverRecommendedData: any,
    recommendedData: any
 }

interface IState{

}

class Recommended extends React.Component<IProps, IState> {

    constructor(props: any){
        super(props);
    }

    componentWillMount(){
        this.props.recommended();
        this.props.discoverRecommendedData();
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
        const titlesData = this.props && this.props.recommendedData;
        const title = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'title')
        const description = !_.isEmpty(titlesData) && _.toArray(titlesData).find(element => element.place === 'description')
        let {recommendedArr } = this.props
        return (
            <div className="recommended">
                <ToastContainer />
                <div className="top-head">
                    <h1>{title && title.text}</h1>
                    <p className="f-p">{description && description.text}</p>
                </div>
                <Row>
                    {/* <Col className="first-row-col">
                        <ListCard />
                    </Col> */}
                    
                    {recommendedArr && recommendedArr.map((user) => (
                        <Col>
                                        <ListCard history={this.props.history}  data={user} onClick={ this.trackClicked } />
                        
                        </Col>
                                    )) }
                </Row>
            </div>
        )
    }
    
}
const mapStateToProps = ( state: any ) => {
    return { 
        recommendedArr: state.discovery.recommended,
        playingTrack: state.user.playingTrack,
        recommendedData: state.discovery.recData,
    }
}

const mapDispatchToProps =  {
    recommended, playTrack, 
    getProfileById,
    discoverRecommendedData
}

export default connect(mapStateToProps, mapDispatchToProps )(Recommended);

