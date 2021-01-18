import React from 'react';
import './ViewProfile.scss';
import audioProfile1 from '../../../../assets/images/view-my-profile.png'
import { Row, Col, Button, Card } from 'reactstrap';
import audioProfile from '../../../../assets/images/audioProfile.png';
import FooterDashboard from '../../common/footer_dahboard/FooterDashboard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfile, playTrack } from '../../../../redux/user/action';
import moment from 'moment';

class ViewUserProfile extends React.Component<IProps, IState> {
    
    readonly state: IState = { playingTrack: {}};

    constructor(props: any){
        super(props);
    }
    
    componentWillMount(){
        this.props.getProfile && this.props.getProfile();
    }

    componentDidUpdate(prevProps: IProps){
        if(prevProps.playingTrack != this.props.playingTrack){
            const playingTrack = this.props.playingTrack && this.props.playingTrack;
            this.setState({playingTrack})
        }
    }

    trackClicked = (item: any) => {
        const { playingTrack, userDetail } = this.props;
        console.log("#playingTrack", playingTrack);
        let isPaused  = false;
        if(playingTrack){
            isPaused =  playingTrack.track_id != item.track_id ? false : !playingTrack.isPaused ;
        }
        item.first_name = userDetail.first_name;
        item.last_name = userDetail.last_name;
        this.props.playTrack(item, isPaused)
    }

    
    getTime = (timeInSec: number) => {
        let duration = moment.duration(timeInSec, "seconds");
        let time = "";
        let hours = duration.hours();
        if (hours > 0) { time = hours + ":" ; }
        time = time + duration.minutes() + ":" + duration.seconds();
        return time;
    }

    getSocialMediaIcons = () => {
        let { userDetail } = this.props;
        return ( 
            <> 
            {
                userDetail && userDetail.social_link && userDetail.social_link.map((item : any) => {
                    let jsx = <a target="_blank"  href=""><i className="icon" /></a>
                    if(item.includes("spotify.com")){ 
                        jsx = <a target="_blank"  href={item}><i className="icon icon-spotify" /></a>
                    }else if(item.includes("soundcloud.com")){ 
                        jsx = <a target="_blank"  href={item}><i className="icon icon-soundcloud" /></a>
                    }else if(item.includes("youtube.com")){ 
                        jsx = <a  target="_blank" href={item}><i className="icon icon-youtube" /></a>
                    }else if(item.includes("instagram.com")){ 
                        jsx = <a target="_blank"  href={item}><i className="icon icon-instagram" /></a>
                    }
                    return jsx;
                })
            }
                
            </>
         )
    }

