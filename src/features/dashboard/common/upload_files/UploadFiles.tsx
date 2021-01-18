import React, { useState, useEffect }  from 'react';
import { Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input } from 'reactstrap';
import './UploadFiles.scss' 

interface UploadTrackProps  {
    modalFile: boolean,
    toggleFile(): void,
    onClose?: (data:FileDataType | null)=> void
}

const UploadFiles = (props: UploadTrackProps) => {
    const [title, setTitle] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState<FileList | null>(null);

    const onChangeHandler = (type: string, event:  FileList | null) => {
        if(event){
            const cover_image = event[0].name //URL.createObjectURL(event[0]); 
            setFileName(cover_image);
            setFile(event);
        }
    }

    const addFile = () => {
        if( file && fileName && title){
            props.onClose && props.onClose({file: file, fileName: fileName, title: title})
        }else{
            
        }
    }
    
    useEffect(()=> {
        setTitle('');
        setFileName('')
        setFile(null);
    }, [props.modalFile] )
    
    return(
        <Modal isOpen={props.modalFile} toggle={props.toggleFile} className="add-to-netwok-modal upload-modal">
                <ModalHeader toggle={props.toggleFile}> </ModalHeader>
                <ModalBody>
                    <h2>Upload Files</h2>
                    <p className="pg-1">Upload audio files, voice memos, documents and more</p>
                        
                    <FormGroup>
                        <Label className="text-left d-block">Name:</Label>
                        <Input type="text" name="cardnumber" id="cardid" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Name of upload" />
                    </FormGroup>
                    <FormGroup className="trackFile">
                        <Label  className="text-left d-block">Upload file:</Label>
                        <Input type="textarea" name="cardnumber" id="cardid" value={fileName} placeholder="We support mp3, ogg, flac, doc, mp4, jpg, jpeg, png, pdf" />
                        <div className="upload-devicebtn">
                            <input type="file" name="file-1[]" id="file-1" accept=".mp3,audio/*, application/pdf, image/x-png,image/jpeg" onChange={(event) => onChangeHandler('profile', event.target.files)} className="inputfile inputfile-1" />
                            <label htmlFor="file-1"><i className="icon icon-share "></i>  Upload from Device</label>
                        </div>
                    </FormGroup>
                    <Button className="button-btnGradiant chat-btn" onClick={addFile}  >
                        <i className="icon icon-file "></i>  Add File
                    </Button>
                    
                </ModalBody>
            </Modal>
    )
}

interface FileData {file: FileList, fileName: string, title: string};

export type FileDataType = FileData;
export const UploadFilesModal = UploadFiles