import React from 'react';
import './TermsCondition.scss';
import { Button } from 'reactstrap';
import YourNetwork from '../../common/your_network/YourNetwork';interface State {
    network: boolean;
 }

 

class TermsCondition extends React.Component<{}, State> {
    readonly state : State = { network: false}
    constructor(props: any){
        super(props);
    }

    toggleNetwork = () => {
        this.setState({ network : !this.state.network});
    };


    render() {
        const { network } =  this.state;
    return( 
        <>
        <div className="termsPage">
            <div className="row">
                <div className="col-md-10">
                    <h1>Terms & Conditions</h1>
                    <p className="pg-1">Please read these Terms and Conditions ("Terms") carefully before accessing or using the website at www.loop.com and all related websites, software, apps, and/or plug-ins (together the "Service") made available by Loop GmbH ("LOOP", "us", "we" or "our").</p>
                </div>
            </div> 
            <h2>1. Acceptance of Terms</h2> 
            <p>1.1. LOOP operates the website www.loop.com ("Website"), a platform that allows you to post, link, store, share and otherwise make available certain information, text, graphics, photos, videos, or other material (together "Content"). Our goal is to help designers, bloggers and everyone who is looking for an image to find photos and other Content that you can use for free subject to and in compliance with these Terms.</p>
            <p>1.2. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all photographers, visitors, users and others who access and/or use the Service.</p>
            <p>1.3. By accessing or using the Service, whether as a photographer, visitor or user of the Website, you agree to be bound by these Terms. These Terms serve to protect and safeguard your rights, the rights of other users, our rights and the rights of third parties in the course of operating the Website. If you do not agree to the terms of use, you must immediately stop using any part of the Service.</p>
            <p>1.4. We reserve the right to change or adapt these Terms at any time and without giving reasons with effect for the future. You will be notified of these changes at least two weeks before they take effect by posting them on the Website and should you have created a user account on our Website by notifying your registered e-mail address. You have the right to immediately cancel and terminate your account on our Website if you do not agree to the changes to the Terms. Changes shall be deemed approved by you if you continue to use the Service after the new Terms come into effect.</p>
            <p>1.5. The use of the Service is subject to the Terms in force at the time of use.</p>
            
            <h2>2. Accounts and Registration</h2> 
            <p>2.1. You have the option of creating a user account on our Website so that you can use the additional functions of the Website, in particular for uploading photos and other Content or for participating in any contests made available through the Service. The opening of a user account can only take place with the agreement to these Terms.</p>
            <p>2.2. Upon registration, Pexels and you enter into a contract for the use of the Website and the Services. There is no claim to the conclusion of this contract. Pexels is entitled to refuse your registration without giving reasons.</p>
            
            <Button className="network-btn" onClick={this.toggleNetwork}>
                <i className="icon icon-network"></i>
            </Button>
        </div>
        {network && <YourNetwork toggleNetwork={this.toggleNetwork}  network={network}/>}
        </>
    )
    }
}
export default TermsCondition;