import React  from 'react';
import { Card } from 'reactstrap';
import './ListCard.scss'
import 'react-multi-carousel/lib/styles.css';
import audioProfile1 from '../../../../assets/images/audio1.png' 
import  { History }  from "history";
interface Iprops{
    data?: any,
    history: History,
    onClick: (item: any) => void,
}
const ListCard = ({data, history, onClick = (item: any) => {}} : Iprops) => {
    
    const getExpertiseString = () => {
        return (data && data.expertise && data.expertise.map((expertise: any) => expertise && expertise.name) || []).join(' | ');
    }

    const viewProfile = (data: any) => {
       history.push(`/discovery/view-profile/${data.user_id}`)
    }

    return(
        <Card className="list-card">
            <div className="audioPImg position-relative" onClick={() => onClick(data) } >
                <img src={data && data.photo || audioProfile1} />
                    <div className="play-btn">
                        <i className="icon icon-play" />
                    </div>
            </div>
            <div className="text" onClick={() => viewProfile(data)} >
                <p>{`${data && data.first_name || ""} ${data && data.last_name || ""}`}</p>
                <p>{getExpertiseString()}</p>
            </div>
        </Card>
    )
}

export default ListCard;