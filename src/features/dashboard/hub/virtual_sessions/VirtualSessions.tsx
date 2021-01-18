import React from 'react';
import './VirtualSessions.scss';
import audio2 from '../../../../assets/images/audio2.png'
import audio1 from '../../../../assets/images/audio1.png'
import { Button } from 'reactstrap';
import profile from '../../../../assets/images/profile.png'

class VirtualSessions extends React.Component<{}> {
    
    constructor(props: any){
        super(props);
    }

    render() { 
        return(
             <div className="virtual-chat">
                 <div className="chat-top-mobile virtual-chat-side">
                 <Button className="go-back">
                    <span className="icon-arrow-right"></span>
                </Button>
                <span className="collab-profile">
                    <span>
                        <img src={profile} />
                        <img src={profile} />
                        <img src={profile} />
                        <img src={profile} />
                        <img src={profile} />
                    </span>
                    <h1>5 Collaborators</h1>

                </span>
                 </div>
                    <div className="image-virtual img1">
                        <img src={audio1} className="img-fluid w-100"/>
                    </div>
                    <div className="image-virtual img2">
                        <img src={audio1} className="img-fluid w-100"/>
                    </div>
                    <div className="image-virtual img3">
                        <img src={audio1} className="img-fluid w-100"/>
                    </div>
                    <div className="image-virtual img4">
                        <img src={audio1} className="img-fluid w-100"/>
                    </div>
                    <div className="image-virtual img5 ">
                        <img src={audio1} className="img-fluid w-100"/>
                    </div>

                 <div className="active-img">
                     <div className="position-relative">
                        <img src={audio2} className="img-fluid w-100"/>
                        <div className="chat-audio">
                            <div className="line"></div>
                            <i className="icon-microphone-alt-slash"></i>
                            <i className="icon-comments2"></i>
                        </div>
                     </div>
                 </div>

                <div className="icons-section">
                    <span>
                        <i className="icon-microphone-alt-slash"></i>
                        <p>MUTE</p>
                    </span>
                    <span>
                        <i className="icon-webcam-slash"></i>
                        <p>OFF</p>
                    </span>
                    <span>
                        <i className="icon-comments2"></i>
                        <p>CHAT</p>
                    </span>
                    <span>
                        <i className="icon-close"></i>
                        <p>END</p>
                    </span>
                </div> 
             </div>
        )
    }
}
export default VirtualSessions;