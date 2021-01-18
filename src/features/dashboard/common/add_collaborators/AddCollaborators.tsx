import React, { useState, useEffect }  from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import './AddCollaborators.scss'
import profileImg from "../../../../assets/images/profile.png"
import { toast } from 'react-toastify';
interface AddCollaboratorsProps  {
    modalAddCollaborators: boolean,
    toggleAddCollaborators(): void,
    addCollaborators: (collaborators: string[])=> void;
    connections: any[];
    selectedCollaborator: any[];
}

const AddCollaborators = (props: AddCollaboratorsProps) => {

    const [connection, setconnection] = useState<any[]>(props.connections);
    const [collaborator, setCollaborator] = useState<string[]>([]);
    const [key, setKey] = useState();

    const onSearch = (event: any) => {
        const key = event.target.value          
        setconnection(props.connections.filter((item: any) => `${item.first_name || ''} ${item.last_name || ''}`.toLowerCase().includes(key.toLowerCase()) ))
    }

    const handleCollborator = (id: string, status: boolean) => {
            const index = collaborator.findIndex((item: string) => item == id);
            if(index > -1){
                collaborator.splice(index, 1);
            }else{
                collaborator.push(id);
            }
        let newCollabortor = [...collaborator]
        setCollaborator(newCollabortor);
    }

    useEffect(() => { 
        setCollaborator(props.selectedCollaborator);
        setconnection(props.connections.filter((item: any) => `${item.first_name || ''} ${item.last_name || ''}`.toLowerCase().includes((key && key || '').toLowerCase()) ))
    },[props.connections])
 
    return(
        <Modal isOpen={props.modalAddCollaborators} toggle={props.toggleAddCollaborators}   className="add-to-netwok-modal upload-modal add-collaborators">
        <ModalHeader toggle={props.toggleAddCollaborators}  > </ModalHeader>
        <ModalBody>
            <h2>Add Collaborators</h2>
            <p className="pg-1">Add members from your network to collaborate with you on this project</p>
            <div className="search-field">
                    <input type="text" placeholder="Search inside your network" onChange={(event: any) => onSearch(event)} />
                    <i className="icon icon-search;"></i>
            </div>
            <div className="collab-list">
                { connection.map((item : any, index: number) => (
                    <div className="collab-list-item">
                        <div>
                            <div className="d-flex align-items-center">
                                {item.photo?<img src={item.photo} />:<div style={{backgroundColor:'white'}}></div>} 
                                <div className="text-left">
                                    <p>{`${item.first_name || ''} ${item.last_name || ''}`}</p>
                                    <p>{ item.expertise && Array.isArray(item.expertise) && item.expertise.map((item : any) => item && item.name).join(" | ") }</p>
                                </div>  
                            </div>
                        </div>
                        <div className="round">
                            <input type="checkbox" id={"checkbox"+item.user_id} checked={collaborator.includes(item.user_id)} onChange={( event: any ) =>  handleCollborator(item.user_id, event.target.checked)} />
                            <label htmlFor={"checkbox"+item.user_id}></label>
                        </div>
                    </div>
                ))
                     
                }
           </div>
            
            <Button className="button-btnGradiant chat-btn" onClick={()=> props.addCollaborators(collaborator)}  >
                <i className="icon-users "></i>  Add to project
            </Button>
        </ModalBody>
    </Modal>
    )
}

export default AddCollaborators;