import React, { useEffect, useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import './Notification.scss'
import _ from 'lodash';
import { acceptRequest, rejectRequest } from '../../../../redux/network/action';
import { readNotification, getNotification } from '../../../../redux/user/action';
import { toast, ToastContainer } from 'react-toastify';
import  { History }  from "history";
import audioProfile from '../../../../assets/images/audioProfile.png';


type SideBarProps = {
    isSideBarOpen: boolean,
    setIsSideBarOpen: Function,
    notification: any,
    readNotification: any,
    rejectRequest: any,
    acceptRequest: any,
    getNotification: any,
    history: History,
}

const Notification = (props: SideBarProps) => {
    const [dropdownOpen, setOpen] = useState(false);
    const [dropdownOpenChat, setOpenChat] = useState(false);
    const [notification, setNotification] = useState([]);
    const [defaultOpen, setDefaultOpen] = useState<any>({});

    const toggle = () => setOpen(!dropdownOpen);
    const toggleChat = () => setOpenChat(!dropdownOpenChat);

    useEffect(() => {
        if (props.notification) {
            setNotification(props.notification)
        }
    }, [props.notification])

    const toggleSubMenu = (index:any) => {
        let temObject = {};
        notification && notification.map((item:any, subindex:any)=>{
            temObject = {
                ...temObject,
                [subindex] :false
            }
        })
        setDefaultOpen({
            ...temObject,
            [index]: defaultOpen && !defaultOpen[index] ? true : false,
        });
    }

    const readNotification = async (id: any) => {
        const reponse = await props.readNotification(id);
        if (reponse && reponse.success) { 
            toast.success(reponse.message);
            await props.getNotification()
        } else {
            toast.error("Something went wrong");
        }
    }

    const acceptRequest = async (id: any) => {
        const reponse = await props.acceptRequest(id)
        if (reponse && reponse.data && reponse.data.success) {
            toast.success(reponse.data.message);
            await props.getNotification()
        } else {
            toast.error("Something went wrong");
        }
    }

    const rejectRequest = async (id: any) => {
        const reponse = await props.rejectRequest(id)
        if (reponse && reponse.data && reponse.data.success) { 
            toast.success(reponse.data.message);
            await props.getNotification()
        } else {
            toast.error("Something went wrong");
        }
    }
    const viewProfile = (data: any) => {
        props.history.push(`/discovery/view-profile/${data && data.entity_id}`)
     }

    return (
        <div className="notification">
            <ToastContainer />
            <ButtonDropdown isOpen={dropdownOpenChat} toggle={toggleChat}>
                <DropdownToggle className="btn1"  >
                     <span className="active-dot"></span>
                    <i className="icon icon-envelope"></i>
                </DropdownToggle>
                <DropdownMenu className="notiMenuDropdown chatNotificationDrop">
                    
                                <DropdownItem>
                                    <div className="chat-count">5</div>
                                    <img src={audioProfile} /> 
                                    <span>Lucas Milo  <br /> <span className="subTitle">Of the printing and typese…</span></span>
                                </DropdownItem>
                                <DropdownItem><img src={audioProfile} /> 
                                <div className="chat-count">9+</div>
                                    <span>Lucas Milo  <br /> <span className="subTitle">Of the printing and typese…</span></span>
                                </DropdownItem>
                                <DropdownItem><img src={audioProfile} /> 
                                    <span>Lucas Milo  <br /> <span className="subTitle">Of the printing and typese…</span></span>
                                </DropdownItem>
                                <button className="button-btnGradiant feeling-random btn btn-secondary btn-got-to">Go to Messages</button>
                                    
                </DropdownMenu>
            </ButtonDropdown>

            <ButtonDropdown isOpen={dropdownOpen} toggle={()=>{}}>
                <DropdownToggle className={dropdownOpen ? 'active btn1' : 'btn1'} onClick={toggle} >
                    {!_.isEmpty(notification) && <span className="active-dot"></span>}
                    <i className="icon icon-bell"></i>
                </DropdownToggle>
                <DropdownMenu className="notiMenuDropdown">
                    {
                        !_.isEmpty(notification) ? notification.map((item: any, index: any) => {
                            return (
                                <DropdownItem key={index}>
                                    <div onClick={() => viewProfile(item)}>
                                        <img src={item.photo} />
                                    </div>
                                    <div>
                                        {item.text}
                                    </div>
                                    <ButtonDropdown isOpen={defaultOpen && defaultOpen[index]} toggle={()=>toggleSubMenu(index)} >
                                        <DropdownToggle aria-expanded={defaultOpen && defaultOpen[index]} className={defaultOpen && defaultOpen[index] ? 'active btn2' :  'btn2'}>
                                            <i className={defaultOpen && defaultOpen[index] ? 'icon icon-ellipsis-v color-green' : 'icon icon-ellipsis-v'}></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="suMenuDropdown">
                                            {
                                                item.entity == 'network_add_user' && (
                                                    <>
                                                        <DropdownItem onClick={()=>acceptRequest(item.entity_id)}>Accept</DropdownItem>
                                                        <DropdownItem onClick={()=>rejectRequest(item.entity_id)}>Reject</DropdownItem>
                                                    </>
                                                )
                                            }
                                            <DropdownItem onClick={()=>readNotification(item.notification_id)}>Mark as read</DropdownItem>
                                        </DropdownMenu>
                                    </ButtonDropdown>
                                </DropdownItem>
                            )
                        }) : <DropdownItem>No Notification Available!</DropdownItem>
                    }
                </DropdownMenu>
            </ButtonDropdown>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        notification: state.user.notification || [],
    }
}

const mapDispatchToProps = {
    readNotification,
    getNotification,
    acceptRequest, 
    rejectRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);