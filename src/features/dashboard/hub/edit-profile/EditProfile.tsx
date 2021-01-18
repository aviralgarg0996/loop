import React from 'react';
import './EditProfile.scss';
import { Row, Col, Form, FormGroup, Input, Label, Button, Card, Modal, ModalHeader, ModalBody, Toast } from 'reactstrap';
import cover from '../../../../assets/images/cover.svg'
import Select, { ValueType } from 'react-select';
import audioProfile from '../../../../assets/images/audioProfile.png';
import { IUserDetail, UserDetail } from '../../../../utils/models/user/request.model';
import { USER } from '../../../../utils/Eums';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { editProfile, uploadProfile, getProfile, addTrack, listTrack, editTrack, deleteTrack } from '../../../../redux/user/action';
import { expertiseList, genreList,   } from '../../../../redux/master-data/action'; 
import { IExpertiseItem, IGenreItem } from '../../../../utils/models/master-data/response.model';
import PlacesAutocomplete, { geocodeByAddress, getLatLng, } from 'react-places-autocomplete';
  import Places from "google-places-web";
import moment from "moment";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import _ from 'lodash';
// import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

 
const options2: IOption[] = [
    { value: 'Paris', label: 'Paris'},
    { value: 'Berlin', label: 'Berlin'},
    { value: 'Kiev', label: 'Kiev'},
    { value: 'London', label: 'London'},
    { value: 'New York', label: 'New York'},
    { value: 'Amsterdam', label: 'Amsterdam'},
    { value: 'Los Angeles', label: 'Los Angeles'},
    { value: 'San Antonio', label: 'San Antonio'},
];
interface IOption {
    label: string,
    value: string
}

interface State {
    modal: boolean;
    modalTrack: boolean;
    userDetail: IUserDetail;
    fullName: string;
    expertiseList: IOption[],
    genreList: IOption[],
    profileFile?: FileList,
    coverFile?: FileList,
    trackFile?: FileList,
    trackTitle?: string,
    profileImage?: any,
    coverImage?: any,
    selectedTrack?: string,
    address: any;
    tripAdded: boolean;
    mediaUpdated: boolean;
    locationText?: any;
    trackUrl: string;
    duration: number;
    error: string | undefined;
}

interface IProps {
    userDetail?: any,
    editProfile?: (data: IUserDetail) => Promise<any>,
    editTrack?: (data: any) => Promise<any>,
    deleteTrack?: (data: any) => Promise<any>,
    expertiseList?: () => void,
    genreList?: () => void,
    getProfile?: () => void,
    expertiseListArr?: IExpertiseItem[],
    genreListArr?: IGenreItem[],
    listTrack?: () => Promise<any>,
    uploadProfile? : (file: FileList) => Promise<any>,
    history: any,
    addTrack?: (coverFile: FileList, trackFile: FileList, title: string, firstTrack: boolean, duration: string ) => Promise<any>
}

interface Window {
    [key:string]: any; // Add index signature
  }
  let windowObj : Window = window;
class EditProfile extends React.Component<IProps, State> {
    readonly state: State = {error: undefined , duration: 0, trackUrl: '' , mediaUpdated: false, tripAdded: false, address: {}, modal: false, modalTrack: false, userDetail: new UserDetail(), fullName: '' , expertiseList: [], genreList: [] } ;
    autocompleteInput: React.RefObject<any>;
    autocomplete: any;

    constructor(props: IProps){
        super(props);
        props.expertiseList && props.expertiseList();
        props.genreList && props.genreList();
        // props.listTrack && props.listTrack();
        props.getProfile && props.getProfile();
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
        Places.apiKey = "AIzaSyDOplTnOzQM_tYwPVFqxueCYui4brD2j2g";
        Places.debug = true; // boolean;
    } 
 
    
      handlePlaceChanged(){
        const place = this.autocomplete.getPlace();
        // this.props.onPlaceLoaded(place);
      }

      searchPlaces = (place: string) => {
        
        Places.textsearch({ query: place}).then((response: any) => {
            const { status, results } = response;
            console.log("#response", response);
            
        }).catch((err: any) => {
            console.log("#searchPlaces", err);
            
        });
           
            
       
      }
      
