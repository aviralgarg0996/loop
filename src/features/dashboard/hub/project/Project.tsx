import React, { Fragment } from 'react';
import './Project.scss';
import banner from '../../../../assets/images/banner.png';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import AddCollaborators from '../../common/add_collaborators/AddCollaborators';
import {
  UploadTrackModal,
  TrackFileType,
} from '../../common/upload_track/UploadTrack';
import {
  UploadFilesModal,
  FileDataType,
} from '../../common/upload_files/UploadFiles';
import recordIcon from '../../../../assets/images/record.png';
import recordingIcon from '../../../../assets/images/recording.png';
import { connect } from 'react-redux';
import {
  projectById,
  projectAddCollaborator,
  projectAddFile,
  projectAddTrack,
  projectRemoveTrack,
  projectRemoveFile,
  projectRemoveVoice,
  projectAddVoice,
} from '../../../../redux/project/action';
import { myNetwork } from '../../../../redux/network/action';
import Util from '../../../../utils/Util';
import { ToastContainer, toast } from 'react-toastify';

import { ReactMic } from 'react-mic';
// import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css';
import AudioRecorder from 'react-audio-recorder';
import _ from 'lodash';
import { createConversation } from '../../../../redux/user/action';
import { Link } from 'react-router-dom';
// import MicRecorder from 'mic-recorder-to-mp3';
const MicRecorder = require('mic-recorder').default;

const recorder = new MicRecorder({
  bitRate: 128,
  encoder: 'mp3', // default is mp3, can be wav as well
  sampleRate: 44100, // default is 44100, it can also be set to 16000 and 8000.
});

interface IState {
  record: boolean;
  modal: boolean;
  modalTrack: boolean;
  modalAddCollaborators: boolean;
  modalFile: boolean;
  recording: boolean;
  voiceRecord?: any;
  networkList: any[];
  audioDetails: any;
  expendedTrack: boolean;
  expendedMemo: boolean;
  expendedShared: boolean;
}

interface IProps {
  match: any;
  projectById: (id: string) => Promise<any>;
  project: any;
  myNetwork: () => Promise<any>;
  networkList: any[];
  projectAddCollaborator: (data: any) => Promise<any>;
  projectAddTrack: (data: any) => Promise<any>;
  projectAddFile: (data: any) => Promise<any>;
  projectRemoveTrack: (id: string) => Promise<any>;
  projectAddVoice: (data: any) => Promise<any>;
  projectRemoveVoice: (id: string) => Promise<any>;
  projectRemoveFile: (id: string) => Promise<any>;
  voxUser: any[];
}

