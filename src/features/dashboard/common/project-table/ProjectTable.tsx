import React, { useState, useEffect } from 'react';
import './ProjectTable.scss';
import {
  Table,
  Button,
  Card,
  CardBody,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  ButtonDropdown,
  DropdownItem,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import emma from '../../../../assets/images/emma.png';
import audioProfile from '../../../../assets/images/audioProfile.png';
import audio1 from '../../../../assets/images/audio1.png';
import YourNetwork from '../your_network/YourNetwork';
import {
  getProjects,
  projectDelete,
  projectAddAsArchive, 
  projectRemoveArchive,
} from '../../../../redux/project/action';
import { myNetwork, removeNetwork } from '../../../../redux/network/action';
import { discoverMyNetworkData } from '../../../../redux/discovery/action';
import util from '../../../../utils/Util';
import { connect } from 'react-redux';
import { parseInt } from 'lodash';
import { History } from 'history';
import { createConversation } from '../../../../redux/user/action';
import _ from 'lodash';

const HubHeader = (hubPage: any, titlesDataMyNet: any) => {
  const user = JSON.parse(JSON.stringify(localStorage.getItem('userData')));
  let parsedUser: any = {};
  if (user) {
    parsedUser = JSON.parse(user);
  }
  const handleChange = (event: any, type: string) => {
    hubPage.onfilterKeyChanged &&
      hubPage.onfilterKeyChanged(type, event.target.checked);
  };
  const myDate = new Date();
  const hrs = myDate.getHours();
 
  

  const data = hubPage && hubPage.titlesDataMyNet
  const title = !_.isEmpty(data) && _.toArray(data).find(element => element.place === 'title')
  const description = !_.isEmpty(data) && _.toArray(data).find(element => element.place === 'description')
  
  return (
    <>
      <div className="top-head">
        <div>
          <h1>
            {hubPage.hubPage === 'home' &&
              `${hrs < 12 ? 'Good Morning' : (hrs >= 12 && hrs <= 17) ? 'Good Afternoon' : (hrs >= 17 && hrs <= 24) ? 'Good Evening' : null }, ${parsedUser.first_name || ''}`}
            {hubPage.hubPage === 'studio' && 'Studio'}
            {hubPage.hubPage === 'myNetwork' && title && title.text}
          </h1>
          <p>
            {hubPage.hubPage === 'home' && 'Your Hub Dashboard'}
            {hubPage.hubPage === 'studio' &&
              'All of your projects, current and archived'}
            {hubPage.hubPage === 'myNetwork' && description && description.text}
          </p>
        </div>
        <div className="search-field">
          <input
            type="text"
            placeholder="Search"
            onChange={(event: any) => {
              hubPage.onSearch && hubPage.onSearch(event.target.value);
            }}
          />
          <i className="icon icon-search" />
        </div>
      </div>

      {hubPage.hubPage != 'myNetwork' && (
        <div className="sub-header">
          <h2>
            {hubPage.hubPage === 'home' && 'Current Projects'}
            {hubPage.hubPage === 'studio' && 'All Projects'}
            {hubPage.hubPage === 'myNetwork' && 'Studio'}
          </h2>
          {hubPage.hubPage === 'studio' && (
            <div className="filter-section">
              <p>
                <input
                  type="radio"
                  id="test1"
                  name="all"
                  defaultChecked
                  onChange={(event: any) => handleChange(event, 'all')}
                />
                <label htmlFor="test1">All</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="test2"
                  name="all"
                  onChange={(event: any) => handleChange(event, 'current')}
                />
                <label htmlFor="test2">Current</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="test3"
                  name="all"
                  onChange={(event: any) => handleChange(event, 'archived')}
                />
                <label htmlFor="test3">Archive</label>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

type DropDownCustomProps = {
  update: any;
  index: any;
  item: any;
  defaultOpen: any;
  setDefaultOpen: any;
  userinfo?: any;
  historyProp?:any;
  removeNetwork?:any;
  myNetwork?:any;
};

const DropDownCustom = ({
  update,
  index,
  item,
  defaultOpen,
  setDefaultOpen,
}: DropDownCustomProps) => {
  const toggle = () => {
    setDefaultOpen({
      [index]: !defaultOpen[index] ? true : false,
    });
  };
  return (
    <ButtonDropdown isOpen={defaultOpen[index]} onClick={toggle}>
      <DropdownToggle aria-expanded={defaultOpen[index]}>
        <i
          className={
            defaultOpen[index]
              ? 'icon icon-ellipsis-v color-green'
              : 'icon icon-ellipsis-v'
          }
        />
      </DropdownToggle>
      <DropdownMenu
        className="suMenuDropdown"
        style={{ background: '#2a2a2a' }}
      >
        {item.status === 'current' ? (
          <DropdownItem onClick={() => update(index, false)}>
            Archive
          </DropdownItem>
        ) : (
          <DropdownItem onClick={() => update(index, false)}>
            Current
          </DropdownItem>
        )}
        <DropdownItem onClick={() => update(index, true)}>Delete</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

const DropDownCustomMyNetwork = ({
  update,
  index,
  item,
  defaultOpen,
  setDefaultOpen,
  userinfo,
  historyProp,
  removeNetwork,
  myNetwork
}: DropDownCustomProps) => {
  const [removeNetwork1, setRemoveNetwork] = React.useState(false);
  const toggle = () => {
    setDefaultOpen({
      [index]: !defaultOpen[index] ? true : false,
    });
  };

  const createNewConversation = () => {
    createConversation({
      type: 'direct',
      title: item.first_name
        ? `${item.first_name} ${item.last_name}`
        : item.email,
      desc: '',
      usersId: userinfo && userinfo.userId,
      isPublic: true,
      isUber: true,
      avatar: '',
    });
  };

  const backToDiscover = () => {
    historyProp.push('/discover');
  };

  const removeFromNetwork = () => {
    removeNetwork(item.user_id).then((data: any) => {
      myNetwork()
      setRemoveNetwork(!removeNetwork1)
    });
  };

  return (
    <React.Fragment>
      <ButtonDropdown isOpen={defaultOpen[index]} onClick={toggle}>
        <DropdownToggle aria-expanded={defaultOpen[index]}>
          <i
            className={
              defaultOpen[index]
                ? 'icon icon-ellipsis-v color-green'
                : 'icon icon-ellipsis-v'
            }
          />
        </DropdownToggle>
        <DropdownMenu
          className="suMenuDropdown suMenuDropdownMyNetwork"
          style={{ background: '#2a2a2a' }}
        >
          <DropdownItem onClick={()=>removeFromNetwork()}>
            Remove from
            Network
          </DropdownItem>
          {userinfo && userinfo.userId && (
            <DropdownItem onClick={() => createNewConversation()}>
              Chat
            </DropdownItem>
          )}
        </DropdownMenu>
      </ButtonDropdown>
      <Modal
        isOpen={removeNetwork1}
        toggle={()=>setRemoveNetwork(!removeNetwork1)}
        className="add-to-netwok-modal"
      >
        <ModalHeader toggle={()=>setRemoveNetwork(!removeNetwork1)}> </ModalHeader>
        <ModalBody>
          <h2>
            {`${item.first_name || ''} ${item.last_name || ''}`} has been
            removed from your network
          </h2>
          <img src={item.photo || emma} />
          <h1>{`${item.first_name || ''} ${item.last_name || ''}`}</h1>
          <p>
            {item.expertise &&
              item.expertise
                .map((item: any) => item && item.name)
                .join(' | ')}
          </p>
          <Button
            className="button-btnGradiant chat-btn"
            onClick={backToDiscover}
          >
            <i className="icon icon-comments" /> Back to Discover
          </Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

const DesktopView = (hubPage: {
  voxUser: any[];
  onOptionClicked: (id: string, isDelete: boolean, isArchive: boolean) => void;
  onClickItem: (type: string, data: any, option?: string | undefined) => void;
  filterType: string;
  hubPage: string;
  projectList: any[];
  networkList: any[];
  historyProp: any;
  removeNetwork: any;
  myNetwork: any;
}) => {
  const projectList =
    hubPage.hubPage == 'studio' && hubPage.filterType != 'all'
      ? hubPage.projectList.filter((item: any) => {
          return item.status == hubPage.filterType;
        })
      : hubPage.projectList;

  const [defaultOpen, setDefaultOpen] = useState({});
  const update = (index: number, isDelete: boolean) => {
    hubPage.onOptionClicked(
      projectList[index].project_id,
      isDelete,
      projectList[index].status != 'current'
    );
  };

  return (
    <div>
      <Table className="project-table">
        <thead>
          {hubPage.hubPage != 'myNetwork' && (
            <tr>
              <th>TITLE</th>
              <th>COLLABORATORS</th>
              {hubPage.hubPage === 'studio' && <th>CREATED</th>}
              <th>LAST OPENED</th>
              {hubPage.hubPage === 'studio' && <th>STATUS</th>}
              <th />
            </tr>
          )}
          {hubPage.hubPage === 'myNetwork' && (
            <tr>
              <th>NAME</th>
              <th>SKILL</th>
              <th>GENRE</th>
              <th>HOME</th>
              <th>UPCOMING TRIPS</th>
              <th>STATUS</th>
              <th />
            </tr>
          )}
        </thead>
        <tbody>
          {hubPage.hubPage != 'myNetwork' && (
            <>
              {projectList &&
                projectList.map((item, index) => (
                  <tr
                    onClick={() => {
                      hubPage.onClickItem(ACTION_TYPE.PROJECT, item, undefined);
                    }}
                  >
                    <td>
                      <div className="d-flex title-td">
                        <img src={item.cover_image} />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex  colblab-td">
                        {item.collaborator &&
                          Array.isArray(item.collaborator) &&
                          item.collaborator.map((mem: any) => {
                            return <img src={mem.image || audio1} />;
                          })}
                        <span>{`${item.collaborator.length} Collaborator${
                          item.collaborator.length > 1 ? 's' : ''
                        }`}</span>
                      </div>
                    </td>
                    {hubPage.hubPage === 'studio' && (
                      <td>{util.getFormattedDate(item.created_at)}</td>
                    )}
                    <td>{util.getFormattedDate(item.last_updated_time)}</td>
                    {hubPage.hubPage === 'studio' && <td>{item.status}</td>}

                    <td
                      onClick={e => e.stopPropagation()}
                      className="table-dropdown"
                    >
                      <DropDownCustom
                        update={update}
                        index={index}
                        item={item}
                        defaultOpen={defaultOpen}
                        setDefaultOpen={setDefaultOpen}
                      />
                    </td>
                  </tr>
                ))}
            </>
          )}

          {/* network row */}
          {hubPage.hubPage === 'myNetwork' && (
            <>
              {hubPage.networkList &&
                hubPage.networkList.map((item: any, index: any) => {
                  const userName = `${item.email.replace(
                    '@',
                    '-loop-'
                  )}@loop.cocoworth`;
                  const userinfo = hubPage.voxUser.find(
                    (item: any) => item.userName === userName
                  );
                  return (
                    <tr
                      onClick={() => {
                        hubPage.onClickItem(
                          ACTION_TYPE.NETWORK,
                          item,
                          undefined
                        );
                      }}
                    >
                      <td>
                        <div className="d-flex title-td">
                          <img src={item.photo || audio1} />
                          <span>{`${item.first_name || ''} ${item.last_name ||
                            ''}`}</span>
                        </div>
                      </td>
                      <td>
                        {item.expertise &&
                          item.expertise[0] &&
                          item.expertise[0].name}
                      </td>
                      <td>
                        {item.genre && item.genre[0] && item.genre[0].name}
                      </td>
                      <td>{item.location && item.location.location}</td>
                      <td>
                        <div className="d-flex">
                          {item.trip.map((el: any, i: any) => {
                            return (
                              <>
                                <span>{el.trip} </span>
                                {el.trip && item.trip.length - 1 !== i && (
                                  <i className="icon-long-right-arrow" />
                                )}
                              </>
                            );
                          })}
                        </div>
                      </td>
                      <td>
                        {userinfo && userinfo.online ? (
                          <span className="status-custom online">Online</span>
                        ) : (
                          <span className="status-custom offline">
                            Offiline
                          </span>
                        )}
                      </td>
                      <td
                        onClick={e => e.stopPropagation()}
                        className="table-dropdown"
                      >
                        <DropDownCustomMyNetwork
                          update={update}
                          index={index}
                          item={item}
                          defaultOpen={defaultOpen}
                          setDefaultOpen={setDefaultOpen}
                          userinfo={userinfo}
                          historyProp={hubPage.historyProp}
                          removeNetwork={hubPage.removeNetwork}
                          myNetwork={hubPage.myNetwork}
                        />
                      </td>
                    </tr>
                  );
                })}
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
};

const MobileView = (hubPage: {
  onOptionClicked: (id: string, isDelete: boolean, isArchive: boolean) => void;
  onClickItem: (type: string, data: any, option?: string | undefined) => void;
  filterType: string;
  hubPage: string;
  projectList: any[];
  networkList: any[];
}) => {
  const projectList =
    hubPage.hubPage == 'studio' && hubPage.filterType != 'all'
      ? hubPage.projectList.filter((item: any) => {
          return item.status == hubPage.filterType;
        })
      : hubPage.projectList;

  const renderItem = (index: number, list: any[], type: string) => {
    let item1 = list[index * 2];
    let item2 = list[index * 2 + 1];

    return (
      <Row>
        {item1 ? (
          type == 'home' ? (
            RenderHomeCard(item1, index)
          ) : type == 'studio' ? (
            RenderStudioCard(item1, index)
          ) : type == 'myNetwork' ? (
            RenderConnectionCard(item1, index)
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {item2 ? (
          type == 'home' ? (
            RenderHomeCard(item2, index)
          ) : type == 'studio' ? (
            RenderStudioCard(item2, index)
          ) : type == 'myNetwork' ? (
            RenderConnectionCard(item2, index)
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Row>
    );
  };

  const RenderHomeCard = (item: any, index: any) => {

    const [defaultOpen, setDefaultOpen] = useState({});
    const update = (index: number, isDelete: boolean) => {
      hubPage.onOptionClicked(
        projectList[index].project_id,
        isDelete,
        projectList[index].status != 'current'
      );
    };

    return (
      <Col
        className="col-md-6"
        onClick={() => {
          hubPage.onClickItem(ACTION_TYPE.PROJECT, item, undefined);
        }}
      >
        <Card className="p-0">
          <img src={item.cover_image || audioProfile} className="w-100" />
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <p>TITLE</p>
                <p>{item.name}</p>
                <p>COLLABORATORS</p>
                <p>
                  {`${item.collaborator.length} Collaborator${
                    item.collaborator.length > 1 ? 's' : ''
                  }`}
                </p>
                <p>LAST OPENED</p>
                <p>{util.getFormattedDate(item.created_at)}</p>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                {/* <i className="icon icon-ellipsis-v" /> */}
                <DropDownCustom
                  update={update}
                  index={index}
                  item={item}
                  defaultOpen={defaultOpen}
                  setDefaultOpen={setDefaultOpen}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  };

  const RenderStudioCard = (item: any, index: any) => {
    const [defaultOpen, setDefaultOpen] = useState({});
    const update = (index: number, isDelete: boolean) => {
      hubPage.onOptionClicked(
        projectList[index].project_id,
        isDelete,
        projectList[index].status != 'current'
      );
    };
    return (
      <Col
        className="col-md-6"
        onClick={() => {
          hubPage.onClickItem(ACTION_TYPE.PROJECT, item, undefined);
        }}
      >
        <Card className="p-0">
          <img
            src={item.cover_image || audioProfile}
            className="w-100"
          />
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <p>TITLE</p>
                <p>{item.name}</p>
                <p>COLLABORATORS</p>
                <p>{`${item.collaborator.length} Collaborator${
                  item.collaborator.length > 1 ? 's' : ''
                }`}</p>
                <p>CREATED</p>
                <p>{util.getFormattedDate(item.created_at)}</p>
                <p>LAST OPENED</p>
                <p>{util.getFormattedDate(item.last_updated_time)}</p>
                <p>STATUS</p>
                <p>{item.status}</p>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                {/* <i className="icon icon-ellipsis-v" /> */}
                <DropDownCustom
                  update={update}
                  index={index}
                  item={item}
                  defaultOpen={defaultOpen}
                  setDefaultOpen={setDefaultOpen}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  };

  const RenderConnectionCard = (item: any, index: any) => {
    const [defaultOpen, setDefaultOpen] = useState({});
    const update = (index: number, isDelete: boolean) => {
      hubPage.onOptionClicked(
        projectList[index].project_id,
        isDelete,
        projectList[index].status != 'current'
      );
    };
    return (
      <Col
        className="col-md-6"
        onClick={() =>
          hubPage.onClickItem(ACTION_TYPE.NETWORK, item, undefined)
        }
      >
        <Card className="p-0">
          <img src={item.photo || audioProfile} className="w-100" />
          <CardBody>
            <div className="d-flex justify-content-between">
              <div>
                <p>NAME</p>
                <p>{`${item.first_name || ''} ${item.last_name || ''}`}</p>
                <p>SKILL</p>
                <p>
                  {item.expertise &&
                    item.expertise[0] &&
                    item.expertise[0].name}
                </p>
                <p>GENRE</p>
                <p> {item.genre && item.genre[0] && item.genre[0].name}</p>
                <p>HOME</p>
                <p>{item.location && item.location.location}</p>
                <p>UPCOMING TRIPS</p>
                <p className="d-flex mobile-upcoming">
                  {item.trip.map((el: any, i: any) => {
                    return (
                      <div className="d-flex">
                        <span>{el.trip} </span>
                        {el.trip && item.trip.length - 1 !== i && (
                          <i className="icon-long-right-arrow" />
                        )}
                      </div>
                    );
                  })}
                </p>
                <p>STATUS</p>
                <p>
                  <span className="status-custom">Online</span>
                </p>
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                {/* <i className="icon icon-ellipsis-v" /> */}
                <DropDownCustom
                  update={update}
                  index={index}
                  item={item}
                  defaultOpen={defaultOpen}
                  setDefaultOpen={setDefaultOpen}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  };

  const renderList = () => {
    let result: any = <></>;

    if (hubPage.hubPage == 'home') {
      let count = parseInt(hubPage.projectList.length / 2 + '');
      count += hubPage.projectList.length % 2;
      if (count > 0) {
        result = new Array(count).fill(0).map((item: any, index: number) => {
          return renderItem(index, hubPage.projectList, hubPage.hubPage);
        });
      }
    } else if (hubPage.hubPage == 'studio') {
      let count = parseInt(projectList.length / 2 + '');
      count += projectList.length % 2;
      if (count > 0) {
        result = new Array(count)
          .fill(0)
          .map((item: any, index: number) =>
            renderItem(index, projectList, hubPage.hubPage)
          );
      }
    } else if (hubPage.hubPage == 'myNetwork') {
      let count = parseInt(hubPage.networkList.length / 2 + '');
      count += hubPage.networkList.length % 2;
      if (count > 0) {
        result = new Array(count)
          .fill(0)
          .map((item: any, index: number) =>
            renderItem(index, hubPage.networkList, hubPage.hubPage)
          );
      }
    }
    return <>{result}</>;
  };

  return <div className="mobile-view">{renderList()}</div>;
};

class ProjectTable extends React.Component<IProps, IState> {
  readonly state: IState = {
    network: false,
    mediaState: window.matchMedia('(min-width: 768px)').matches,
    filterType: 'all',
    searchKey: '',
    filteredProjectList: [],
    filteredMyNetworkList: [],
  };

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    this.props.discoverMyNetworkData();
    if (this.props.hubPage == 'home') {
      this.props.getProjects();
    } else if (this.props.hubPage == 'studio') {
      this.props.getProjects();
    } else if (this.props.hubPage == 'myNetwork') {
      this.props.myNetwork();
    }
  }

  toggleNetwork = () => {
    this.setState({ network: !this.state.network });
  };

  componentDidUpdate(props: IProps) {
    if (props.projectList != this.props.projectList) {
      this.onSearch(this.state.searchKey);
    }
    if (props.myNetworkList != this.props.myNetworkList) {
      this.onSearch(this.state.searchKey);
    }
  }

  onMenuClicked = (type: string, data: any, option?: string | undefined) => {
    switch (type) {
      case ACTION_TYPE.NETWORK:
        this.props.history.push(`/discovery/view-profile/${data.user_id}`);
        break;
      case ACTION_TYPE.PROJECT:
        this.props.history.push(`/hub/project/${data.project_id}`);
        break;
      default:
        break;
    }
  };

  onSearch = (searchKey: string) => {
    let { filteredProjectList, filteredMyNetworkList } = this.state;
    let { hubPage, projectList, myNetworkList } = this.props;

    searchKey = searchKey.toLowerCase();
    if (hubPage == 'myNetwork') {
      filteredMyNetworkList = myNetworkList.filter((item: any) =>
        `${item.first_name} ${item.last_name}`.toLowerCase().includes(searchKey)
      );
    } else {
      filteredProjectList = projectList.filter((item: any) =>
        item.name.toLowerCase().includes(searchKey)
      );
    }
    this.setState({ searchKey, filteredProjectList, filteredMyNetworkList });
  };

  update = (id: string, isDelete: boolean, isArchive: boolean) => {
    if (isDelete) {
      this.props.projectDelete(id).then((res: any) => this.props.getProjects());
    } else if (isArchive) {
      this.props
        .projectRemoveArchive(id)
        .then((res: any) => this.props.getProjects());
    } else if (!isArchive) {
      this.props
        .projectAddAsArchive(id)
        .then((res: any) => this.props.getProjects());
    }
  };

  render() {
    let { hubPage, projectList, myNetworkList, voxUser } = this.props;
    const titlesDataMynet = this.props && this.props.myNetworkDataTitle;

    let {
      mediaState,
      network,
      filterType,
      filteredMyNetworkList,
      filteredProjectList,
    } = this.state;
    return (
      <div className="hub-page">
        <HubHeader
          hubPage={hubPage}
          onSearch={this.onSearch}
          onfilterKeyChanged={(type: string, checked: boolean) =>
            this.setState({ filterType: type })
          }
          titlesDataMyNet={titlesDataMynet}

        />

        {mediaState ? (
          <DesktopView
            voxUser={voxUser}
            onOptionClicked={this.update}
            onClickItem={this.onMenuClicked}
            hubPage={hubPage}
            filterType={filterType}
            projectList={filteredProjectList}
            networkList={filteredMyNetworkList}
            historyProp={this.props.history}
            removeNetwork={this.props.removeNetwork}
            myNetwork={this.props.myNetwork}
          />
        ) : (
          <MobileView
            onOptionClicked={this.update}
            hubPage={hubPage}
            onClickItem={this.onMenuClicked}
            filterType={filterType}
            projectList={filteredProjectList}
            networkList={filteredMyNetworkList}
          />
        )}
        <Button className="network-btn" onClick={this.toggleNetwork}>
          <i className="icon icon-network" />
        </Button>
        {network && (
          <YourNetwork toggleNetwork={this.toggleNetwork} network={network} />
        )}
      </div>
    );
  }
}

interface IState {
  mediaState: React.SetStateAction<boolean>;
  network: boolean;
  filterType: string;
  searchKey: string;
  filteredProjectList: any[];
  filteredMyNetworkList: any[];
}

interface IProps {
  hubPage: any;
  projectDelete: (id: string) => Promise<any>;
  projectAddAsArchive: (id: string) => Promise<any>;
  projectRemoveArchive: (id: string) => Promise<any>;
  getProjects: () => Promise<any>;
  myNetwork: () => Promise<any>;
  projectList: any[];
  myNetworkList: any[];
  history: History;
  voxUser: any[];
  removeNetwork: () => Promise<any>;
  discoverMyNetworkData: any;
  myNetworkDataTitle: any;
}

const ACTION_TYPE = {
  NETWORK: 'NETWORK',
  PROJECT: 'PROJECT',
};

const mapStateToProps = (state: any) => {
  return {
    projectList: state.project.projectList || [],
    myNetworkList: state.network.myNetwork || [],
    myNetworkDataTitle: state.discovery.myNetData, 
    voxUser:
      (!_.isEmpty(state.user.vox_users) && state.user.vox_users.users) || [],
  };
};

const mapDispatchToProps = {
  getProjects,
  myNetwork,
  projectDelete,
  projectAddAsArchive,
  projectRemoveArchive,
  removeNetwork,
  discoverMyNetworkData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectTable);