    componentDidMount(){
        const { userDetail } = this.state;
        this.setState({
            fullName: `${userDetail.first_name || ''} ${userDetail.last_name || ''}`
        });
        // this.autocomplete = new windowObj.google.maps.places.Autocomplete(this.autocompleteInput.current,
        //     {"types": ["(cities)"]});
        //     const request = {
        //         query: "Museum of Contemporary Art Australia",
        //         fields: ["name", "geometry"],
        //       };
        //  let service = new windowObj.google.maps.places.PlacesService();
        //  let that = this;
        //  console.log('DDDDDDDDD');
         
        //  service.findPlaceFromQuery(
        //     request,
        //     (
        //       results: any[],
        //       status: any
        //     ) => {
        //         console.log("RESULT===", status, results );

        //       if (status === windowObj.google.maps.places.PlacesServiceStatus.OK) {
        //         for (let i = 0; i < results.length; i++) {
        //            console.log("RESULT", i, results[0]);
        //       }
        //     }
        //     }
        //   );
        // this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    componentDidUpdate(prevProps: IProps){
        let { expertiseList, genreList  } = this.state;
        if(prevProps.expertiseListArr != this.props.expertiseListArr){
            expertiseList = this.props.expertiseListArr && this.props.expertiseListArr.map((item : IExpertiseItem ) => { return {value: item.expertise_id, label: item.name}} ) || []
            this.setState({expertiseList});
        }
        else if(prevProps.genreListArr != this.props.genreListArr){
            genreList = this.props.genreListArr && this.props.genreListArr.map((item : IGenreItem ) => { return {value: item.genre_id, label: item.name}} ) || []
            this.setState({genreList});
        }else if(prevProps.userDetail != this.props.userDetail  ){
            const userDetailProp = this.props.userDetail;
            let {userDetail} = this.state;
            if(userDetailProp  && !this.state.mediaUpdated){
                userDetail.area_of_expertise_id = userDetailProp.expertise && userDetailProp.expertise.map((exp: any) => exp && exp.expertise_id).filter((exp: any) => exp != null);
                userDetail.genre_id = userDetailProp.genre && userDetailProp.genre.map((genre: any) => genre && genre.genre_id).filter((exp: any) => exp != null);
                userDetail.social_profile_link = userDetailProp.social_link;
                userDetail.trip_from = userDetailProp.trip_from;
                userDetail.trip_to = userDetailProp.trip_to;
                userDetail.trip = (userDetailProp.trip || []).map((item: any) => item.trip);
                userDetail.first_name = userDetailProp.first_name || "";
                userDetail.last_name = userDetailProp.last_name || "";
                userDetail.location = userDetailProp.location && userDetailProp.location.location;
                userDetail.lat = (userDetailProp.location && userDetailProp.location.lat || '43.44') - 0;
                userDetail.long =  (userDetailProp.location && userDetailProp.location.long || '12.76') - 0;
                userDetail.zipcode =  (userDetailProp.location && userDetailProp.location.zipcode || "78945") - 0;
                userDetail.description = userDetailProp.description;
                userDetail.credits = userDetailProp.credits;
                userDetail.user_status_id = true;

                this.setState({
                    fullName: `${userDetailProp.first_name || ''} ${userDetailProp.last_name || ''}`,
                    userDetail,
                    profileImage: userDetailProp.photo,
                });
            }else{
                this.setState({ mediaUpdated : false})
            }

        }
    }
    
    toggle = () => {
      this.setState({ modal: !this.state.modal, profileFile: undefined, profileImage: undefined })
    }; 
    
    toggleTrack = () => {
        let { userDetail } = this.props;
        if(userDetail && userDetail.demo_track && userDetail.demo_track.length == 5){
            toast.error("You can only add upto 5 tracks");
            return;
        }
       this.setState({ modalTrack: !this.state.modalTrack, selectedTrack: undefined, coverImage: undefined, coverFile: undefined, trackFile: undefined, trackTitle: undefined })
    };

    optionSelection = (event: any, field: string, index?: number) => { 
        const selectedData = JSON.parse(JSON.stringify(event));        
        const { userDetail } = this.state;
        switch(field){
            case USER.AREA_OF_EXPERTISE :
                    if(userDetail.area_of_expertise_id.includes(selectedData.value)){
                        toast('Already Added');
                        userDetail.area_of_expertise_id[index || 0] = "";
                    }else{
                        userDetail.area_of_expertise_id[index || 0] = selectedData.value;
                    }
                break;
            case USER.GENRE :
                if(userDetail.genre_id.includes(selectedData.value)){
                    toast('Already Added');
                    userDetail.genre_id[index || 0] = "";
                }else{
                    userDetail.genre_id[index || 0] = selectedData.value;
                }
                    // userDetail.genre_id = selectedData.value;
                break;
            case USER.LOCATION :
                    userDetail.location = selectedData.value;
                break;
            case USER.TRIP1 :
                    userDetail.trip[index || 0] = selectedData.value
                    userDetail.trip_from = selectedData.value;
                break;
        }
       
        this.setState({userDetail}); 
    }