class Project extends React.Component<IProps, IState> {
  readonly state: IState = {
    record: false,
    modal: false,
    modalFile: false,
    modalAddCollaborators: false,
    modalTrack: false,
    recording: false,
    expendedTrack: false,
    expendedMemo: false,
    expendedShared: false,
    networkList: [],
    audioDetails: {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    },
  };

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    this.init();
  }

  init = () => {
    const { id } = this.props.match.params;
    this.props.projectById(id);
    this.props.myNetwork();
  };

  toggle = () => {
    if (!this.state.modal) {
      this.setState({ voiceRecord: null });
    }
    this.setState({ modal: !this.state.modal });
  };

  toggleFile = () => {
    this.setState({ modalFile: !this.state.modalFile });
  };

  toggleTrack = () => {
    this.setState({ modalTrack: !this.state.modalTrack });
  };

  startRecording = () => {
    //  this.setState({record: true});
    this.setState({
      voiceRecord: {},
      record: true,
    });

    // Start recording. Browser will request permission to use your microphone.
    recorder
      .start()
      .then(() => {
        // something else
        this.setState({ voiceRecord: null });
      })
      .catch((e: any) => {
        console.error(e);
      });
  };

  stopRecording = () => {
    // this.setState({modal: false});
    this.setState({
      record: false,
    });

    // Once you are done singing your best song, stop and get the mp3.
    recorder
      .stop()
      .getAudio()
      .then(([buffer, blob]: any[]) => {
        const file = new File(buffer, 'me-at-thevoice.mp3', {
          type: blob.type,
          lastModified: Date.now(),
        });
        console.log('#file', file);

        // const player = new Audio(URL.createObjectURL(file));
        // player.play();
        this.setState({
          voiceRecord: {
            title: Date.now() + '-' + file.name,
            file: file,
          },
        });
      })
      .catch((e: any) => {
        alert('We could not retrieve your message');
        console.log(e);
      });
  };

  toggleAddCollaborators = () => {
    let { project, networkList } = this.props;

    console.log('#networkList', networkList);
    if (!this.state.modalAddCollaborators) {
      networkList =
        networkList &&
        networkList.filter((item: any) => {
          const index =
            (project &&
              project.collaborator &&
              Array.isArray(project.collaborator) &&
              project.collaborator.map(
                (item: any) => item.user_id == item.collaborator_user_id
              )) ||
            -1;
          return index != -1;
        });
    }
    console.log('#networkList', networkList);

    this.setState({
      modalAddCollaborators: !this.state.modalAddCollaborators,
      networkList,
    });
  };

  addCollaborator = (newCollaborator: string[]) => {
    this.setState({ modalAddCollaborators: !this.state.modalAddCollaborators });
    const { project } = this.props;
    if (newCollaborator && newCollaborator.length > 0) {
      const data = {
        user_id: newCollaborator,
        project_id: project.project_id,
      };
      this.props.projectAddCollaborator(data).then(res => {
        toast('Collaborator added');
        this.init();
      });
    }
  };

  trackModalClosed = (data: TrackFileType | null) => {
    console.log('trackModalClosed', data);
    const { project } = this.props;
    const formData = new FormData();
    if (data) {
      formData.append('project_id', project.project_id);
      formData.append('tracks_image[]', data.imageFile[0]);
      formData.append('tracks_title[]', data.title);
      formData.append('tracks_file[]', data.trackFile[0]);
      this.props.projectAddTrack(formData).then((data: any) => {
        toast('Track added');
        this.init();
      });
    }
    this.toggleTrack();
  };

  removeTrack = (id: string) => {
    this.props.projectRemoveTrack(id).then((data: any) => {
      toast('Track removed');
      this.init();
    });
  };

  removeVoiceMemo = (id: string) => {
    this.props.projectRemoveVoice(id).then((data: any) => {
      toast('Voice memo removed');
      this.init();
    });
  };

  removeProjectFile = (id: string) => {
    this.props.projectRemoveFile(id).then((data: any) => {
      toast('Shared file removed');
      this.init();
    });
  };

  fileModalClosed = (data: FileDataType | null) => {
    console.log('#fileModalClosed', data);
    const { project } = this.props;
    const formData = new FormData();
    if (data) {
      formData.append('project_id', project.project_id);
      formData.append('project_file[]', data.file[0]);
      formData.append('project_file_title[]', data.title);
      this.props.projectAddFile(formData).then((data: any) => {
        toast('File added');
        this.init();
      });
    }
    this.toggleFile();
  };

  saveVoiceMemo = () => {
    const { project = {} } = this.props;
    const { voiceRecord } = this.state;
    if (!voiceRecord) {
      toast('Voice memo not found');
      return;
    }
    const formData = new FormData();
    formData.append('project_id', project.project_id);
    formData.append('voice_memos_title[]', voiceRecord.title);
    formData.append('voice_memos_files[]', voiceRecord.file);

    this.props
      .projectAddVoice(formData)
      .then((res: any) => {
        const { id } = this.props.match.params;
        this.props.projectById(id);
        toast('Voice memo added');
      })
      .catch(error => {
        toast('Something went wrong');
      });

    this.setState({ modal: false });
  };

  handleAudioStop = (data: any) => {
    console.log(data);
    this.setState({ audioDetails: data });
  };

  handleAudioUpload = (file: any) => {
    console.log(file);
  };

  handleRest = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    this.setState({ audioDetails: reset });
  };
  createNewConversation(usersId: any, title: any) {
    if(usersId) {
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
    
}
  render() {
    const {
      modal,
      modalAddCollaborators,
      modalTrack,
      modalFile,
      networkList = [],
    } = this.state;
    const { project = {}, voxUser } = this.props;
    console.log('project props', this.props);
    
    
    return (
      <Fragment>
        <div className="view-profile-page project">
          <ToastContainer />
          <div className="view-profile">
            <div
              className="view-profile-head"
              style={{
                backgroundImage:
                  'url(' + `${project.cover_image || banner}` + ')',
              }}
            >
              {/* <img src={audioProfile1} alt="profile" className="w-100 "/> */}
              <div className="profile-section">
                <Row>
                  <Col md="8">
                    <p className="status">
                      {project.status == 'current' ? 'CURRENT' : 'ARCHIVED'}{' '}
                      PROJEECT
                    </p>
                    <h2>{project.name}</h2>
                    <p>
                      Last opened:{' '}
                      {Util.getFormattedDate(project.last_updated_at)}{' '}
                      <small>
                        (Created: {Util.getFormattedDate(project.created_date)}{' '}
                        )
                      </small>
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
            <Row className="bottom-section">
              <Col xl="8" className="left" lg="7">
              <div className="remove-network edit-project-btn">
                    <Link to={`/hub/edit-project/${project.project_id}`}>
                      <Button className="border-gradiant-btn edit-profile-btn" >
                          <div className="inner-module">
                              <span>
                              <i className="icon icon-edit "></i>  Edit Project
                              </span>
                          </div>
                      </Button>
                    </Link>
                </div> 
                <div className="left-col">
                  <div className="mt-3">
                    <h3>Description:</h3>
                    <p>{project.description}</p>
                  </div>
                  <Card
                    className={
                      this.state.expendedShared
                        ? 'project-detail-card expended-card'
                        : 'project-detail-card expend-card'
                    }
                  >
                    <CardHeader>
                      <div className="d-flex justify-content-between">
                        <h3>Shared Files</h3>
                        <Button
                          className="add-btn mt-0"
                          onClick={this.toggleFile}
                        >
                          <i className="icon-upload-file" /> Upload File
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Table>
                        {project.files &&
                          Array.isArray(project.files) &&
                          project.files.map((item: any) => (
                            
                            <tr>
                              <td>
                                <a href={item.file_name} download>
                                  <i className="icon-file-alt" /> {item.title}
                                </a>
                              </td>
                              <td className="date-td">
                                {Util.getFormattedDateTZ(item.create_time)}
                              </td>
                              <td
                                className="delete-td"
                                onClick={() =>
                                  this.removeProjectFile(item.file_id)
                                }
                              >
                                <span>
                                  <i className="icon-delete" /> Delete
                                </span>
                              </td>
                            </tr>
                          ))}
                      </Table>
                    </CardBody>

                    {project.files && project.files.length > 3 && (
                      <div
                        className={
                          this.state.expendedShared ? '' : 'gradiant-bg-bottom'
                        }
                      >
                        <div
                          className={
                            this.state.expendedShared
                              ? 'down-btn up-btn'
                              : 'down-btn'
                          }
                          onClick={() =>
                            this.setState({
                              expendedShared: !this.state.expendedShared,
                            })
                          }
                        >
                          <i className="icon-arrow-right" />
                        </div>
                      </div>
                    )}
                  </Card>
                  <Card className="project-detail-card">
                    <CardHeader>
                      <div className="d-flex justify-content-between">
                        <h3>Archived sessions</h3>
                        <Button className="add-btn mt-0">
                          <i className="icon-file-video" /> Upload Sessions
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Table>
                        <tr>
                          <td>
                            <i className="icon-file-video" /> Session 1
                          </td>
                          <td className="date-td">02.05.2020</td>
                          <td className="delete-td">
                            <span>
                              <i className="icon-delete" /> Delete
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="icon-file-video" /> Session 2
                          </td>
                          <td className="date-td">02.05.2020</td>
                          <td className="delete-td">
                            <span>
                              <i className="icon-delete" /> Delete
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="icon-file-video" /> Session 3
                          </td>
                          <td className="date-td">02.05.2020</td>
                          <td className="delete-td">
                            <span>
                              <i className="icon-delete" /> Delete
                            </span>
                          </td>
                        </tr>
                      </Table>
                    </CardBody>
                    <div className="gradiant-bg-bottom">
                      <div className="down-btn">
                        <i className="icon-arrow-right" />
                      </div>
                    </div>
                  </Card>
                  <Card
                    className={
                      this.state.expendedTrack
                        ? 'project-detail-card expended-card'
                        : 'project-detail-card expend-card'
                    }
                  >
                    <CardHeader>
                      <div className="d-flex justify-content-between">
                        <h3>Tracks</h3>
                        <Button
                          className="add-btn mt-0"
                          onClick={this.toggleTrack}
                        >
                          <i className="icon-file-audio" /> Upload Track
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Table>
                        {project.tracks &&
                          Array.isArray(project.tracks) &&
                          project.tracks.map((item: any, i: any, arr: any) => (
                            <tr>
                              <td>
                                <a href={item.file_name}  download>
                                  <i className="icon-file-audio" /> {item.tracks_title}
                                </a>
                              </td>
                              <td className="date-td">
                                {Util.getFormattedDateTZ(item.date)}
                              </td>
                              <td
                                className="delete-td"
                                onClick={() => this.removeTrack(item.file_id)}
                              >
                                <span>
                                  <i className="icon-delete" /> Delete
                                </span>
                              </td>
                            </tr>
                          ))}
                      </Table>
                    </CardBody>
                    {project.tracks && project.tracks.length > 3 && (
                      <div
                        className={
                          this.state.expendedTrack ? '' : 'gradiant-bg-bottom'
                        }
                      >
                        <div
                          className={
                            this.state.expendedTrack
                              ? 'down-btn up-btn'
                              : 'down-btn'
                          }
                          onClick={() =>
                            this.setState({
                              expendedTrack: !this.state.expendedTrack,
                            })
                          }
                        >
                          <i className="icon-arrow-right" />
                        </div>
                      </div>
                    )}
                  </Card>
                  <Card
                    className={
                      this.state.expendedMemo
                        ? 'project-detail-card expended-card'
                        : 'project-detail-card expend-card'
                    }
                  >
                    <CardHeader>
                      <div className="d-flex justify-content-between">
                        <h3>Voice Memos</h3>
                        <Button className="add-btn mt-0" onClick={this.toggle}>
                          <i className="icon-microphone-alt" /> Voice Memos
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Table>
                        {project.voice_memo &&
                          Array.isArray(project.voice_memo) &&
                          project.voice_memo.map((item: any) => (
                            <tr>
                              <td>
                              <a href={item.file_name} download>
                                <i className="icon-microphone-alt" /> {' '} {item.voice_memo_title}
                                </a>
                              </td>
                              <td className="date-td">
                                {Util.getFormattedDateTZ(item.date)}
                              </td>
                              <td
                                className="delete-td"
                                onClick={() =>
                                  this.removeVoiceMemo(item.file_id)
                                }
                              >
                                <span>
                                  <i className="icon-delete" /> Delete
                                </span>
                              </td>
                            </tr>
                          ))}
                      </Table>
                      {project.voice_memo && project.voice_memo.length > 3 && (
                        <div
                          className={
                            this.state.expendedMemo ? '' : 'gradiant-bg-bottom'
                          }
                        >
                          <div
                            className={
                              this.state.expendedMemo
                                ? 'down-btn up-btn'
                                : 'down-btn'
                            }
                            onClick={() =>
                              this.setState({
                                expendedMemo: !this.state.expendedMemo,
                              })
                            }
                          >
                            <i className="icon-arrow-right" />
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </div>
              </Col>
              <Col xl="4" lg="5">
                <div className="right-col">
                  <div className="head">
                    <div>
                      <h1>Collaborators</h1>
                      <p>{`${(project.collaborator &&
                        project.collaborator.length) ||
                        0} Collaborator${
                        project.collaborator && project.collaborator.length > 1
                          ? 's'
                          : ''
                      }`}</p>
                    </div>
                    <Button
                      className="add"
                      onClick={this.toggleAddCollaborators}
                    >
                      <i className="icon-plus-square" />
                      <span>Add</span>
                    </Button>
                  </div>
                  {project.collaborator &&
                    Array.isArray(project.collaborator) &&
                    project.collaborator.map((item: any) => {
                      const userName = `${item.email && item.email.replace(
                        '@',
                        '-loop-'
                      )}@loop.cocoworth`;
                      const userinfo = voxUser.find(
                        (item: any) => item.userName === userName
                      );
                      return(
                        <Card className="audioCard" onClick={()=>this.createNewConversation(userinfo && userinfo.userId, item.first_name ? `${item.first_name} ${item.last_name}` : item.email)}>
                        
                        <div className="d-flex align-items-center">
                          <img src={item.image} alt="" />
                          <div className="ml-3">
                            <h1>{`${item && item.first_name} ${item && item.last_name}`}</h1>
                            <p>
                              {item.expertise &&
                                Array.isArray(item.expertise) &&
                                item.expertise
                                  .map((item: any) => item && item.name)
                                  .join(' | ')}
                            </p>
                          </div>
                        </div>
                        {userinfo && userinfo.online ? (
                          <span className="status-custom online">Online</span>
                        ) : (
                          <span className="status-custom offline">
                            Offiline
                          </span>
                        )}
                      </Card>
                      )
                      
                    })}
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Modal
          isOpen={modal}
          toggle={this.toggle}
          className="add-to-netwok-modal upload-modal memo-modal"
        >
          <ModalHeader toggle={this.toggle}> </ModalHeader>
          <ModalBody>
            <h2>Record Voice Memo</h2>
            <p className="text-center mt-5 mb-2">
              Got an idea for a melody? A cool guitar riff? Get it recorded and
              added to your project
            </p>
            {!this.state.record && (
              <img src={recordIcon} onClick={this.startRecording} />
            )}
            {this.state.record && <img src={recordingIcon} />}
            {this.state.record && (
              <Button
                className="stop-recording-btn"
                onClick={this.stopRecording}
              >
                <i className="icon-stop" /> Stop Recording
              </Button>
            )}
            <div className="play-duration" />
            <div className="d-flex justify-content-between your-memo">
              {this.state.voiceRecord && (
                <>
                  <div>
                    <i className="icon-microphone-alt" />{' '}
                    {this.state.voiceRecord && this.state.voiceRecord.title}
                  </div>
                  <div
                    className="delete"
                    onClick={() => this.setState({ voiceRecord: null })}
                  >
                    <i className="icon-delete" /> Delete
                  </div>
                </>
              )}
            </div>

            <Button
              className="button-btnGradiant chat-btn"
              onClick={this.saveVoiceMemo}
            >
              <i className="icon icon-microphone-alt" /> Save Memo
            </Button>
          </ModalBody>
        </Modal>
        <UploadFilesModal
          modalFile={modalFile}
          onClose={(data: FileDataType | null) => this.fileModalClosed(data)}
          toggleFile={this.toggleFile}
        />
        <UploadTrackModal
          modalTrack={modalTrack}
          onClose={(data: TrackFileType | null) => this.trackModalClosed(data)}
          toggleTrack={this.toggleTrack}
        />
        <AddCollaborators
          connections={networkList}
          selectedCollaborator={
            project.collaborator &&
            project.collaborator.map((item: any) => item.user_id)
          }
          modalAddCollaborators={modalAddCollaborators}
          toggleAddCollaborators={this.toggleAddCollaborators}
          addCollaborators={(selecetedMem: string[]) => {
            this.toggleAddCollaborators();
            if (selecetedMem.length > 0) {
              this.addCollaborator(selecetedMem);
            }
            console.log('#selecetedMem', selecetedMem);
          }}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  projectById,
  myNetwork,
  projectAddCollaborator,
  projectAddTrack,
  projectAddFile,
  projectRemoveTrack,
  projectRemoveVoice,
  projectAddVoice,
  projectRemoveFile,
};

const mapStateToProps = (state: any) => {
  return {
    project: state.project.project,
    networkList: state.network.myNetwork,
    voxUser:
      (!_.isEmpty(state.user.vox_users) && state.user.vox_users.users) || [],
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
