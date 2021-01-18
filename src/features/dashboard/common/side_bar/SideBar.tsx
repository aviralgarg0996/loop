import React from 'react';
import { Nav, Button } from 'reactstrap';
import './SideBar.scss';
import logo from '../../../../assets/images/logo.svg';
import profile from '../../../../assets/images/profile.png';
import AuthFooter from '../../../../layouts/auth_footer/AuthFooter';
import { NavLink, Link } from 'react-router-dom';
import Notification from '../../common/notification/Notification';
import { connect } from 'react-redux';
import Chat from '../chat/Chat';
import { getProfile, getNotification } from '../../../../redux/user/action';
import { History } from 'history';
import { voxService } from '../../../../services/voximplant-service/vox.service';
import _ from 'lodash';
import Moment from 'react-moment';
import moment from 'moment';
interface IProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (value: boolean) => void;
  menu: any[];
  router?: any;
  getProfile: () => void;
  userDetail: any;
  history: History;
  getNotification: () => Promise<any>;
  notifications: [];
  conversations: [];
  myNetworkList: any;
  voxUserList: any;
  voxUserCurrentUser: any;
  conversationHistory: any[];
}

interface IState {
  menu: any[];
  user: any | null;
}

const calendar = {
  lastDay: '[Yesterday]',
  sameDay: 'LT',
  lastWeek: 'dddd',
  sameElse: 'L',
};

