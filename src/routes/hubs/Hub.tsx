import React  from 'react';
import { Row } from 'reactstrap';
import './hub.scss'
import 'react-multi-carousel/lib/styles.css';  
import { match, Switch, Route, Redirect } from 'react-router-dom';
 import SideBar from '../../features/dashboard/common/side_bar/SideBar';
import HeaderDashboard from '../../features/dashboard/common/header_dashboard/HeaderDashboard';
import MobileFooter from '../../features/dashboard/common/mobile_footer/MobileFooter';  
import HomePage from '../../features/dashboard/hub/home_page/HomePage'; 
import ViewProfile from '../../features/dashboard/hub/view_profile/ViewProfile';
import EditProfile from '../../features/dashboard/hub/edit-profile/EditProfile';
import Navigation from '../../utils/nav';
import CreateProject from '../../features/dashboard/hub/create_project/CreateProject';
import StudioPage from '../../features/dashboard/hub/studio_page/StudioPage';
import MyNetworkPage from '../../features/dashboard/hub/mynetwork_page/MyNetworkPage';
import Project from '../../features/dashboard/hub/project/Project';
import TermsCondition from '../../features/dashboard/hub/terms_condition/TermsCondition';
import PrivacyPolicy from '../../features/dashboard/hub/privacy_policy/PrivacyPolicy';
import TermService from '../../features/dashboard/hub/terms_service/TermService';
import { connect } from 'react-redux';
import CollaboratorsChat from '../../features/dashboard/hub/collaborators_chat/CollaboratorsChat';
import VirtualSessions from '../../features/dashboard/hub/virtual_sessions/VirtualSessions';
import { getPath } from '../../router-paths';

import { History } from 'history';

interface IProps {
    history: History;
     match: match<{ name?: string }>; 
     router?: any
};

interface IState {
    isSideBarOpen: boolean;
    isAuthenticated?: string | null
};

class Hub extends React.Component<IProps, IState> {  
   readonly state: IState = {isSideBarOpen: false};

   constructor(props: any){
       super(props);
   }

   componentWillMount(){
    const isAuthenticated = localStorage.getItem("token");
    this.setState({isAuthenticated});
    if (!this.isAuthenticated()){
        this.props.history.push('/home');
    }
   }

    setIsSideBarOpen = () => {
        this.setState({ isSideBarOpen: !this.state.isSideBarOpen })
    }

       isAuthenticated = () => {
        return localStorage.getItem("token");
    };

    
    render(){ 
        const { isSideBarOpen, isAuthenticated } = this.state;
        const { match, history } = this.props; 
         
        return (
            <div className="dashboard">
                <Row className="m-0 hash-row">
                    <SideBar history={history} isSideBarOpen={isSideBarOpen} setIsSideBarOpen={this.setIsSideBarOpen}  menu={Navigation.HUB} />
                    <div className={window.location.hash.split('/')[3] === 'virtual-sessions' ? 'right-section virtual-right-section': 'right-section'} >
                        <HeaderDashboard history={history} isSideBarOpen={isSideBarOpen} setIsSideBarOpen={this.setIsSideBarOpen}/>
                        <div className="dashboard-inner">
                            <Switch>
                                <Route exact path={`${match.path}`} render={HomePage}>
                                { this.isAuthenticated() ? <Redirect to={`${match.path}/home`} /> : <Redirect to={getPath('home')} /> }
                                </Route>
                                <Route path={`${match.path}/home`} component={HomePage}  />   
                                <Route path={`${match.path}/view-profile`} component={ViewProfile}  />
                                <Route path={`${match.path}/edit-profile`} component={EditProfile}  />
                                <Route path={`${match.path}/edit-project/:id`} component={CreateProject} exact />
                                <Route path={`${match.path}/create-project`} component={CreateProject}  />
                                <Route path={`${match.path}/studio`} render={StudioPage}  />
                                <Route path={`${match.path}/my-network`} component={MyNetworkPage}  />
                                <Route path={`${match.path}/settings/terms-and-condition`} component={TermsCondition}  />
                                <Route path={`${match.path}/settings/privacy-policy`} component={PrivacyPolicy}  />
                                <Route path={`${match.path}/settings/terms-services`} component={TermService}  />
                                <Route path={`${match.path}/project/:id`} component={Project}  />
                                <Route path={`${match.path}/chat/collaborators-chat`} component={CollaboratorsChat}  />
                                <Route path={`${match.path}/chat/virtual-sessions`} component={VirtualSessions}  />

                            </Switch>
                        </div>
                    </div>
                </Row>
                {/* <Button className="network-btn">
                    <i className="icon icon-network"></i>
                </Button> */}
               {window.location.hash.split('/')[2] != 'chat' && <MobileFooter /> } 
            </div>
        )
    }
}


interface RootState {
    router: object
}

const mapStateToProps = ( state: RootState ) => {
    return { router: state.router}
}

export default  connect(mapStateToProps, {} )(Hub);