    loadScript = (url: string, callback: () => void) => {
        let script : any = document.createElement("script"); // create script tag
        script.type = "text/javascript";
      
        // when script state is ready and loaded or complete we will call callback
        if (script.readyState) {
          script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = () => callback();
        }
      
        script.src = url; // load by url
        document.getElementsByTagName("head")[0].appendChild(script); // append to head
      };

    inputHandler = (event: any, index?: number) => {
        event.stopPropagation();
        const { userDetail } = this.state;
        this.searchPlaces(event.target.value)
        switch(event.target.name){
            case 'name' :
                    const value = event.target.value;
                    const values = value.trim().split(' ');
                    userDetail.first_name = values[0] || '';
                    userDetail.last_name = values[1] || '';
                    this.setState({fullName: event.target.value});
                    this.setState({userDetail, fullName: event.target.value});
                break;
            case 'description': 
                    userDetail.description = event.target.value;   
                    this.setState({userDetail});
                break;
            case 'credits': 
                    userDetail.credits = event.target.value;   
                    this.setState({userDetail});
                break;
            case 'social': 
                    userDetail.social_profile_link[index || 0] = event.target.value;    
                    this.setState({userDetail});
                break;
            case 'trackTitle': 
                    this.setState({trackTitle: event.target.value});
                break;
        }
    }

    saveProfile = (e:any) => {
        e.preventDefault();
        const { userDetail } = this.state; 
        const userDetailProp = this.props.userDetail;
        userDetail.genre_id = userDetail.genre_id && userDetail.genre_id.filter((id: string) => id.trim() != "")
        userDetail.area_of_expertise_id = userDetail.area_of_expertise_id && userDetail.area_of_expertise_id.filter((id: string) => id.trim() != "")
        userDetail.social_profile_link = userDetail.social_profile_link && userDetail.social_profile_link.filter((id: string) => id.trim() != "")
        
        if(userDetail.first_name && userDetail.location &&
             userDetail.genre_id && userDetail.genre_id.length > 0 &&  userDetail.area_of_expertise_id && userDetail.area_of_expertise_id.length > 0 &&  userDetail.social_profile_link && userDetail.social_profile_link.length > 0 && userDetailProp && userDetailProp.demo_track && userDetailProp.demo_track.length > 0 ){
                this.setState({error: undefined})
                this.props.editProfile && this.props.editProfile(this.state.userDetail).then((res) => {
                    this.props.getProfile && this.props.getProfile();
                    toast.success("Profile updated successfully");
                    this.props.history.push('/hub/view-profile');
                }).catch((err : any) => {
                    toast.error("Something went wrong")
                })
        }else{
            this.setState({error: "error"});
            if(!userDetail.first_name || !userDetail.last_name){
                toast.error("Please provide first and second name both"); 
                return;
            }
            if(!userDetail.area_of_expertise_id || (userDetail.area_of_expertise_id && userDetail.area_of_expertise_id.length == 0)){
                toast.error("Please add atleast one expertise");
                return;
            }
            if(!userDetail.genre_id || (userDetail.genre_id && userDetail.genre_id.length == 0)){
                toast.error("Please add atleast one genre");
                return;
            }
            if(userDetail.social_profile_link && (userDetail.social_profile_link && userDetail.social_profile_link.length == 0)){
                toast.error("Please add atleast one profile");
                return;
            }
            if(!userDetail.location){
                toast.error("Please add location");
                return;
            }
            if(!userDetail.description){
                toast.error("Please add description");
                return;
            }
            if(!userDetail.credits){
                toast.error("Please add credits");
                return;
            }
            if(!userDetailProp.demo_track || (userDetailProp.demo_track && userDetailProp.demo_track.length == 0)){
                toast.error("Please add atleast one track");
                return;
            }
            // toast.error("All fields required");
            return;
        }
    }