const ConversationList = (props: any) => {
  const {
    setIsSideBarOpen,
    conversations,
    goBack,
    getUserDetail,
    activeUId,
    newConversations,
    conversationHistory,
  } = props;

  const getChatTitle = (item: any, loopUser: any) => {
    let chatTitle = '';
    if (item.direct) {
      chatTitle = loopUser.first_name
        ? loopUser.first_name + ' ' + loopUser.last_name
        : loopUser.email;
    } else {
      loopUser.map((item: any, index: any) => {
        if (item.first_name) {
          chatTitle =
            index !== 0
              ? `${chatTitle},${item.first_name} ${item.last_name}`
              : `${item.first_name} ${item.last_name}`;
        } else {
          chatTitle = index !== 0 ? `${chatTitle},${item.email}` : item.email;
        }
      });
    }
    return chatTitle;
  };

  const getLastMessageAndTime = (item: any) => {
    const currentConversation =
      !_.isEmpty(conversationHistory) && conversationHistory[item._uuid];
    const lastEvent =
      !_.isEmpty(currentConversation) &&
      currentConversation[currentConversation.length - 1];
    if (lastEvent) {
      return {
        lastMessage: lastEvent.text
          ? lastEvent.text
          : lastEvent.payload &&
            lastEvent.payload[0] &&
            lastEvent.payload[0]['name'],
        timestamp: lastEvent.timestamp,
      };
    }
    return {
      lastMessage: '',
      timestamp: '',
    };
  };

  return (
    <>
      <div className="mobile mobile-menu-icon">
        <ul>
          <Notification {...props} />
          <li>
            <i
              className="icon icon-close"
              onClick={() => setIsSideBarOpen(false)}
            />
          </li>
        </ul>
      </div>
      <div className="chat-sidebar">
        <Button className="go-back" onClick={goBack}>
          <i className="icon-long-right-arrow" /> Go Back
        </Button>
        <div className="profile-card-section">
          {conversations.map((item: any, index: any) => {
            const loopUser = getUserDetail(item.participants, item.direct);
            const chatTitle = getChatTitle(item, loopUser);
            const chatPhoto =
              item.direct && loopUser.first_name ? loopUser.photo : profile;
            const { lastMessage, timestamp } = getLastMessageAndTime(item);
            return (
              <div
                key={index}
                className={
                  activeUId === item.uuid
                    ? 'profile-card d-flex active2'
                    : 'profile-card d-flex'
                }
                onClick={() => {
                  newConversations(item.uuid);
                  props.setIsSideBarOpen(false);
                }}
              >
                <div className="chatPhoto">
                  <img src={chatPhoto} />
                  <span className="active-dot"></span>
                </div>
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h2 title={chatTitle}>{chatTitle}</h2>
                    <p className="time">
                      {timestamp && <Moment calendar={calendar}>{timestamp}</Moment>}
                    </p>
                  </div>
                  <p className="last-message" title={lastMessage}>{lastMessage}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

class SideBar extends React.Component<IProps, IState> {
  readonly state: IState = {
    menu: this.props.menu,
    user: JSON.parse(JSON.stringify(localStorage.getItem('userData'))),
  };
  constructor(props: any) {
    super(props);
  }
  componentWillMount() {
    this.props.getProfile();
    this.props.getNotification();
    setInterval(() => {
      this.props.getNotification();
    }, 1000 * 60);
  }

  componentDidUpdate(preProps: IProps) {
    if (preProps.router != this.props.router) {
      let matched = false;
      const menu = this.state.menu.map((item, i) => {
        item.hasChild &&
          item.child.forEach((childItem: any) => {
            if (!matched) {
              matched = childItem.route == this.props.router.location.pathname;
            }
          });
        if (!matched) {
          item.isOpened = false;
        }
        return item;
      });
      this.setState({ menu });
    }
  }

  newConversations = (uuid: string) => {
    this.props.history.push(
      `${this.props.history.location.pathname}?uuid=${uuid}`
    );
  };

  getCurrentMessageUUID = () => {
    const {
      location: { search },
    } = this.props.history;
    const uuid = new URLSearchParams(search).get('uuid');
    return uuid;
  };

  goBack = () => {
    this.props.history.goBack();
  };

  checkEmail(userName: any) {
    if (userName) {
      const tempEmail = userName.replace('-loop-', '@').slice(0, -15);
      return tempEmail;
    }
    return false;
  }

  getUserDetail = (participants: any, direct: boolean) => {
    const { myNetworkList, voxUserList, voxUserCurrentUser } = this.props;
    if (participants) {
      const participantsInfo = participants.map((item: any) => {
        const findUser = voxUserList.find(
          (subItem: any) => item.userId === subItem.userId
        );
        const userEmail =
          findUser && findUser.userName && this.checkEmail(findUser.userName);
        if (userEmail && myNetworkList) {
          const info = myNetworkList.find(
            (item: any) => item.email === userEmail
          );
          return {
            ...item,
            first_name: (info && info.first_name) || null,
            last_name: (info && info.last_name) || null,
            photo: (info && info.photo) || null,
            email: (info && info.email) || userEmail,
          };
        }
        return item;
      });
      if (voxUserCurrentUser && direct) {
        return participantsInfo.find(
          (item: any) => item.userId !== voxUserCurrentUser.userId
        );
      } else if (voxUserCurrentUser) {
        return participantsInfo.filter(
          (item: any) => item.userId !== voxUserCurrentUser.userId
        );
      }
      return participantsInfo;
    }
    return participants;
  };

  navToggle = () => this.props.setIsSideBarOpen(false);

  setMenuChange = (menu: any[]) => this.setState({ menu: [...menu] });

  isSettingItemMatched = (menuIndex: number, path?: string): boolean => {
    let matched = false;
    const menu = this.state.menu;

    if (path) {
      matched = path == this.props.router.location.pathname;
    } else {
      menu[menuIndex].hasChild &&
        menu[menuIndex].child.forEach((item: any) => {
          if (!matched) {
            matched = item.route == this.props.router.location.pathname;
          }
        });
    }
    if (matched && !menu[menuIndex].isOpened) {
      menu[menuIndex].onClick();
      this.setMenuChange(menu);
    }
    return matched;
  };

  logOut = () => {
    localStorage.clear();
    voxService.get().disconnect();
    this.props.history.push('/sign-in');
  };

  render() {
    const { menu, user } = this.state;
    const { userDetail = {}, isSideBarOpen, setIsSideBarOpen } = this.props;

    const activeUId = this.getCurrentMessageUUID();

    return (
      <>
        {window.location.hash.split('/')[3] != 'virtual-sessions' && (
          <div
            className={
              isSideBarOpen
                ? 'sidebar mobile-sidebar'
                : 'sidebar mobile-sidebar2'
            }
          >
            <Link to={'/'}>
              <img src={logo} alt="logo" className="logo" />
            </Link>
            {window.location.hash.split('/')[2] != 'chat' && (
              <>
                <div className="mobile mobile-menu-icon">
                  <ul>
                    <Notification {...this.props} />
                    <li>
                      <i
                        className="icon icon-close"
                        onClick={() => setIsSideBarOpen(false)}
                      />
                    </li>
                  </ul>
                </div>
                {window.location.hash.split('/')[1] === 'discovery' && (
                  <>
                    <Link
                      to={
                        userDetail.first_name == null
                          ? '/hub/edit-profile'
                          : '/hub/view-profile'
                      }
                      onClick={event => {
                        event.stopPropagation();
                        this.navToggle();
                      }}
                    >
                      <div className="profile-section d-flex">
                        <div className="proifleImg">
                          <img
                            src={userDetail.photo || profile}
                            alt="profile"
                          />
                        </div>
                        <div className="profileText">
                          <div className="mobile-online">
                            <p className="status">
                              {userDetail && userDetail.online == '1'
                                ? 'ONLINE'
                                : 'OFFLINE'}
                            </p>
                            <h2>
                              {userDetail && userDetail.first_name}{' '}
                              {userDetail && userDetail.last_name}
                            </h2>
                          </div>
                          <p className="designation">
                            {userDetail.expertise &&
                              Array.isArray(userDetail.expertise) &&
                              userDetail.expertise
                                .map((item: any) => item && item.name)
                                .join(' | ')}
                          </p>
                        </div>
                      </div>
                      <div className=" discover-text">
                        <i className="icon icon-discover" />
                        <h1 className="mobile">Discover</h1>
                      </div>
                    </Link>
                  </>
                )}
                {window.location.hash.split('/')[1] === 'hub' && (
                  <Link
                    to={
                      userDetail.first_name == null
                        ? '/hub/edit-profile'
                        : '/hub/view-profile'
                    }
                    onClick={event => {
                      event.stopPropagation();
                      this.navToggle();
                    }}
                  >
                    <div className="profile-section d-flex">
                      <div className="proifleImg">
                        <img
                          src={(userDetail && userDetail.photo) || profile}
                          alt="profile"
                        />
                      </div>
                      <div className="profileText">
                        <div className="mobile-online">
                          <p className="status">
                            {userDetail && userDetail.online == '1'
                              ? 'ONLINE'
                              : 'OFFLINE'}
                          </p>
                          <h2>
                            {userDetail && userDetail.first_name}{' '}
                            {userDetail && userDetail.last_name}
                          </h2>
                        </div>
                        <p className="designation">
                          {userDetail.expertise &&
                            Array.isArray(userDetail.expertise) &&
                            userDetail.expertise
                              .map((item: any) => item && item.name)
                              .join(' | ')}
                        </p>
                      </div>
                    </div>
                    <div className=" discover-text">
                      <i className="icon icon-hub" />
                      <h1 className="mobile">Hub</h1>
                    </div>
                  </Link>
                )}

                <Nav className="sideNav">
                  {menu.map((navItem, i) => {
                    if (!navItem.hasChild) {
                      return (
                        <li
                          key={i}
                          onClick={event => {
                            event.stopPropagation();
                            this.navToggle();
                          }}
                        >
                          <NavLink to={navItem.route}>
                            <i className={navItem.className} />
                            {navItem.title}
                          </NavLink>
                        </li>
                      );
                    } else {
                      this.isSettingItemMatched(i);
                      return (
                        <>
                          <li>
                            <div
                              className={
                                navItem.isOpened
                                  ? 'settings-link active'
                                  : 'settings-link'
                              }
                            >
                              <div
                                className="setting-dropdown"
                                onClick={() => {
                                  if (navItem.onClick) {
                                    let s = navItem.onClick();
                                    this.setMenuChange(s);
                                  }
                                }}
                              >
                                <i className={navItem.className} />
                                <p className="mb-0">{navItem.title} </p>
                                {navItem.isOpened && (
                                  <i className="icon-caret-up" />
                                )}
                                {!navItem.isOpened && (
                                  <i className="icon-sort-down" />
                                )}
                              </div>

                              {navItem.isOpened && navItem.child ? (
                                navItem.child.map((childNavItem: any) => (
                                  <li
                                    onClick={event => {
                                      event.stopPropagation();
                                      this.navToggle();
                                    }}
                                  >
                                    <NavLink to={childNavItem.route}>
                                      <div className="filter-section">
                                        <input
                                          type="radio"
                                          id="test1"
                                          checked={this.isSettingItemMatched(
                                            i,
                                            childNavItem.route
                                          )}
                                          name="radio-group"
                                        />
                                        <label htmlFor="test1">
                                          <i
                                            className={childNavItem.className}
                                            onClick={event => {
                                              event.stopPropagation();
                                              this.props.setIsSideBarOpen(
                                                false
                                              );
                                            }}
                                          />
                                          {childNavItem.title}
                                        </label>
                                      </div>
                                    </NavLink>
                                  </li>
                                ))
                              ) : (
                                <></>
                              )}
                            </div>
                          </li>
                        </>
                      );
                    }
                  })}
                </Nav>
                {window.location.hash.split('/')[1] === 'discovery' && (
                  <div className="text-center sidebar-bottom">
                    <Link
                      to="/discovery/feeling-random"
                      onClick={event => {
                        event.stopPropagation();
                        this.navToggle();
                      }}
                    >
                      <Button className="button-btnGradiant feeling-random">
                        <i className="icon icon-random" /> Feeling Random
                      </Button>
                    </Link>
                    <Nav className="sideNav mobile">
                      <li className="border-0" onClick={this.logOut}>
                        <a>
                          <i className="icon icon-download-right" /> Sign Out
                        </a>
                      </li>
                    </Nav>
                  </div>
                )}
              </>
            )}

            {this.props.history.location.pathname ===
              '/hub/chat/collaborators-chat' && (
              <ConversationList
                goBack={this.goBack}
                getUserDetail={this.getUserDetail}
                activeUId={activeUId}
                newConversations={this.newConversations}
                {...this.props}
              />
            )}
            {window.location.hash.split('/')[3] != 'virtual-sessions' && (
              <AuthFooter />
            )}
          </div>
        )}
        {window.location.hash.split('/')[3] === 'virtual-sessions' && (
          <div
            className={
              isSideBarOpen
                ? 'sidebar mobile-sidebar VirtualSidebar'
                : 'sidebar mobile-sidebar2 VirtualSidebar'
            }
          >
            <Link to={'/'}>
              <img src={logo} alt="logo" className="logo" />
            </Link>
            <div className="mobile mobile-menu-icon">
              <ul>
                <Notification {...this.props} />
                <li>
                  <i
                    className="icon icon-close"
                    onClick={() => setIsSideBarOpen(false)}
                  />
                </li>
              </ul>
            </div>
            <Chat />
          </div>
        )}
      </>
    );
  }
}

interface IUser {
  [key: string]: string;
}

interface RootState {
  router: object;
}

const mapStateToProps = (state: any) => {
  return {
    router: state.router,
    userDetail: state.user.profile,
    notifications: state.user.notification,
    conversations:
      (!_.isEmpty(state.user.vox_users) &&
        state.user.vox_users.conversations) ||
      [],
    conversationHistory:
      (!_.isEmpty(state.user.vox_users) && state.user.conversationHistory) ||
      [],
    myNetworkList: state.network.myNetwork || [],
    voxUserList:
      (state.user && state.user.vox_users && state.user.vox_users.users) || [],
    voxUserCurrentUser:
      (state.user &&
        state.user.vox_users &&
        state.user.vox_users.currentUser) ||
      {},
  };
};

export default connect(
  mapStateToProps,
  { getProfile, getNotification }
)(SideBar);
