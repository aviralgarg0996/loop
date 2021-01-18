import React  from 'react';
import { Nav } from 'reactstrap';
import './MobileFooter.scss'
import { Link } from 'react-router-dom';
import YourNetwork from '../your_network/YourNetwork';
interface State {
    network: boolean;
 }
 class MobileFooter extends React.Component<{}, State> { 
    readonly state : State = { network: false}
    constructor(props: any){
        super(props)
    }
    toggleNetwork = () => {
        this.setState({ network : !this.state.network});
    };

    render () {
        const { network } =  this.state;
    return(
        <>
       <Nav className="mobile-footer mobile">
       <li className={window.location.hash.split('/')[1] === 'discovery' ? 'active' : '' }>
            <Link to='/discovery'><i className="icon icon-discover"></i> Discover</Link>
        </li>
       <li className={window.location.hash.split('/')[1] === 'hub' && window.location.hash !== '#/hub/create-project' ? 'active' : '' }>
        <Link to='/hub'><i className="icon icon-hub"></i> Hub</Link>
       </li>
       <li onClick={this.toggleNetwork}>
        <a><i className="icon icon-network"></i> My Network</a>
        </li>
       <li className={window.location.hash === '#/hub/create-project' ? 'active' : '' }>
       <Link to='/hub/create-project'><i className="icon icon-plus-square"></i> Create</Link>
           </li>
   </Nav>
   {network && <YourNetwork toggleNetwork={this.toggleNetwork}  network={network}/>}
   </>
    )
}
 }

export default  MobileFooter;