import React  from 'react';
import { Row, Nav, Col, Button } from 'reactstrap';
import './HeaderDashboard.scss'
import logo from '../../../../assets/images/logo.svg'
import Notification from '../../common/notification/Notification'
import {     Link } from 'react-router-dom';
import { History } from 'history';
import { getNotification, notificationFailure } from '../../../../redux/user/action';
import { connect } from 'react-redux';
import { voxService }  from '../../../../services/voximplant-service/vox.service';

type SideBarProps = {
    history: History,
    isSideBarOpen: boolean,
    setIsSideBarOpen: Function,
    getNotification: () => Promise<any>, 
    notifications: any[]
}
class HeaderDashboard extends React.Component<SideBarProps, {}> {
 
    constructor(props: any){
        super(props);
    }

    componentWillMount(){
        setInterval(()=> {
            this.props.getNotification();
        }, 1000*60)
    }

    logOut = () => {
        localStorage.clear();
        voxService.get().disconnect();
        this.props.history.push('/sign-in');
    }

    render() {
        return (
                <header className="top-header">
                    <Row>
                        <Col sm="6">
                            <Link to={'/'}>
                                <img src={logo} className="mobile logo" />
                            </Link>
                            <Nav className="left-nav">
                            <li className={window.location.hash.split('/')[1] === 'discovery' ? 'active' : '' }>
                                <Link to='/discovery'>
                                    <i className="icon icon-discover"></i> Discover 
                                </Link>
                            </li>
                            <li className={window.location.hash.split('/')[1] === 'hub' ? 'active' : '' }>
                                <Link to='/hub'>
                                    <i className="icon icon-hub"></i> Hub 
                                </Link>
                            </li>
                            
                            </Nav>
                        </Col>
                        <Col sm="6">
                            <Nav className="text-right right-nav">
                                <li>
                                    <Link to="/hub/create-project">
                                        <Button className="create-project-btn"><i className="icon-plus-square"></i> Create a Project</Button> 
                                    </Link>
                                </li>
                                <Notification  {...this.props}/>
                                <li onClick={ this.logOut }><i className="icon icon-share"></i></li>
                                
                                <li className="mobile"><i className="icon icon-bars" onClick={() => this.props.setIsSideBarOpen(true)}></i></li>
                            </Nav>
                        </Col>
                    </Row>
                </header>  
            )
    }
    
} 

let mapStateToProps = (state: any) => {
    return { notifications : state.user.notification}
}

let actionToProps = {
    getNotification
}

export default connect(mapStateToProps, actionToProps )(HeaderDashboard);