    addExpertise = () => {
        const { userDetail } = this.state;
        userDetail.area_of_expertise_id = userDetail.area_of_expertise_id ? userDetail.area_of_expertise_id : []
        const index = userDetail.area_of_expertise_id.findIndex(val => val.trim() == "" ) ;
        if(index > -1){
            userDetail.area_of_expertise_id.splice(index,1);
        }
        userDetail.area_of_expertise_id.push("");
        this.setState({ userDetail });
    }

    addTrip = () => {
        const { userDetail } = this.state;
        userDetail.trip = userDetail.trip ? userDetail.trip : []
        if(userDetail.trip.length < 3) {
            const index = userDetail.trip.findIndex(val => val  == "" || false );
            if(index > -1){
                userDetail.trip.splice(index,1);
            }
            userDetail.trip.push( '');
            this.setState({ userDetail });
        }else{
            toast("Cann't add more than 3 trips")
        }
        
    }

    addGenre = () => {
        const { userDetail } = this.state;
        userDetail.genre_id = userDetail.genre_id ? userDetail.genre_id : []
        const index = userDetail.genre_id.findIndex(val => val.trim() == "" )  ;
        if(index > -1){
            userDetail.genre_id.splice(index,1);
        }
        userDetail.genre_id.push("");
        this.setState({ userDetail });
    }

    addSocialMediaLink = () => {
        const { userDetail } = this.state;
        userDetail.social_profile_link = userDetail.social_profile_link ? userDetail.social_profile_link : []
        const index = userDetail.social_profile_link && userDetail.social_profile_link.findIndex(val => val.trim() == "" ) || -1; 
        if(index > -1){
            userDetail.social_profile_link.splice(index,1);
        }
        userDetail.social_profile_link.push("");
        this.setState({ userDetail });
    }

    deleteSocialMediaLink = (index: number) => {
        const { userDetail } = this.state;
        if(userDetail.social_profile_link.length == 1){
            userDetail.social_profile_link = [];
        }else {
            userDetail.social_profile_link.splice(index, 1);
        }
        this.setState({userDetail});
    }

    deleteAreaOfExpertise = (index: number) => {
        const { userDetail } = this.state;
        if(userDetail.area_of_expertise_id.length == 1){
            userDetail.area_of_expertise_id = [];
        }else{
            userDetail.area_of_expertise_id.splice(index, 1);
        }
        this.setState({userDetail});
    }

    deleteGenre = (index: number) => {
        const { userDetail } = this.state;
        if(userDetail.genre_id.length == 1){
            userDetail.genre_id = []
        }else{
            userDetail.genre_id.splice(index, 1);
        }
        this.setState({userDetail});
    }

    onChangeHandler = (type: string, event:  FileList | null ) => {       
        if(event){
            if(type == 'profile'){
                const profileImage = URL.createObjectURL(event[0]);
                this.setState({profileFile: event, profileImage})
            }
            else if(type == 'cover_pic'){
                const coverImage = URL.createObjectURL(event[0])
                this.setState({coverFile: event, coverImage})
            }
            else if(type == 'track'){
                const trackUrl = URL.createObjectURL(event[0]);
                const selectedTrack = event[0].name;
                this.setState({trackUrl, trackFile: event, selectedTrack})
            }
            
        }
    }

    saveProfilePic = () => {
        const { profileFile } = this.state;
        if(profileFile){
            this.props.uploadProfile && this.props.uploadProfile(profileFile).then((res) => {
                this.props.getProfile && this.props.getProfile();
                toast("Profile pic updated");
                this.setState({modal: false, mediaUpdated: true})
            })
            .catch((error) => {
                toast("Something went wrong");
            });
        }else{
            toast("Provide profile pic");
        }
    }

    addTrack = () => {
        const { coverFile, trackFile, trackTitle, duration } = this.state; 
        if(coverFile && trackFile && trackTitle){
            const firstTrack = this.props.userDetail.demo_track && this.props.userDetail.demo_track.length == 0;
            this.props.addTrack && this.props.addTrack(coverFile, trackFile, trackTitle, firstTrack, duration+"" ).then((res) => {
                this.props.getProfile && this.props.getProfile();
                toast('Track added successfully');
                this.setState({modalTrack: false, mediaUpdated: true});
            })
            .catch((error) => {
                console.log("error", error);
                toast('something went wrong');
            });
        }else{
            toast("Provide all fields");
        }
    }

