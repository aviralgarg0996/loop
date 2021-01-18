import React from 'react';
import './Chat.scss';
// import { Button } from 'reactstrap';
import profile from '../../../../assets/images/profile.png'
import { Button } from 'reactstrap';

class Chat extends React.Component<{}> {
    
    constructor(props: any){
        super(props);
    }

    render() { 
        return(
            <div className="collaboratorsChat virtual-chat-side">

                <Button className="go-back">
                    <span className="icon-long-right-arrow"></span> Go Back
                </Button>
                <div className="collab-profile">
                    <div>
                        <img src={profile} />
                        <img src={profile} />
                        <img src={profile} />
                        <img src={profile} />
                        <img src={profile} />
                    </div>
                    <h1>5 Collaborators</h1>

                </div>
                <div className="chatting-section">
                    <div className="gradiant-chat"></div>
                    <div className="row m-0">
                        <div className="col-md-12 left-chat">
                            <div className="image">
                                <img src={profile} />
                            </div>
                            <div className="message-box ">
                                <p>Odio euismod lacinia at quis risus sed. Congue eu consequat ac felis.</p>
                                <span className="time">13:51</span>
                            </div>
                        </div>
                    </div>
                     
                    <div className="text-center no-message">
                        <p>Yesterday</p>
                    </div>
                    <div className="row m-0 justify-content-end">
                        <div className="col-md-12 right-chat mb-0">
                            <div className="message-box chat-tringle">
                                <p>Odio euismod lacinia at quis risus sed. Congue eu consequat ac felis.</p>
                                <span className="time">13:51</span>
                            </div>
                            <div className="image">
                            </div>
                        </div>
                    </div>
                    <div className="row m-0 justify-content-end">
                        <div className="col-md-12 right-chat ">
                            
                            <div className="message-box">
                                <p>Odio euismod lacinia at quis risus sed. Congue eu consequat ac felis.</p>
                                <span className="time">13:51</span>
                            </div>
                            <div className="image">
                                <img src={profile} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="row m-0">
                        <div className="col-md-12 left-chat">
                            <div className="image">
                                <img src={profile} />
                            </div>
                            <div className="message-box">
                                <p>Odio euismod lacinia at quis risus sed. Congue eu consequat ac felis.</p>
                                <span className="time">13:51</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row header-footer m-0">
                    <div className="col-md-12">
                        <input className="form-control" placeholder="Enter your message"/>
                        <span className="icon-paperclip"></span>
                        <span className="icon-paper-plane"></span>
                    </div>
                </div> 
            </div>
        )
    }
}
export default Chat;