import React, { useState }  from 'react';
import { Row, Button } from 'reactstrap';
import './discovery.scss'
import 'react-multi-carousel/lib/styles.css';  
import { match, Switch, Route, Redirect } from 'react-router-dom';
import SideBar from '../../features/dashboard/common/side_bar/SideBar';
import HeaderDashboard from '../../features/dashboard/common/header_dashboard/HeaderDashboard';
import MobileFooter from '../../features/dashboard/common/mobile_footer/MobileFooter'; 
import Recommended from '../../features/dashboard/discovery/recommended_page/Recommended';
import HomePage from '../../features/dashboard/discovery/home_page/HomePage';
import Genre from '../../features/dashboard/discovery/genre_page/Genre';
import Expertise from '../../features/dashboard/discovery/expertise_page/Expertise';
import RecentlyJoined from '../../features/dashboard/discovery/recently_joined_page/RecentlyJoined';
import Location from '../../features/dashboard/discovery/location/Location';
import Trending from '../../features/dashboard/discovery/trending/Trending';
import ViewProfile from '../../features/dashboard/view_profile/ViewProfile';
import Navigation from '../../utils/nav';
import FeelingRandom from '../../features/dashboard/feeling_random/FeelingRandom';
import YourNetwork from '../../features/dashboard/common/your_network/YourNetwork';
import { getPath } from '../../router-paths';
import { History } from 'history';
import MyNetworkPage from '../../features/dashboard/hub/mynetwork_page/MyNetworkPage';
import FooterDashboard from '../../features/dashboard/common/footer_dahboard/FooterDashboard';

interface IProps {
    renderActionsMenu?: () => JSX.Element;
    headerType?: number,
    match: any; 
    history: History
};
  

const Discovery = ({match, history}: IProps) => {  
    const [network, setNetwork] = useState(false);
    
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const toggleNetwork = () => {
        setNetwork(!network)
      };
    const isAuthenticated = () => {
        return localStorage.getItem("token");
    };

    if (!isAuthenticated()){
        history.push('/home')
    }

    return (
        <div className={window.location.hash.split('/')[2] === 'feeling-random' ? 'dashboard feeling-dashboard' : 'dashboard'}>
            <Row className="m-0 hash-row">
                <SideBar history={history} isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen}  menu={Navigation.DISCOVERY} />
                <div className="right-section">
                    <HeaderDashboard history={history}  isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen}/>
                    <div className="dashboard-inner">
                        <Switch>
                            <Route exact path={`${match.path}`} component={HomePage}>
                                { isAuthenticated() ? <Redirect to={`${match.path}/home`} /> : <Redirect to={getPath('home')} /> }
                            </Route>
                            <Route path={`${match.path}/home`} component={HomePage}  />
                            <Route path={`${match.path}/recommended`} component={Recommended}  />
                            <Route path={`${match.path}/genre`} component={Genre}  />
                            <Route path={`${match.path}/expertise`} component={Expertise}  />
                            <Route path={`${match.path}/recent`} component={RecentlyJoined}  />
                            <Route path={`${match.path}/location`} component={Location}  />
                            <Route path={`${match.path}/trending`} component={Trending}  />
                            {/* <Route path={`hub/my-network`} component={MyNetworkPage}  /> */}
                            <Route path={`${match.path}/view-profile/:id`} component={ViewProfile}  />
                            <Route path={`${match.path}/feeling-random`} component={FeelingRandom}  />
                        </Switch>
                        <FooterDashboard />
                     </div>
                </div>
            </Row>
            <Button className="network-btn"  onClick={toggleNetwork}>
                <i className="icon icon-network"></i>
            </Button>
            {network && <YourNetwork toggleNetwork={toggleNetwork}  network={network}/>}
            
            <MobileFooter />
        </div>
    )
}

export default Discovery;