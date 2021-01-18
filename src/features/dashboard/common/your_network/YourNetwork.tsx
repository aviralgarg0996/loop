import React  from 'react';
import { Card, Button } from 'reactstrap';
import './YourNetwork.scss'
import audio1 from '../../../../assets/images/audio1.png'
import audio2 from '../../../../assets/images/audio2.png'
import audio3 from '../../../../assets/images/audio3.png'
import audio4 from '../../../../assets/images/audio4.png'
import audio5 from '../../../../assets/images/audio5.png'
import { connect } from 'react-redux';
import { myNetwork } from "../../../../redux/network/action";
import { createConversation } from "../../../../redux/user/action";
import _ from 'lodash';
import { Link } from 'react-router-dom';
interface IProps  {
    network: boolean,
    toggleNetwork(): void,
    myNetwork: (showloader: boolean) => Promise<any>,
    myNetworkList: any[],
    voxUser: any[],
}

class YourNetwork extends React.Component<IProps, {}> {
    
    constructor(props: any){
        super(props)
    }

    componentWillMount(){
        this.props.myNetwork(false);
    }

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

    render () {
        let { myNetworkList, voxUser } = this.props;
        return(
            <>
            <div className="background-overlay"  onClick={this.props.toggleNetwork}></div>
            <div className="your-network">
                
            <div className="gradiant-border"></div>
            <div className="your-network-card">
            <div className="head">
                <div>
                    <h1>Your Network</h1>
                    <p>{myNetworkList.length} People</p>
                </div>
                <Link to="/hub/my-network">
                <Button className="arrow-right" onClick={this.props.toggleNetwork}>
                    <i className="icon-arrow-right"></i>
                </Button>
                </Link>
            </div>
            <div className="network-peoples">
            { myNetworkList && myNetworkList.map((item : any) => {
                const userName = `${item.email.replace('@', '-loop-')}@loop.cocoworth`;
                const userinfo = voxUser.find((item: any)=> item.userName === userName);
                return <Card className="audioCard" onClick={()=>this.createNewConversation(userinfo && userinfo.userId, item.first_name ? `${item.first_name} ${item.last_name}` : item.email)}>
                    <div className="d-flex align-items-center">
                        <img src={item.photo || audio1} alt=""  />
                        <div  className="ml-3 networks-name">
                            <h1>{item.first_name ? `${item.first_name} ${item.last_name}` : item.email}</h1>
                            <p>{item.expertise && item.expertise.map((item: any) => item && item.name).join(' | ')}</p>
                        </div>
                    </div>
                    <div>
                    { userinfo && userinfo.online ? <span className="status-custom online">
                        Online
                      </span> : <span className="status-custom offline">
                        Offiline
                      </span>}
                    </div>
                </Card>
            })
                 
            }
            </div>
            </div>
        </div>
        </>
        )
    }
}

const mapStateToProps = (state: any) => {
    return { 
      myNetworkList: state.network.myNetwork || [],
      voxUser: !_.isEmpty(state.user.vox_users) && state.user.vox_users.users || []
    }
  }
  
  const mapDispatchToProps = { 
    myNetwork
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(YourNetwork); 