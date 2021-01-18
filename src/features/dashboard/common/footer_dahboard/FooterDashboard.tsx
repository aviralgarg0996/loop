import React from 'react';
import { Row, Col } from 'reactstrap';
import './FooterDashboard.scss'
import 'react-multi-carousel/lib/styles.css';
import AudioPlayer from 'react-h5-audio-player';
import playProfile from '../../../../assets/images/playPImage.png'
import 'react-h5-audio-player/lib/styles.css';
import { connect } from 'react-redux';
import { playTrack } from '../../../../redux/user/action';

class FooterDashboard extends React.Component<IProps,{}> {
    private myRef: React.RefObject<AudioPlayer>;
    constructor(props: any){
        super(props)
        this.myRef = React.createRef();
    }

    updateTrack = (isPaused: boolean) => {
        let {playingTrack} = this.props;
        this.props.playTrack(playingTrack, isPaused);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if ( this.props.playingTrack !== undefined && nextProps.playingTrack.isPaused !== undefined && this.props.playingTrack.isPaused !== nextProps.playingTrack.isPaused) {
            if (nextProps.playingTrack.isPaused) {
                this.myRef.current && this.myRef.current.audio.current && this.myRef.current.audio.current.pause();
            } else {
                this.myRef.current && this.myRef.current.audio.current && this.myRef.current.audio.current.play();
            }
        }
    }

    render() {
        const {playingTrack, userDetail, } = this.props  ;
        return(
            playingTrack ? (<div className="footerInner">
                    <Row className="m-0">
                    <Col md="10" lg="3" className="pl-0">
                        <div className="footer-song-profile">
                            <img src={playingTrack.cover_image || playProfile} />
                            <div>
                                <h1>{playingTrack.name}</h1>
                                <p>{`${playingTrack.first_name || ''} ${playingTrack.last_name || ''}`}</p>
                            </div>
                        </div>
                    </Col>
                    <Col md="2" lg="9">
                        <div className="position-relative">
                            <AudioPlayer
                                src={playingTrack.filename}
                                autoPlay={!playingTrack.isPaused}
                                autoPlayAfterSrcChange={true}
                                onPlay={e => this.updateTrack(false)}
                                onPause={e=> this.updateTrack(true)}
                                ref={this.myRef}
                            /> 
                            <i className="icon icon-random random-btn"></i>
                        </div>
                    </Col>
                    </Row>
                </div> ) : <></>
            )
    } 
}

interface IProps {
    userDetail: any;
    playingTrack: any;
    playTrack: (data: any, isPaused: boolean) => Promise<any>,
}

const mapDispatchToProps = {
    playTrack,
}

const mapStateToProps = ( state: any ) => {
    return {   
        playingTrack: state.user.playingTrack,
        userDetail: state.user.profile,
    }
} 

 export default connect(mapStateToProps, mapDispatchToProps)(FooterDashboard);