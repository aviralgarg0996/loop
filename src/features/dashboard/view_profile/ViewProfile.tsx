import React, { useState } from 'react';
import './ViewProfile.scss';
import audioProfile1 from '../../../assets/images/view-profile.png';
import {
  Row,
  Col,
  Button,
  Card,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import FooterDashboard from '../common/footer_dahboard/FooterDashboard';
import audioProfile from '../../../assets/images/audioProfile.png';
import emma from '../../../assets/images/emma.png';
import { connect } from 'react-redux';
import { getProfileById, playTrack } from '../../../redux/user/action';
import {
  addNetwork,
  removeNetwork,
	acceptRequest,
	cancelRequest,
  rejectRequest,
} from '../../../redux/network/action';
import { History } from 'history';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { createConversation } from "../../../redux/user/action";
import _ from 'lodash';

class ViewProfile extends React.Component<IProps, IState> {
  readonly state: IState = {
    playingTrack: {},
    modal: false,
    networkRemove: false,
    removeNetwork: false,
  };

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getProfileById(id);
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.playingTrack != this.props.playingTrack) {
      const playingTrack = this.props.playingTrack && this.props.playingTrack;
      this.setState({ playingTrack });
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal, networkRemove: true });
  };

  toggleRemoveNetwork = () => {
    this.setState({
      removeNetwork: !this.state.removeNetwork,
      networkRemove: false,
    });
  };

  addToNetwork = () => {
    this.props.addNetwork(this.props.userDetail && this.props.userDetail.user_id).then((data: any) => {
      const { id } = this.props.match.params;
      this.props.getProfileById(id);
      this.toggle();
    });
  };

  removeFromNetwork = () => {
    this.props
      .removeNetwork(this.props.userDetail && this.props.userDetail.user_id)
      .then((data: any) => {
        const { id } = this.props.match.params;
        this.props.getProfileById(id);
        this.toggleRemoveNetwork();
      });
  };

  acceptRequest = async (userId: any) => {
    const reponse = await this.props.acceptRequest(userId);
    if (reponse && reponse.data && reponse.data.success) {
      toast.success(reponse.data.message);
      const { id } = this.props.match.params;
      this.props.getProfileById(id);
    } else {
      toast.error('Something went wrong');
    }
	};
	
	cancelRequest = async (userId: any) => {
    const reponse = await this.props.cancelRequest(userId);
    if (reponse && reponse.data && reponse.data.success) {
      toast.success(reponse.data.message);
      const { id } = this.props.match.params;
      this.props.getProfileById(id);
    } else {
      toast.error('Something went wrong');
    }
	};

  rejectRequest = async (userId: any) => {
    const reponse = await this.props.rejectRequest(userId);
    if (reponse && reponse.data && reponse.data.success) {
      toast.success(reponse.data.message);
      const { id } = this.props.match.params;
      this.props.getProfileById(id);
    } else {
      toast.error('Something went wrong');
    }
  };

  backToDiscover = () => {
    this.props.history.push('/discover');
  };

  trackClicked = (item: any) => {
    const { playingTrack, userDetail } = this.props;
    let isPaused = false;
    if (playingTrack) {
      isPaused =
        playingTrack.track_id != item.track_id ? false : !playingTrack.isPaused;
    }
    item.first_name = userDetail.first_name;
    item.last_name = userDetail.last_name;
    this.props.playTrack(item, isPaused);
  };

  isPlaying = (id: string) => {
    const { playingTrack } = this.props;
    let isPaused = false;
    if (playingTrack) {
      isPaused = playingTrack.track_id != id ? false : !playingTrack.isPaused;
    }
  };

  getTime = (timeInSec: number) => {
    let duration = moment.duration(timeInSec, 'seconds');
    let time = '';
    let hours = duration.hours();
    if (hours > 0) {
      time = hours + ':';
    }
    time = time + duration.minutes() + ':' + duration.seconds();
    return time;
  };

  getSocialMediaIcons = () => {
    let { userDetail } = this.props;
    return (
      <>
        {userDetail &&
          userDetail.social_link &&
          userDetail.social_link.map((item: any) => {
            let jsx = (
              <a href="">
                <i className="icon" />
              </a>
            );
            if (item.includes('www.spotify')) {
              jsx = (
                <a target="_blank" href={item}>
                  <i className="icon icon-spotify" />
                </a>
              );
            } else if (item.includes('www.soundcloud')) {
              jsx = (
                <a target="_blank" href={item}>
                  <i className="icon icon-soundcloud" />
                </a>
              );
            } else if (item.includes('www.youtube')) {
              jsx = (
                <a target="_blank" href={item}>
                  <i className="icon icon-youtube" />
                </a>
              );
            } else if (item.includes('www.instagram')) {
              jsx = (
                <a target="_blank" href={item}>
                  <i className="icon icon-instagram" />
                </a>
              );
            }
            return jsx;
          })}
      </>
    );
  };

  createNewConversation(usersId: any, title: any) {
    createConversation({
        type: 'direct',
        title: title,
        desc: '',
        usersId: usersId,
        isPublic: true,
        isUber: true,
        avatar: '',
      });
    }

  render() {
    const { modal, removeNetwork, playingTrack } = this.state;
    const { userDetail = {}, voxUser } = this.props;
    const primaryTrack =
      userDetail.demo_track &&
			userDetail.demo_track.find((item: any) => item.primary === 1);
		const userName = userDetail && userDetail.email && `${userDetail.email.replace('@', '-loop-')}@loop.cocoworth`;
		const userinfo = voxUser && voxUser.find((item: any)=> item.userName === userName);
   const statusUpdate = userinfo && userinfo.online ? (
                          <p className="status-custom online">Online</p>
                        ) : (
                          <p className="status-custom offline">
                            Offiline
                          </p>
                        )
    return (
      <div className="view-profile-page">
        <ToastContainer />
        <div className="view-profile">
          <div
            className="view-profile-head"
            style={{
              backgroundImage: `url(${userDetail.photo || audioProfile1})`,
            }}
          >
            {/* <img src={audioProfile1} alt="profile" className="w-100 "/> */}
            <div className="profile-section">
              <Row>
                <Col md="8">
                   {userDetail.connection_status === "friend" && statusUpdate}
                  <h2>{`${userDetail.first_name || ''} ${userDetail.last_name ||
                    ''}`}</h2>
                  <p>
                    {userDetail.expertise &&
                      userDetail.expertise
                        .map((item: any) => item && item.name)
                        .join(' | ')}
                  </p>
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
            <Col lg="12" xl="7">
              <div className="left-col">
                {userDetail.connected != 1 && (
                  <Button
                    className="button-btnGradiant add-network-btn"
                    onClick={this.addToNetwork}
                  >
                    <i className="icon icon-plus-circle " /> Add to Network
                  </Button>
                )}
                {userDetail.connection_status == 'friend' && (
                  <div className="remove-network">
                    <div className="text">
                      <p>
                        {`${userDetail.first_name ||
                          ''} ${userDetail.last_name || ''}`}{' '}
                        is already on your network.{' '}
                      </p>
                      <p>You can remove him/her from your network at any time.</p>
                    </div>

                    <Button
                      className="border-gradiant-btn"
                      onClick={this.removeFromNetwork}
                    >
                      <div className="inner-module">
                        <span>
                          <i className="icon icon-plus-circle " /> Remove from
                          Network
                        </span>
                      </div>
                    </Button>
                  </div>
                )}

								{userDetail.connection_status == 'send_request' && (
                  <div className="remove-network">
                    <div className="text">
                      <p>
                        You have send reuest to {`${userDetail.first_name ||
                          ''} ${userDetail.last_name || ''}`}{' '}.{' '}
                      </p>
                      <p>You can cancel your request at any time.</p>
                    </div>

                    <Button
                      className="border-gradiant-btn"
                      onClick={()=> this.cancelRequest(userDetail.user_id)}
                    >
                      <div className="inner-module">
                        <span>
                          <i className="icon icon-plus-circle " /> Cancel Request
                        </span>
                      </div>
                    </Button>
                  </div>
                )}

                {userDetail.connection_status == 'received_request' && (
                  <div className="remove-network">
                    <div className="text">
                      <p>
                        {`${userDetail.first_name ||
                          ''} ${userDetail.last_name || ''}`}{' '}
                        is send request to you.{' '}
                      </p>
                      <p>You can accept or reject request.</p>
                    </div>

                    <Button
                      className="border-gradiant-btn"
                      onClick={() => this.acceptRequest(userDetail.user_id)}
                    >
                      <div className="inner-module">
                        <span>
                          <i className="icon icon-plus-circle " /> Accept
                          Request
                        </span>
                      </div>
                    </Button>
                    <Button
                      className="border-gradiant-btn"
                      onClick={() => this.rejectRequest(userDetail.user_id)}
                    >
                      <div className="inner-module">
                        <span>
                          <i className="icon icon-plus-circle " /> Reject
                          Request
                        </span>
                      </div>
                    </Button>
                  </div>
                )}

                <div className="d-flex justify-content-between breadcrum">
                  <div className="d-flex align-items-center">
                    <i className="icon icon-map-marked-alt" />{' '}
                    {(userDetail.location && userDetail.location.location) ||
                      ''}
                  </div>
                  <div className="d-flex align-items-center">
                    {userDetail.trip && userDetail.trip.length > 0 && (
                      <i className="icon icon-plane-departure" />
                    )}
                    {(userDetail.trip &&
                      userDetail.trip.map((city: any, index: number) => (
                        <>
                          <div className="d-flex">
                            {city.trip}
                            {index < userDetail.trip.length - 1 && (
                              <i className="icon icon-long-right-arrow" />
                            )}
                            {/* <i className="icon icon-long-right-arrow"></i> */}
                            {/* Tokyo */}
                          </div>
                        </>
                      ))) || <></>}
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
                  <p>{userDetail.credits}</p>
                </div>
              </div>
            </Col>
            <Col lg="12" xl="5">
              <div className="right-col">
                {primaryTrack && (
                  <>
                    <div className="primary-demo">
                      <img
                        src={primaryTrack.cover_image || audioProfile}
                        alt=""
                        className="w-100"
                      />
                      <p>
                        <i className="icon icon-star" /> Primary Demo
                      </p>
                    </div>
                    <Card
                      className="audioCard"
                      onClick={() => this.trackClicked(primaryTrack)}
                    >
                      <div>
                        <div className="d-flex">
                          <img
                            src={primaryTrack.cover_image || audioProfile}
                            alt=""
                          />
                          <div className="ml-3">
                            <h1>{primaryTrack.name}</h1>
                            <p>{`${userDetail.first_name ||
                              ''} ${userDetail.last_name || ''}`}</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex">
                        <p className="time">
                          {this.getTime(primaryTrack.duration)}
                        </p>
                        <i
                          className={
                            playingTrack.track_id == primaryTrack.track_id &&
                            !playingTrack.isPaused
                              ? 'icon icon-pause'
                              : 'icon icon-next'
                          }
                        />
                      </div>
                    </Card>
                  </>
                )}
                {userDetail.demo_track &&
                  userDetail.demo_track
                    .filter((item: any) => item.primary == 0)
                    .map((item: any) => (
                      <Card
                        className="audioCard"
                        onClick={() => this.trackClicked(item)}
                      >
                        <div>
                          <div className="d-flex">
                            <img
                              src={item.cover_image || audioProfile}
                              alt=""
                            />
                            <div className="ml-3">
                              <h1>{item.name}</h1>
                              <p>{`${userDetail.first_name ||
                                ''} ${userDetail.last_name || ''}`}</p>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex">
                          <p className="time">{this.getTime(item.duration)}</p>
                          <i
                            className={
                              playingTrack.track_id == item.track_id &&
                              !playingTrack.isPaused
                                ? 'icon icon-pause'
                                : 'icon icon-next'
                            }
                          />
                        </div>
                      </Card>
                    ))}
              </div>
            </Col>
          </Row>
        </div>
        {/* <FooterDashboard /> */}

        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className="add-to-netwok-modal"
        >
          <ModalHeader toggle={this.toggle}> </ModalHeader>
          <ModalBody>
            <h2>
               Your request has been sent to  {`${userDetail.first_name || ''} ${userDetail.last_name}`}
            </h2>
            <img src={userDetail.photo || emma} />
            <h1>{`${userDetail.first_name || ''} ${userDetail.last_name}`}</h1>
            <p>
              {userDetail.expertise &&
                userDetail.expertise
                  .map((item: any) => item && item.name)
                  .join(' | ')}
            </p>
            <Button className="button-btnGradiant chat-btn" onClick={()=>this.createNewConversation(userinfo && userinfo.userId, userDetail.first_name ? `${userDetail.first_name} ${userDetail.last_name}` : userDetail.email)}>
              <i className="icon icon-comments" /> Chat Now
            </Button>
            <Button className="discover-btn" onClick={this.backToDiscover}>
              <i className="icon icon-discover " /> Back to Discover
            </Button>
          </ModalBody>
        </Modal>

        <Modal
          isOpen={removeNetwork}
          toggle={this.toggleRemoveNetwork}
          className="add-to-netwok-modal"
        >
          <ModalHeader toggle={this.toggleRemoveNetwork}> </ModalHeader>
          <ModalBody>
            <h2>
              {`${userDetail.first_name || ''} ${userDetail.last_name}`} has
              been removed from your network
            </h2>
            <img src={userDetail.photo || emma} />
            <h1>{`${userDetail.first_name || ''} ${userDetail.last_name}`}</h1>
            <p>
              {userDetail.expertise &&
                userDetail.expertise
                  .map((item: any) => item && item.name)
                  .join(' | ')}
            </p>
            <Button
              className="button-btnGradiant chat-btn"
              onClick={this.backToDiscover}
            >
              <i className="icon icon-comments" /> Back to Discover
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

interface IState {
  networkRemove: boolean;
  modal: boolean;
  removeNetwork: boolean;
  playingTrack: any;
}

interface IProps {
  getProfileById: (id: string) => Promise<any>;
  addNetwork: (id: string) => Promise<any>;
  removeNetwork: (id: string) => Promise<any>;
  playTrack: (data: any, isPaused: boolean) => Promise<any>;
  playingTrack: any;
  userDetail: any;
  match: any;
  history: History;
  rejectRequest: any;
	acceptRequest: any;
	cancelRequest: any,
	voxUser: any;
}

const mapDispatchToProps = {
  getProfileById,
  addNetwork,
  removeNetwork,
  playTrack,
	acceptRequest,
	cancelRequest,
  rejectRequest,
};

const mapStateToProps = (state: any) => {
  return {
    userDetail: state.user.profileById,
		playingTrack: state.user.playingTrack,
		voxUser: !_.isEmpty(state.user.vox_users) && state.user.vox_users.users || []
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewProfile);
