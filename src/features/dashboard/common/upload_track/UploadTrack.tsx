import React, { useState, useEffect }  from 'react';
import { Modal, ModalHeader, ModalBody, Button, FormGroup, Label, Input } from 'reactstrap';
import './UploadTrack.scss'
import cover from '../../../../assets/images/cover.svg';
import { ToastContainer, toast } from 'react-toastify';

// import { getAudioDurationInSeconds } from 'get-audio-duration';

interface UploadTrackProps  {
    modalTrack: boolean,
    toggleTrack(): void,
    onClose?(data: TrackDataType | null): void
}

interface TrackDataType {
    imageFileName: string,
    imageFile: FileList,
    trackFileName: string,
    trackFile: FileList,
    title: string
}

const UploadTrack = (props: UploadTrackProps) => {
    const [title, setTitle] = useState<string>();
    const [imageName, setImageName] = useState<string>();
    const [imageFile, setImageFile] = useState<FileList | null>();
    const [trackFile, setTrackFile] = useState<FileList | null>();
    const [trackName, setTrackName] = useState<string>('');

    const onChangeHandler = (type: string, event:  FileList | null) => {       
        if(event){
            const cover_image = URL.createObjectURL(event[0]);
            //  getAudioDurationInSeconds(cover_image).then((duration) => {
            //     console.log(duration);
            // });
            if(type == "image"){
                setImageName(cover_image);
                setImageFile(event);
            }else{
                setTrackFile(event);
                setTrackName(event[0].name)
            } 
        }
    }

    useEffect(() => { 
        setTitle("");
        setImageName("");
        setImageFile(null);
        setTrackFile(null);
        setTrackName("");
    }, [props.modalTrack])

    const addTrack = () => { 
        if( title && imageName && imageFile && trackFile && trackName){
            let data: TrackDataType = {
                title: title,
                imageFile: imageFile,
                imageFileName: imageName,
                trackFile: trackFile,
                trackFileName: trackName
            }
            props.onClose && props.onClose(data);
        }else{
            toast.error('Please Upload Track Details');

        }
    }

    return(
        <Modal isOpen={props.modalTrack} toggle={props.toggleTrack}  className="add-to-netwok-modal upload-modal track-modal">
                    <ToastContainer />
            <ModalHeader toggle={props.toggleTrack}> </ModalHeader>
            <ModalBody>
                <h2>Upload Tracks</h2>
                <p className="pg-1">Any reference tracks or demos you want to upload to this project?</p>
                <p className="text-left mt-4 mb-2">Upload image for cover:</p>
                <div className="upload-f-device">
                    <img src={ imageName || cover} />
                    <div className="upload-devicebtn">
                        <input type="file" name="file-1[]" id="file-1" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG"  onChange={(event) => onChangeHandler('image', event.target.files)} className="inputfile inputfile-1" />
                        <label htmlFor="file-1"><i className="icon icon-share"></i>  Upload from Device</label>
                    </div>
                </div>
                <FormGroup>
                    <Label className="text-left d-block">Title:</Label>
                    <Input type="text" name="cardnumber" id="cardid" onChange={(event) => setTitle(event.target.value)} placeholder="Enter the title of the the track" />
                </FormGroup>
                <FormGroup className="trackFile">
                    <Label  className="text-left d-block">Upload track file:</Label>
                    <Input type="textarea" name="cardnumber" id="cardid"  value={trackName} placeholder="We support mp3, ogg, flac, mp4" />
                    <div className="upload-devicebtn">
                        <input type="file" name="file-2[]" id="file-2"  accept=".mp3,audio/*"  onChange={(event) => onChangeHandler('memo', event.target.files)} className="inputfile inputfile-1" />
                        <label htmlFor="file-2"><i className="icon icon-share"></i>  Upload from Device</label>
                    </div>
                    <audio id="audio" src={imageName} onChange={(e: any) => {
                        //console.log("#current", e);
                        //console.log("#current file", e.currentTarget);
                        
                    }} ></audio>
                </FormGroup>
                <Button className="button-btnGradiant chat-btn" onClick={() => addTrack()}  >
                    <i className="icon icon-play "></i>  Add Track
                </Button>
            </ModalBody>
        </Modal>
    )
}

export type TrackFileType = TrackDataType
export  const UploadTrackModal = UploadTrack;