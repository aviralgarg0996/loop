import React from 'react';
import './CollaboratorsChat.scss';
import { Button } from 'reactstrap';
import profile from '../../../../assets/images/profile.png';
import { connect } from 'react-redux';
import { getCurrentConversation } from '../../../../redux/user/action';
import { myNetwork } from "../../../../redux/network/action";
import _ from 'lodash';
import Moment from 'react-moment';
import moment from 'moment';
import MessengerService from '../../../../services/voximplant-service/messenger.service';
interface IProps {
  history: any;
  currentUser: any;
  currentConversation: any;
  currentProfile: any;
  allConversation: any;
  currentConversationID: any;
  getCurrentConversation: any;
  myNetwork: any;
  myNetworkList: any;
  voxUserList: any;
  voxUserCurrentUser: any;
}

interface IState {
  message: string;
  searchMessage: any
}

class CollaboratorsChat extends React.Component<IProps, IState> {
  private messageContainer: React.RefObject<HTMLDivElement>;
  private fileSelect: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      message: '',
      searchMessage: false
    };
    this.messageContainer = React.createRef();
    this.fileSelect = React.createRef();
  }

  componentDidMount() {
    const uuid = this.getCurrentMessageUUID();
    if (uuid) {
      getCurrentConversation(uuid);
    }
    this.props.myNetwork(true);
  }

  componentDidUpdate() {
    // this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messageContainer &&
      this.messageContainer.current &&
      this.messageContainer.current.scrollIntoView({ behavior: 'smooth' });
  };

  componentWillReceiveProps(nextProps: any) {
    const uuid = this.getCurrentMessageUUID();
    if (uuid && nextProps.currentConversationID !== uuid) {
      getCurrentConversation(uuid);
    }

    if (!_.isEqual(this.props.currentConversation, nextProps.currentConversation)) {
      setTimeout(()=>{
        this.scrollToBottom();
      }, 300);
    }

  }

  selectFile = () => {
    this.fileSelect &&
      this.fileSelect.current &&
      this.fileSelect.current.click();
  };

  toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error: any) => reject(error);
    });

  onChangeFile = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    const uuid = this.getCurrentMessageUUID();
    const { allConversation } = this.props;
    const currentConversation =
      allConversation &&
      allConversation.find((item: any) => item._uuid === uuid);
    if (file && currentConversation) {
      const messenger = MessengerService.get();
      const blob = await this.toBase64(file);
      messenger
        .sendMessage(currentConversation, '', { file: blob, name: file.name, type: file.type})
        .then((data: any) => {
          console.log('Attachment send successfully', data);
        })
        .catch((e: any) => {
          console.log('Attachment send got error', e);
        });
    }
  };

  getCurrentMessageUUID() {
    const {
      location: { search },
    } = this.props.history;
    const uuid = new URLSearchParams(search).get('uuid');
    return uuid;
  }

  searchFilter = (e:any) => {
    if(e.target.value.trim()){
      this.setState({searchMessage: e.target.value.trim().toLowerCase()})
    } else {
      this.setState({searchMessage: false})
    }
  }

  checkEmail(userName: any) {
    if (userName) {
      const tempEmail = userName.replace('-loop-', '@').slice(0, -15);
      return tempEmail;
    }
    return false;
  }

  getUserDetailByEmail = (email: string)=> {
    const { myNetworkList } = this.props;
    if (email && myNetworkList) {
      return myNetworkList.find((item:any)=> item.email === email)
    }
    return false;
  }

  getUserDetail = (participants: any, direct: boolean)=> {
    const { myNetworkList, voxUserList, voxUserCurrentUser } = this.props;
    if (participants) {
      const participantsInfo = participants.map((item:any)=>{
        const findUSer = voxUserList.find((subItem: any)=> item.userId === subItem.userId);
        const userEmail = findUSer && findUSer.userName && this.checkEmail(findUSer.userName);
        if (userEmail && myNetworkList) {
          const info = myNetworkList.find((item:any)=> item.email === userEmail)
          return {
            ...item,
            first_name: info && info.first_name || null,
            last_name: info &&info.last_name || null,
            photo: info && info.photo || null,
            email: info && info.email || userEmail,
            online: findUSer && findUSer.online
          }
        }
        return item;
      })
      if (voxUserCurrentUser && direct) {
        return participantsInfo.find((item: any)=> item.userId !== voxUserCurrentUser.userId)
      } else if (voxUserCurrentUser) {
        return participantsInfo.filter((item: any)=> item.userId !== voxUserCurrentUser.userId)
      }
      return participantsInfo;
    }
    return participants
  }

  getCurrentConversationInfo() {
    const uuid = this.getCurrentMessageUUID();
    const { allConversation } = this.props;
    const currentInfo =
      allConversation &&
      allConversation.find((item: any) => item._uuid === uuid);
    const currentTime =
      currentInfo &&
      moment.unix(currentInfo.lastUpdate).format('MMM DD YYYY h:mm A');

    const realUser = currentInfo && currentInfo.participants && this.getUserDetail(currentInfo.participants, currentInfo.direct);
    let chatTitle = '';
    let chatPhoto = profile;
    if (currentInfo && currentInfo.direct) {
      chatTitle = realUser.first_name ? realUser.first_name +' '+ realUser.last_name : realUser.email;
      chatPhoto = realUser.photo;
    } else {
      realUser && realUser.map((item:any, index: any)=> {
        if (item.first_name) {
          chatTitle = index !==0 ? `${chatTitle},${item.first_name} ${item.last_name}` : `${item.first_name} ${item.last_name}`;
        } else {
          chatTitle = index !== 0? `${chatTitle},${item.email}` : `${item.email}`;
        }
      })
    }
   
    return (
      <div className="row header-chat m-0">
        <div className="col-md-12">
          <div className="d-flex justify-content-between">
            <div className="chat-top-mobile ">
              <Button className="go-back" onClick={this.props.history.goBack}>
                <span className="icon-arrow-right" />
              </Button>
            </div>
             
            <div className="active-user">
              <h1>{chatTitle}</h1>
              <p className="pg-1">
                { realUser.online ? 'Online' : 'Last seen '} {!realUser.online && currentTime && <Moment fromNow>{currentTime}</Moment>}
              </p>
            </div>
            <div className="search-field">
              <input type="text" placeholder="Search" onChange={this.searchFilter}/>
              <i className="icon icon-search" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  sendMessage = () => {
    const uuid = this.getCurrentMessageUUID();
    const { allConversation } = this.props;
    const currentConversation =
      allConversation &&
      allConversation.find((item: any) => item._uuid === uuid);
    if (this.state.message && currentConversation) {
      const messenger = MessengerService.get();
      messenger.sendMessage(currentConversation, this.state.message);
      this.setState({
        message: '',
      });
    }
  };

  writeMessage = (e: any) => {
    this.setState({
      message: e.target.value,
    });
  };

  downloadURI = (e:any, uri:any, name:any) => {
    e.preventDefault();
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getCurrentConversationMessages() {
    const uuid = this.getCurrentMessageUUID();
    const { currentConversation, currentProfile } = this.props;
    let currStoreTime = '';
    let dateHeader: any = '';
    const calendar = {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      lastWeek: 'dddd',
      sameElse: 'L',
    };
    if (uuid && !_.isEmpty(currentConversation)) {
      const conversation = currentConversation[uuid];
      let imageShow = false;
      let previousAligment: boolean | undefined = undefined;
      return (
        conversation &&
        conversation.map((item: any) => {
          if(this.state.searchMessage && 
            (
              (item.text && !item.text.toLowerCase().includes(this.state.searchMessage)) || 
              (item.payload && 
                item.payload[0] && 
                item.payload[0]['name'] && 
                !item.payload[0]['name'].toLowerCase().includes(this.state.searchMessage)
              )
            )
            ){
              return false
          }
          const currentTime = moment(item.timestamp).format(
            'MMM DD YYYY h:mm A'
          );
          const currExactTime = moment(item.timestamp).format('DD/MM/YYYY');
          if (!currStoreTime || currStoreTime !== currExactTime) {
            currStoreTime = currExactTime;
            dateHeader = (
              <div className="text-center no-message mb-4">
                <p>
                  <Moment calendar={calendar}>{item.timestamp}</Moment>
                </p>
              </div>
            );
          } else {
            dateHeader = '';
          }
          const email =
            item.user &&
            item.user.userName &&
            this.checkEmail(item.user.userName);
          const leftAligement = currentProfile && email == currentProfile.email ? false : true;
          const userInfo = this.getUserDetailByEmail(email) || currentProfile;
    
          if(leftAligement && leftAligement != previousAligment) {
            previousAligment = true;
            imageShow = true
          } else if (!leftAligement && leftAligement != previousAligment) {
            previousAligment = false;
            imageShow = true
          } else {
            imageShow = false
          }

          return (
            <>
              {dateHeader}
              <div
                className={
                  leftAligement ? 'row m-0' : 'row m-0 justify-content-end'
                }
              >
                <div
                  className={
                    leftAligement ? 'col-md-6 right-chat' : 'col-md-6 left-chat'
                  }
                >
                  
                    <div className="image">
                    {leftAligement && imageShow && (
                      <img
                        src={leftAligement &&  userInfo.photo || profile}
                      />
                      )}
                    </div>
                  
                  <div className={imageShow ? 'message-box chat-tringle': 'message-box'}>
                    <p>
                      {item.payload &&
                      item.payload[0] &&
                      item.payload[0]['file'] ? (
                        <a href="#" onClick={(e:any)=>this.downloadURI(e, item.payload[0]['file'], item.payload[0]['name'])}>
                          { item.payload[0]['name'] || 'Attachment' }
                        </a>
                      ) : (
                        item._text
                      )}
                    </p>
                    <br />
                    <span className="time">
                      {moment(currentTime).format('LT')}
                    </span>
                  </div>
                  
                    <div className="image">
                    {!leftAligement && imageShow && (
                      <img
                        src={leftAligement &&  userInfo.photo || profile}
                      />
                      )}
                    </div>
                  
                </div>
              </div>
            </>
          );
        })
      );
    }
    return [];
  }

  render() {
    const uuid = this.getCurrentMessageUUID();
    if(!uuid){
      return null
    }
    return (
      <div className="collaboratorsChat">
        {this.getCurrentConversationInfo()}
        <div className="chatting-section">
          <div className="text-center no-message mb-4">
            <p>
              There are no messages yet, this is your first conversation with
              the member
            </p>
          </div>
          {this.getCurrentConversationMessages()}
          <span ref={this.messageContainer} />
        </div>
        <div className="row header-footer m-0">
          <input
            type="file"
            ref={this.fileSelect}
            onChange={this.onChangeFile}
            style={{display: 'none'}}
          />
          <div className="col-md-12">
            <input
              className="form-control"
              placeholder="Enter your message"
              value={this.state.message}
              onChange={this.writeMessage}
              onKeyUp={
                (event: any)=> {
                  if (event.keyCode === 13) {
                      event.preventDefault();
                      this.sendMessage()
                  }
                }
              }
            />
            <i className="icon-paperclip" onClick={this.selectFile} />
            <i
              className="icon-paper-plane"
              onClick={() => this.sendMessage()}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    currentUser:
      !_.isEmpty(state.user.vox_users) && state.user.vox_users.currentUser,
    allConversation:
      !_.isEmpty(state.user.vox_users) && state.user.vox_users.conversations,
    currentProfile: !_.isEmpty(state.user) && state.user.profile,
    currentConversation: state.user.conversationHistory,
    currentConversationID: state.user.currentConversationId,
    myNetworkList: state.network.myNetwork || [],
    voxUserList: state.user && state.user.vox_users && state.user.vox_users.users || [],
    voxUserCurrentUser: state.user && state.user.vox_users && state.user.vox_users.currentUser || {},
  };
};

const mapDispatchToProps = {
  getCurrentConversation,
  myNetwork,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollaboratorsChat);
