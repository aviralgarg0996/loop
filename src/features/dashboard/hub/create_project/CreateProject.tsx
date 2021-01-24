import React from 'react';
import './CreateProject.scss';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Toast,
  CardBody,
  Table,
  Card,
} from 'reactstrap';
import cover from '../../../../assets/images/cover.svg';
import AddCollaborators from '../../common/add_collaborators/AddCollaborators';
import {
  UploadTrackModal,
  TrackFileType,
} from '../../common/upload_track/UploadTrack';
import {
  UploadFilesModal,
  FileDataType,
} from '../../common/upload_files/UploadFiles';
import { myNetwork } from '../../../../redux/network/action';
import {
  createProject,
  projectById,
  updatePoject,
  createProjectInit,
} from '../../../../redux/project/action';
import { connect } from 'react-redux';
import { History } from 'history';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';

class CreateProject extends React.Component<IProps, IState> {
  readonly state: IState = {
    modalTrack: false,
    modal: false,
    modalFile: false,
    modalAddCollaborators: false,
    selecetedMem: [],
  };
  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.myNetwork();
    if (id) {
      this.props.projectById(id);
    }
  }

  componentWillReceiveProps(nextProps: any) {
    if (!_.isEqual(this.props.projectDetail, nextProps.projectDetail)) {
      const data = nextProps.projectDetail;
      this.setState({
        name: data.name,
        description: data.description,
      });
    }

    const { id } = this.props.match.params;
    if (!_.isEqual(id, nextProps.match.params.id) && !nextProps.match.params.id) {
      this.props.createProjectInit()
    }
  }

  toggle = (data: any) => {
    if (data === 'close') {
      this.setState({ modal: !this.state.modal });
      return
    }
    if (!this.state.modal) {
      this.setState({
        coverFile: undefined,
        cover_image: undefined,
        modal: !this.state.modal,
      });
    } else {
      if (this.state.coverFile && this.state.cover_image)
        this.setState({ modal: !this.state.modal });
      else
        toast.error('Please provide cover picture');
    }
  };

  toggleTrack = () => {
    this.setState({ modalTrack: !this.state.modalTrack });
  };

  toggleFile = () => {
    this.setState({ modalFile: !this.state.modalFile });
  };

  toggleAddCollaborators = () => {
    this.setState({ modalAddCollaborators: !this.state.modalAddCollaborators });
  };

  onChangeHandler = (type: string, event: FileList | null) => {
    if (event) {
      if (type == 'cover_image') {
        const cover_image = URL.createObjectURL(event[0]);
        this.setState({ coverFile: event, cover_image });
      }
    }
  };

  fileModalClosed = (data: FileDataType | null) => {
    if (data) {
      let { voiceFiles, voice_memos_files, voice_memos_title } = this.state;
      if (!voice_memos_files || !voice_memos_title || !voiceFiles) {
        voice_memos_title = [];
        voice_memos_files = [];
        voiceFiles = [];
      }
      voiceFiles.push(data.file[0]);
      voice_memos_title.push(data.title);
      voice_memos_files.push(data.fileName);
      toast('Files added successfully');
      this.setState({ voice_memos_title, voice_memos_files, voiceFiles });
      this.toggleFile();
    }
    else{
      toast('Please select file')
    }
  };

  trackModalClosed = (data: TrackFileType | null) => {
    if (data) {
      let {
        tracksImageFile,
        tracksFile,
        tracks_image,
        tracks_file,
        tracks_title,
      } = this.state;
      if (
        !tracks_image ||
        !tracks_file ||
        !tracks_title ||
        !tracksImageFile ||
        !tracksFile
      ) {
        tracks_image = [];
        tracks_file = [];
        tracks_title = [];
        tracksImageFile = [];
        tracksFile = [];
      }
      tracks_image.push(data.trackFileName);
      tracks_file.push(data.trackFileName);
      tracks_title.push(data.title);
      tracksImageFile.push(data.imageFile[0]);
      tracksFile.push(data.trackFile[0]);
      toast('Track added successfully');
      this.setState({
        tracks_image,
        tracks_file,
        tracks_title,
        tracksImageFile,
        tracksFile,
      });
    }
    this.toggleTrack();
  };

  removeTrack = (index: number) => {
    let {
      tracksImageFile,
      tracksFile,
      tracks_image,
      tracks_file,
      tracks_title,
    } = this.state;
    if (
      tracks_image &&
      tracks_file &&
      tracks_title &&
      tracksImageFile &&
      tracksFile
    ) {
      tracks_image.splice(index, 1);
      tracks_file.splice(index, 1);
      tracks_title.splice(index, 1);
      tracksImageFile.splice(index, 1);
      tracksFile.splice(index, 1);
      this.setState({
        tracks_image,
        tracks_file,
        tracks_title,
        tracksImageFile,
        tracksFile,
      });
      toast('Track removed successfully');
    }
  };

  removeCollaborator = (index: number) => {
    let { selecetedMem } = this.state;
    if (selecetedMem) {
      selecetedMem.splice(index, 1);
      this.setState({ selecetedMem });
      toast('Collaborator removed successfully');
    }
  };

  removeFile = (index: number) => {
    let { voiceFiles, voice_memos_title, voice_memos_files } = this.state;
    if (voiceFiles && voice_memos_title && voice_memos_files) {
      voiceFiles.splice(index, 1);
      voice_memos_title.splice(index, 1);
      voice_memos_files.splice(index, 1);
      this.setState({ voiceFiles, voice_memos_title, voice_memos_files });
      toast('File removed successfully');
    }
  };

  createProject = (e: any) => {
    const { id } = this.props.match.params;

    if (id) {
      e.preventDefault();
      let { name, description, coverFile } = this.state;
      if (!name) {
        toast.error('Please provide project name');
        return;
      }

      if (!description) {
        toast.error('Please provide project description');
        return;
      }

      if (name && description) {
        let data = {
          project_id: id,
          name,
          description,
          ...({ coverFile: coverFile && coverFile[0] } || {}),
        };
        this.props
          .updatePoject(data)
          .then(data => {
            toast('Project Updated successfully');
            setTimeout(() => {
              this.props.history.push('/hub');
            }, 1000);
          })
          .catch((err: any) => {
            toast.error('Something went wrong');
          });
      } else {
        toast('All fields reqiured');
      }

    } else {
      e.preventDefault();
      let {
        tracksFile,
        tracksImageFile,
        tracks_title,
        voiceFiles,
        voice_memos_title,
        name,
        description,
        coverFile,
        selecetedMem,
      } = this.state;
      if (!coverFile) {
        toast.error('Please provide cover picture');
        return;
      }
      if (!name) {
        toast.error('Please provide project name');
        return;
      }
      if (!description) {
        toast.error('Please provide project description');
        return;
      }
      // if( !tracksFile || !(tracksFile && tracksFile.length != 0) ){
      //     toast.error("Please provide atleast one track")
      //     return;
      // }
      // if( !voiceFiles || !(voiceFiles && voiceFiles.length != 0) ){
      //     toast.error("Please provide atleast one File")
      //     return;
      // }
      // tracksFile && tracksImageFile && tracks_title && voiceFiles && voice_memos_title &&
      if (name && description && coverFile) {
        let data = {
          collaborator_id: selecetedMem,
          tracksFile,
          tracksImageFile,
          tracks_title,
          voiceFiles,
          voice_memos_title,
          name,
          description,
          coverFile: coverFile[0],
        };
        this.props
          .createProject(data)
          .then(data => {
            toast('Project created successfully');
            setTimeout(() => {
              this.props.history.push('/hub');
            }, 1000);
          })
          .catch((err: any) => {
            toast.error('Something went wrong');
          });
      } else {
        toast('All fields reqiured');
      }
    }
  };

  inputHandler = (name: string, desc: string) => {
    if (name == 'name') {
      this.setState({ name: desc });
    } else if (name == 'description') {
      this.setState({ description: desc });
    }
  };

  render() {
    const currentProject = this.props.projectDetail;
    const { id } = this.props.match.params;
    const {
      modal,
      modalAddCollaborators,
      selecetedMem,
      modalFile,
      modalTrack,
      cover_image,
      name,
      description,
      voice_memos_title,
      tracks_title,
    } = this.state;
    const { networkList } = this.props;
    return (
      <div className="edit-profile-page">
        <ToastContainer />
        <Row className="m-0">
          <Col md="8">
            <h1>{!id ? 'Create Project' : 'Update Project'}</h1>
            <div className="uploadPhoto">
              <div className="dummy">
                <img
                  src={
                    cover_image ||
                    (currentProject && currentProject.cover_image) ||
                    cover
                  }
                  className="w-100"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2>Add a Cover Photo:</h2>
                  <p className="mb-0">
                    Get creative, add artwork for your project
                  </p>
                </div>
                <Button className="add-btn mt-0" onClick={this.toggle}>
                  <i className="icon-upload" /> Upload
                </Button>
              </div>
            </div>
            <Form className="form" onSubmit={this.createProject}>
              <div className="input-area">
                <FormGroup>
                  <Label>Project Title:</Label>
                  <p>What’s the name of this project?</p>
                  <Input
                    type="text"
                    name="cardnumber"
                    id="cardid"
                    value={name ? name : ''}
                    onChange={event =>
                      this.inputHandler('name', event.target.value)
                    }
                    placeholder="Enter title here"
                  />
                  <span className="edit-btn">
                    <i className="icon-edit2" />Edit
                  </span>
                </FormGroup>
              </div>

              <div className="input-area">
                <FormGroup>
                  <Label>Description:</Label>
                  {/* <p>Tell the LOOP Community a bit about yourself</p> */}
                  <Input
                    type="textarea"
                    name="cardnumber"
                    id="cardid"
                    value={description ? description : ''}
                    onChange={event =>
                      this.inputHandler('description', event.target.value)
                    }
                    placeholder="Enter description here"
                  />
                  <span className="edit-btn">
                    <i className="icon-edit2" />Edit
                  </span>
                </FormGroup>
              </div>
              {!id && <>
                <div className="input-area">
                  <h2>Upload Files:</h2>
                  <p>Upload audio files, voice memos, documents and more</p>
                  <Button className="add-btn" onClick={this.toggleFile}>
                    <i className="icon-upload-file" /> Upload File
                </Button>
                  {voice_memos_title && voice_memos_title.length > 0 && (
                    <Card className="project-detail-card project-file-lists">
                      <CardBody>
                        <Table>
                          {voice_memos_title &&
                            voice_memos_title.map(
                              (item: string, index: number) => (
                                <tr>
                                  <td>
                                    <i className="icon-file-alt" /> {item}
                                  </td>
                                  <td className="date-td">
                                    {/* {Util.getFormattedDateTZ(item.create_time)} */}{' '}
                                    {new Date()
                                      .toISOString()
                                      .replace(/T.*/, '')
                                      .split('-')
                                      .reverse()
                                      .join('-')}
                                  </td>
                                  <td
                                    className="delete-td"
                                    onClick={() => this.removeFile(index)}
                                  >
                                    <span>
                                      <i className="icon-delete" /> Delete
                                  </span>
                                  </td>
                                </tr>
                              )
                            )}
                        </Table>
                      </CardBody>
                    </Card>
                  )}
                  {/* { voice_memos_title && voice_memos_title.map((item : string, index: number) => (
                                    <div className="project-file-lists">
                                        <i className="icon-file-alt"></i> <span> { item }</span>
                                        <span onClick={()=> this.removeFile(index)} >  <i className="icon-delete"></i> Delete</span>
                                    </div>
                                )) } */}
                </div>

                <div className="input-area">
                  <h2>Upload Tracks:</h2>
                  <p>
                    Any reference tracks or demos you want to upload to this
                    project?
                </p>
                  <Button className="add-btn" onClick={this.toggleTrack}>
                    <i className="icon-play" /> Upload Track
                </Button>
                  {tracks_title && tracks_title.length > 0 && (
                    <Card className="project-detail-card project-file-lists">
                      <CardBody>
                        <Table>
                          {tracks_title &&
                            tracks_title.map((item: string, index: number) => (
                              <tr>
                                <td>
                                  <i className="icon-file-audio" /> {item}
                                </td>
                                <td className="date-td">
                                  {/* {Util.getFormattedDateTZ(item.create_time)} */}{' '}
                                  {new Date()
                                    .toISOString()
                                    .replace(/T.*/, '')
                                    .split('-')
                                    .reverse()
                                    .join('-')}
                                </td>
                                <td
                                  className="delete-td"
                                  onClick={() => this.removeTrack(index)}
                                >
                                  <span>
                                    <i className="icon-delete" /> Delete
                                </span>
                                </td>
                              </tr>
                            ))}
                        </Table>
                      </CardBody>
                    </Card>
                  )}
                  {/* { tracks_title && tracks_title.map((item : string, index: number) => (
                                    <div>
                                        <span> { item }</span>
                                        <span onClick={()=> this.removeTrack(index)} >  remove</span>
                                    </div>
                                )) } */}
                </div>

                <div className="input-area">
                  <h2>Add Collaborators:</h2>
                  <p>Add others you’d like to work on this project with you</p>
                  <Button
                    className="add-btn"
                    onClick={this.toggleAddCollaborators}
                  >
                    <i className="icon-add-user" /> Add Collaborators
                </Button>
                  <table className="table collab-tbl">
                    {selecetedMem &&
                      selecetedMem.map((item: string, index: number) => {
                        let connection = networkList.find(
                          (user: any) => user.user_id == item
                        );

                        return (
                          <tr>
                            <td>
                              <img src={connection.photo} />
                            </td>
                            <td>{`${connection.first_name ||
                              ''} ${connection.last_name || ''}`}</td>
                            <td>
                              {connection.expertise &&
                                connection.expertise
                                  .map((item: any) => item && item.name)
                                  .join(' | ')}
                            </td>
                            <td>
                              {connection.genre &&
                                connection.genre
                                  .map((item: any) => item && item.name)
                                  .join(' | ')}
                            </td>
                            <td>
                              <span
                                onClick={() => this.removeCollaborator(index)}
                              >
                                <i className="icon-delete" /> Delete
                            </span>
                            </td>
                          </tr>
                        );
                      })}
                  </table>
                </div>
              </>}
              <Button
                className="button-btnGradiant save-btn"
                onClick={this.createProject}
              >
                <i className="icon icon-layer-plus " />{' '}
                {id ? 'Update' : 'Create'} This Project
              </Button>
            </Form>
          </Col>
        </Row>

        <Modal
          isOpen={modal}
          toggle={() => this.toggle("close")}
          className="add-to-netwok-modal upload-modal"
        >
          <ModalHeader toggle={() => this.toggle("close")}> </ModalHeader>
          <ModalBody>
            <h2>Add a photo to your project</h2>
            <p className="pg-1">Get creative, add artwork for your project</p>
            <p className="text-left mt-5 mb-2">Upload image for project:</p>
            <div className="upload-f-device">
              <img src={cover_image || cover} />
              <div className="upload-devicebtn">
                <input
                  type="file"
                  name="file-1[]"
                  id="file-1"
                  accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG"
                  onChange={event =>
                    this.onChangeHandler('cover_image', event.target.files)
                  }
                  className="inputfile inputfile-1"
                />
                <label htmlFor="file-1">
                  <i className="icon icon-share" /> Upload from Device
                </label>
              </div>
            </div>

            <Button
              className="button-btnGradiant chat-btn"
              onClick={this.toggle}
            >
              <i className="icon icon-upload " /> Add cover photo
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
          selectedCollaborator={selecetedMem || []}
          modalAddCollaborators={modalAddCollaborators}
          addCollaborators={(selecetedMem: string[]) => {
            this.setState({ selecetedMem });
            this.toggleAddCollaborators();
            toast('Collabortor added successfully');
          }}
          toggleAddCollaborators={this.toggleAddCollaborators}
        />
      </div>
    );
  }
}

interface IProps {
  networkList: any[];
  myNetwork: () => Promise<any>;
  createProject: (data: any) => Promise<any>;
  updatePoject: (data: any) => Promise<any>;
  projectById: (id: string) => Promise<any>;
  createProjectInit: () => Promise<any>;
  history: History;
  projectDetail: any;
  match: any;
}

interface IState {
  modal: boolean;
  modalTrack: boolean;
  modalFile: boolean;
  modalAddCollaborators: boolean;
  profileFile?: FileList;
  coverFile?: FileList;
  cover_image?: string;
  tracks_image?: string[];
  tracksImageFile?: any[];
  tracks_title?: string[];
  tracks_file?: string[];
  tracksFile?: any[];
  voice_memos_title?: string[];
  voice_memos_files?: string[];
  voiceFiles?: any[];
  collaborator_id?: string[];
  name?: string;
  description?: string;
  selecetedMem: string[];
}

const mapDispatchToProps = {
  myNetwork,
  createProject,
  updatePoject,
  projectById,
  createProjectInit,
};

const mapStateToProps = (state: any) => {
  return {
    networkList: state.network.myNetwork,
    projectDetail: state.project.project,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