    render() {
        console.log("props", this.props.userDetail);
        const { userDetail = {} } = this.props;
        const {playingTrack} = this.state;
        const primaryTrack =  userDetail.demo_track && userDetail.demo_track.find((item: any) => item.primary == '1');

        return(
            <div className="view-profile-page">
                <div className="view-profile">
                    <div className="view-profile-head" style={{backgroundImage: 'url(' + userDetail.photo + ')'}}>
                            {/* <img src={audioProfile1} alt="profile" className="w-100 "/> */}
                            <div className="profile-section">
                            <Row>
                                <Col md="8">
                                    <p className="status">{ userDetail.online == '1' ? 'ONLINE' : 'OFFLINE'}</p>
                                    <h2>{`${userDetail.first_name || ""} ${userDetail.last_name || ""}`}</h2>
                                    <p>{ userDetail.expertise && userDetail.expertise.map((item : any) => item && item.name).join(' | ')  }</p>
                                </Col>
                                <Col md="4" className="text-right">
                                    <div className="social-icon">
                                        {this.getSocialMediaIcons()}
                                    </div>
                                </Col>
                            </Row>
                            
                            
                        </div>
                        
                    </div>
                    <Row className="bottom-section">
                        <Col  lg="12" xl="7">
                            <div className="left-col">
                                
                                <div className="remove-network">
                                    <Link to="/hub/edit-profile">
                                    <Button className="border-gradiant-btn edit-profile-btn" >
                                        <div className="inner-module">
                                            <span>
                                            <i className="icon icon-edit "></i>  Edit Profile
                                            </span>
                                        
                                        </div>
                                        
                                    </Button>
                                    </Link>
                                
                                </div> 
                                
                                <div className="d-flex justify-content-between breadcrum">
                                    <div className="d-flex align-items-center">
                                        <i className="icon icon-map-marked-alt"></i> {userDetail.location && userDetail.location.location }
                                    </div>
                                    <div className="d-flex align-items-center">
                                        { userDetail.trip && userDetail.trip.length > 0 && <i className="icon icon-plane-departure"></i> }
                                        {
                                            userDetail.trip && userDetail.trip.map((city: any, index: number) => (
                                                <>
                                                    <div className="d-flex">
                                                    {city.trip} 
                                                    { index < userDetail.trip.length -1  && <i className="icon icon-long-right-arrow"></i>}
                                                    {/* <i className="icon icon-long-right-arrow"></i> */}
                                                    {/* Tokyo */}
                                                    </div>
                                                </>
                                            )) || <></>
                                        } 
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h3>Genre:</h3>
                                      <p>
                                        {
                                            userDetail.genre && userDetail.genre.map((item: any, index: number) => (
                                                <>
         
                                                    {item.name} 
                                                    { index < userDetail.genre.length -1  && ', '}
                                                        
                                                </>
                                            )) || <></>
                                        } 
                                    </p>
                                </div>
                                
                                <div className="mt-3">
                                    <h3>Description:</h3>
                                      <p>{userDetail.description}</p>
                                    <h3>Credits:</h3>
                                    <p>{ userDetail.credits }</p>
                                </div>
                            </div>
                        </Col>
                        <Col  lg="12" xl="5">
                            <div className="right-col">
                                {  primaryTrack && 
                                    <>
                                        <div className="primary-demo">
                                            <img src={primaryTrack.cover_image || audioProfile} alt="" className="w-100" />
                                            <p><i className="icon icon-star"></i> Primary Demo</p>
                                        </div> 
                                        <Card className="audioCard" onClick={() => this.trackClicked(primaryTrack)}> 
                                            <div>
                                                <div className="d-flex">
                                                    <img src={primaryTrack.cover_image || audioProfile} alt=""  />
                                                    <div  className="ml-3">
                                                        <h1>{primaryTrack.name}</h1>
                                                        <p>{`${userDetail.first_name} ${userDetail.last_name}`}</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="d-flex">
                                                <p className="time">{this.getTime(primaryTrack.duration)}</p>
                                                <i className={ playingTrack.track_id == primaryTrack.track_id && !playingTrack.isPaused ? "icon icon-pause" : "icon icon-next"}></i>
                                            </div>
                                        </Card> 
                                    </>
                                }
                                {
                                    userDetail.demo_track && userDetail.demo_track.filter((item: any) => item.primary == '0').map((track: any) => (
                                        <Card className="audioCard"  onClick={() => this.trackClicked(track)}> 
                                            <div>
                                                <div className="d-flex">
                                                    <img src={track.cover_image || audioProfile} alt=""  />
                                                    <div  className="ml-3">
                                                        <h1>{track.name}</h1>
                                                        <p>{`${userDetail.first_name} ${userDetail.last_name}`}</p>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="d-flex">
                                                <p className="time">{this.getTime(track.duration)}</p>
                                                <i className={ playingTrack.track_id == track.track_id && !playingTrack.isPaused ? "icon icon-pause" : "icon icon-next"}></i>
                                            </div>
                                        </Card>
                                    ))
                                }
                                {/*  icon-pause icon-next */}
                              </div>
                        </Col>
                    </Row>
                </div>
                <FooterDashboard />
            </div>
        )
    }
}

interface IState {
    playingTrack: any
}

interface IProps {
    getProfile?: () => void,
    userDetail?: any;
    playingTrack: any;
    playTrack: (data: any, isPaused: boolean) => Promise<any>,
}

const mapDispatchToProps = {
    getProfile, 
    playTrack
}

const mapStateToProps = ( state: any ) => {
    return {  
        userDetail: state.user.profile,
        playingTrack: state.user.playingTrack,
    }
} 

 
export default connect(mapStateToProps, mapDispatchToProps)(ViewUserProfile);