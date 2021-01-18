
export interface IUserDetail{
    first_name: string;
    last_name: string;
    area_of_expertise_id: string[];
    genre_id: string[];
    social_profile_link: string[];
    location: string;
    lat: number;
    long: number;
    zipcode: number;
    trip_from: string;
    trip_to: string;
    trip: string[];
    demo_track: string[];
    user_status_id: boolean;
    skills_id: string[];
    description: string;
    credits: string;
 }

export class UserDetail implements IUserDetail {
    first_name = '';
    last_name = '';
    area_of_expertise_id : string[] = [''];
    genre_id :  string[]  = [''];
    social_profile_link : string[]  = [''];
    location = '';
    lat = 32.52;
    long = 252.889;
    zipcode = 123456;
    trip_from = '';
    trip_to = '';
    trip = [];
    demo_track = [];
    credits = "";
    user_status_id = false;
    skills_id : string[] = [];
    description = '';  

    constructor( userDetail?: IUserDetail ){
        if(userDetail){
            this.setData(userDetail);
        }
    }

    setData(userDetail: IUserDetail){
        this.first_name = userDetail.first_name || '';
        this.last_name =  userDetail.last_name;
        this.area_of_expertise_id =  userDetail.area_of_expertise_id;
        this.genre_id =  userDetail.genre_id;
        this.social_profile_link =  userDetail.social_profile_link;
        this.location =  userDetail.location;
        this.lat =  userDetail.lat;
        this.long =  userDetail.long;
        this.zipcode =  userDetail.zipcode;
        this.trip_from =  userDetail.trip_from;
        this.trip_to =  userDetail.trip_to;
        this.user_status_id =  userDetail.user_status_id;
        this.skills_id =  userDetail.skills_id;
        this.description =  userDetail.description; 
    }
}