    editTrackStatus = (trackId : string, primary: number) => {
        const data = {
            track_id: trackId,
            primary
        }
        this.props.editTrack && this.props.editTrack(data).then((res:any) => {
            toast("Track updated");
            this.props.getProfile && this.props.getProfile();
        }).catch((err: any) => {
            toast('something went wrong')
        })
    }
    
    removeDemoTrack = (trackId : string) => {
        const data = {
            track_id: trackId,
        }
        this.props.deleteTrack && this.props.deleteTrack(data).then((res:any) => {
            toast("Track deleted");
            this.props.getProfile && this.props.getProfile();
        }).catch((err: any) => {
            toast('something went wrong')
        })
    }

    handleChange = (address : any) => {
        
        this.setState({ address });
    };
    
    handleSelect = (address : any) => {
        geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error));
    };
 
    removeLocation = () => {
        let {userDetail} = this.state;
        userDetail.location = '';
        userDetail.lat = 43.44;
        userDetail.long = 43.44;
        this.setState({userDetail});
    }

    removeTripTo = ( index: number ) => {
        let {userDetail} = this.state;
        if(userDetail.trip){
             userDetail.trip.splice(index, 1)
        } 
        this.setState({userDetail});

        
        
    }

     

    getTime = (timeInSec: number) => {
        let duration = moment.duration(timeInSec, "seconds");
        let time = "";
        let hours = duration.hours();
        if (hours > 0) { time = hours + ":" ; }
        time = time + duration.minutes() + ":" + duration.seconds();
        return time;
    }

    render() { 
        const userDetailProp = this.props.userDetail;
        console.log('this props userDetail', this.props.userDetail);
        
        const {  error, modal, modalTrack, userDetail, tripAdded, coverImage, selectedTrack, fullName, expertiseList, genreList, profileImage } = this.state;
        
        return(
            <div className="edit-profile-page">
                <ToastContainer />
                <Row className="m-0">
                    <Col md="8">
                        {/* EDIT COVER PHOTO */}
                        <h1>Edit Profile</h1>
                        <div className="uploadPhoto">
                            <div className="dummy">
                                <img src={profileImage || cover} className="w-100"/>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h2>Edit Photo:</h2>
                                    <p className="mb-0">Upload a new photo from your device</p>
                                </div> 
                                <Button className="add-btn mt-0" onClick={this.toggle}><i className="icon-upload"></i> Upload Photo</Button>
                            </div>
                            
                        </div>
                        <Form className="form" onSubmit={this.saveProfile}>
                            <div className="input-area">
                                {/* FULL NAME */}
                                <FormGroup>
                                    <Label>Name:</Label>
                                    {console.log('fullName', fullName)}
                                    
                                    <Input type="text" name="name" id="cardid" className={ _.isEmpty(fullName) && error ? "border-error" : ""} placeholder="Enter Name Here" onChange={this.inputHandler} value={fullName !== " " ? fullName : undefined} />
                                    {/* <span className="edit-btn"><i className="icon-edit2"></i>Edit</span> */}
                                </FormGroup>
                            </div>
                            <div className="input-area">
                                <Label>Area of expertise:</Label>
                                {
                                    userDetail.area_of_expertise_id && userDetail.area_of_expertise_id.map((experties, index) => (
                                        <div className="d-flex"> 
                                            <Select
                                                options={expertiseList}
                                                // value={expertiseList.filter(e => e.value == userDetail.area_of_expertise_id[index])}
                                                placeholder={'Choose Area of Expertise'}
                                                className={error && expertiseList.filter(e => e.value == userDetail.area_of_expertise_id[index]).length == 0 ? "select-custom mb-2 border-error" : "select-custom mb-2"}
                                                onChange= { (event: any) => {
                                                    this.optionSelection(event, USER.AREA_OF_EXPERTISE, index)
                                                } }
                                                
                                            />
                                            <div className={error && expertiseList.filter(e => e.value == userDetail.area_of_expertise_id[index]).length == 0 ? "delete border-error" : "delete"}  onClick={() => this.deleteAreaOfExpertise(index)} >
                                                <i className="icon-delete"></i> Delete
                                            </div>
                                        </div>
                                    ))
                                }
                                <div>
                                    <Button className="add-btn"  onClick={ this.addExpertise} ><i className="icon-plus-square" ></i>Add New</Button>
                                </div>
                            </div>
                            <div className="input-area">
                                <Label>Genre:</Label>
                                {
                                    userDetail.genre_id && userDetail.genre_id.map((genre, index) => (
                                        <div className="d-flex"> 
                                            <Select
                                                options={genreList}
                                                // value={ge dnreList.filter(e => e.value == userDetail.genre_id[index])}
                                                placeholder={'Choose Genre'} 
                                                className={error && genreList.filter(e => e.value == userDetail.genre_id[index]).length == 0 ? "select-custom mb-2 border-error" : "select-custom mb-2"}
                                                onChange= { (event: any) => {
                                                    this.optionSelection(event, USER.GENRE, index)
                                                } }
                                            />
                                            <div className={error && genreList.filter(e => e.value == userDetail.genre_id[index]).length == 0 ? "delete border-error" : "delete"} onClick={() => this.deleteGenre(index)} >
                                                <i className="icon-delete"></i> Delete
                                            </div>
                                        </div>
                                    ))
                                }
                                <div>
                                    <Button className="add-btn"  onClick={ this.addGenre} ><i className="icon-plus-square"></i>Add New</Button>
                                </div>
                            </div>
                            <div className="input-area">
                                <FormGroup className="link-group">
                                    <Label>Links to your social networks:</Label>
                                    <p>Make sure members will be able to get in touch with you through your socials</p>
                                    {
                                        userDetail.social_profile_link && userDetail.social_profile_link.map((element, index) => (
                                            <div  className="d-flex mb-2">
                                                <Input type="text" name="social" value={userDetail.social_profile_link[index]} 
                                                onChange={(event) => this.inputHandler(event, index)} 
                                                placeholder="Put Your Social Media Link Here"
                                                className={ _.isEmpty(userDetail.social_profile_link[index]) && error ? "border-error" : ""}  />
                                                <div className={_.isEmpty(userDetail.social_profile_link[index]) && error ? "delete border-error" : "delete"} onClick={() => this.deleteSocialMediaLink(index)} >
                                                    <i className="icon-delete"></i> Delete
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div>
                                    <Button className="add-btn" onClick={this.addSocialMediaLink} ><i className="icon-plus-square"></i>Add New</Button>
                                </div>
                                </FormGroup>
                            </div>
                            <div className="input-area location-input-area">
                                <Label>Your location:</Label>
                                <p>Where are you based?</p>
                                <div className="d-flex">
                                {/* <PlacesAutocomplete
                                    value={this.state.locationText}
                                    onChange={value => { console.log("Value", value);
                                     this.setState({ locationText: value })}}
                                    >
                                    {this.renderFunc}
                                </PlacesAutocomplete> */}
                                <GooglePlacesAutocomplete
                                    apiKey="AIzaSyDOplTnOzQM_tYwPVFqxueCYui4brD2j2g" 
                                    selectProps={{
                                        placeholder : "Enter location",
                                        value: this.state.userDetail.location && {label: this.state.userDetail.location, value: {} } || null,
                                        onChange: (data: any) => {  
                                            let {userDetail} = this.state;
                                            userDetail.location = data.label;
                                            geocodeByAddress(data.label)
                                            .then(results => getLatLng(results[0]))
                                            .then(({ lat, lng }) =>{
                                                userDetail.lat = lat;
                                                userDetail.long= lng;
                                                this.setState({userDetail})
                                            });
                                        },
                                      }}
                                />
                                {/* <input ref={this.autocompleteInput} value={this.state.locationText} style={{ display: "none", backgroundColor:"#000000"}}  id="autocomplete" placeholder="Enter your address" type="text"></input>  */}
                                    {/* <Select
                                        options={options2}
                                        value={options2.filter(e => e.value == userDetail.location)}
                                        placeholder={'Los Angeles'}
                                        className="select-custom"
                                        onChange= { (event: ValueType<IOption>) => {
                                            console.log("#onChange", event);
                                            
                                            this.optionSelection(event, USER.LOCATION)
                                        } }
                                        onInputChange = {(event: any) => {
                                            console.log("#onInputChange", event);
                                            // this.setState({locationText: event})
                                            geocodeByAddress(event).then((res: any) => {
                                                console.log("$geocodeByAddress", res);
                                            })
                                        }}
                                    /> */}

                                    {/* <PlacesAutocomplete
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        onSelect={this.handleSelect} >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div>
                                            <input
                                            {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'location-search-input',
                                            })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                    })}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                                );
                                            })}
                                            </div>
                                        </div>
                                        )}
                                </PlacesAutocomplete> */}
                                    <div className="delete" onClick={ this.removeLocation } >
                                        <i className="icon-delete"></i> Delete
                                    </div>

                                </div>
                            </div>
                            <div className="input-area">
                                <Label>Upcoming trips:</Label>
                                <p>Got any travel plans? Add the destinations here so that members can get in touch to book in a session.</p>
                                    {
                                        userDetail.trip && userDetail.trip.map((item: any, index: number) => ( 
                                            <div className="mb-2">
                                                <div className="d-flex">
                                                <FormGroup className="w-100"> 
                                                {
                                                    /* <Select
                                                        options={options2}
                                                        value={options2.filter(e => e.value == userDetail.trip[index])}
                                                        placeholder={'Los Angeles'}
                                                        className="select-custom"
                                                        onChange= { (event: ValueType<IOption>) => {
                                                            this.optionSelection(event, USER.TRIP1, index)
                                                        } }
                                                    /> */
                                                }
                                                <Input type="text" name={"trip"+index} id={"cardid"+index} placeholder="Enter the Destination of Your Trip"
                                                 onChange={(event: any) => {this.optionSelection({value: event.target.value}, USER.TRIP1, index)}}
                                                  value={userDetail.trip[index]}
                                                  className={ _.isEmpty(userDetail.trip[index]) && error ? "border-radius-right-none w-100 border-error" : "border-radius-right-none w-100"}/>
                                                </FormGroup>
                                                <div className="delete"  onClick={ () => this.removeTripTo(index) } >
                                                    <i className="icon-delete"></i> Delete
                                                </div>
                                            
                                            </div>        
                                            </div>
                                        ))
                                    }   
                                <Button className="add-btn"  onClick={ this.addTrip} ><i className="icon-plus-square" ></i> Add New </Button>

                            </div>
                            <div className="input-area">
                                <FormGroup>
                                    <Label>Description:</Label>
                                    <p>Tell the LOOP Community a bit about yourself</p>
                                    <Input type="textarea" name="description" id="cardid" onChange={this.inputHandler} 
                                    placeholder="My work explores the relationship between multiculturalism and romance tourism. With influencers as diverse as Machiavelli and Andy Warhol, new letiations are created from both orderly and random textures." 
                                    value={userDetail.description} className={ _.isEmpty(userDetail.description) && error ? "border-error" : ""} />
                                    {/* <span className="edit-btn"><i className="icon-edit2"></i>Edit</span> */}
                                </FormGroup>
                            </div>

                            <div className="input-area">
                                <FormGroup>
                                    <Label>Credits:</Label>
                                    <p>Who have you  worked with?</p>
                                    <Input type="textarea" name="credits" id="cardid" onChange={this.inputHandler} 
                                        placeholder="Jean Tanner, Lucas Milo, Lily Hame, Jeff Rine, Sam Tolkin, Maria Wes" 
                                        value={userDetail.credits} className={ _.isEmpty(userDetail.credits) && error ? "border-error" : ""} />
                                    {/* <span className="edit-btn"><i className="icon-edit2"></i>Edit</span> */}
                                </FormGroup>
                            </div>

                            <h2>Demo tracks:</h2>
                            <p>Upload up to 5 tracks showcasing your skills. Make sure one is starred - this will be the first track to play when members find you on the Discover page (make it a good one).</p>
                            {
                                userDetailProp && userDetailProp.demo_track.map((track: any, index:number) => (
                                    <Card className="audioCard"> 
                                        <div className="reswidth1">
                                            <div className="d-flex">
                                                <img src={track.cover_image || audioProfile} alt=""  />
                                                <div  className="ml-3">
                                                    <h1>{track.name}</h1>
                                                    <p>{`${userDetail.first_name || ''} ${userDetail.last_name || ''}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between w-50 reswidth2">
                                            <p className="time">{this.getTime(track.duration)}</p>
                                            <p className="primary-text active"><i className={ track.primary == 1 ? "icon-star": "icon-rating"} onClick={()=>{ this.editTrackStatus(track.track_id, track.primary == 1 ? 0 : 1)
                                                }} ></i> <span>{ track.primary == 0 ? '' : 'Primary Demo'}</span></p>
                                            <div className="delete delete-track" onClick={ () => this.removeDemoTrack(track && track.track_id) }><i className="icon-delete"></i> Delete</div>
                                        </div>
                                    </Card>
                                ) )
                                } 
                            
                            <Button className="add-btn mobilenone" onClick={this.toggleTrack}><i className="icon-play"></i> Upload Track</Button>
                            <Button className="button-btnGradiant save-btn" type="submit" onClick={this.saveProfile} >
                                <i className="icon icon-save "></i>   Save Changes
                            </Button>
                        </Form>
                    </Col>
                </Row>
            <div>

            </div>

            <Modal isOpen={modal} toggle={this.toggle} className="add-to-netwok-modal upload-modal">
                <ModalHeader toggle={this.toggle}> </ModalHeader>
                <ModalBody>
                    <h2>Add a photo to your profile</h2>
                    <p className="text-left mt-5 mb-2">Upload image for profile:</p>
                    <div className="upload-f-device">
                        <img src={profileImage || cover} />
                        <div className="upload-devicebtn">
                            <input type="file" name="file-1[]" id="file-1" accept=".jpg,.JPG,.jpeg,.JPEG,.png,.PNG" onChange={(event) => this.onChangeHandler('profile', event.target.files)} className="inputfile inputfile-1" />
                            <label htmlFor="file-1"><i className="icon icon-share "></i>  Upload from Device</label>
                        </div>
                    </div>
                    
                    <Button className="button-btnGradiant chat-btn" onClick={this.saveProfilePic} >

                        <i className="icon icon-upload "></i>  Add profile photo
                    </Button>
                </ModalBody>
            </Modal>

            <Modal isOpen={modalTrack} toggle={this.toggleTrack} className="add-to-netwok-modal upload-modal track-modal">
                <ModalHeader toggle={this.toggleTrack}> </ModalHeader>
                <ModalBody>
                    <h2>Upload Tracks</h2>
                    <p className="pg-1">Any reference tracks or demos you want to upload to this project?</p>
                    <p className="text-left mt-4 mb-2">Upload image for cover:</p>
                    <div className="upload-f-device">
                        <img src={ coverImage || cover} />
                        <div className="upload-devicebtn">
                            <input type="file" name="file-1[]" id="file-3" accept=".jpeg,.png,.jpg,.JPEG,.JPG,.PNG" onChange={(event) => this.onChangeHandler('cover_pic', event.target.files)} className="inputfile inputfile-1" />
                            <label htmlFor="file-3"><i className="icon icon-share "></i>  Upload from Device</label>
                        </div>
                    </div>
                    <FormGroup>
                        <Label className="text-left d-block">Title:</Label>
                        <Input type="text" name="trackTitle" id="trackTitle" onChange={this.inputHandler} placeholder="Enter the title of the the track" />
                    </FormGroup>
                    <FormGroup className="trackFile">
                        <Label  className="text-left d-block">Upload track file:</Label>
                        <Input type="textarea" name="cardnumber" id="cardid" value={selectedTrack} placeholder="We support AIFF, WAVE, FLAC, OGG, MP2, MP3, AAC, AMR and WMA file" />
                        <div className="upload-devicebtn">
                            <input type="file" name="file-1[]" accept=".mp3,audio/*" id="file-2" onChange={(event) => this.onChangeHandler('track', event.target.files)} className="inputfile inputfile-1" />
                            <label htmlFor="file-2"><i className="icon icon-share "></i>  Upload from Device</label>
                        </div>
                    </FormGroup>
                    {console.log("trackUrl", this.state.trackUrl)}
                    <audio id="audio" src={this.state.trackUrl} onCanPlayThrough={(e: any) => {
                        console.log("#current", e);
                        console.log("#current file", e.currentTarget.duration);
                        let seconds = e.currentTarget.duration;
                        this.setState({duration: seconds})
                    }} ></audio>
                    <Button className="button-btnGradiant chat-btn" onClick={this.addTrack}  >
                        <i className="icon icon-play "></i>  Add Track
                    </Button>
                </ModalBody>
            </Modal>
            </div>
        )
    } 
    
}
 

const mapDispatchToProps = {
    editProfile,
    expertiseList,
    genreList,
    uploadProfile,
    addTrack,
    listTrack,
    getProfile,
    editTrack,
    deleteTrack
}

const mapStateToProps = ( state: any ) => {
    return { 
        expertiseListArr: state.masterData.expertiseList,
        genreListArr: state.masterData.genreList,
        userDetail: state.user.profile,
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);