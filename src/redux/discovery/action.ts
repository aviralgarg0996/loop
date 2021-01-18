import { dispatch } from 'rxjs/internal/observable/pairs';
import { TrackResponse, Track } from './../../utils/models/user/response.model';
import { IUserDetail } from '../../utils/models/user/request.model';
import { Dispatch } from 'redux';
import API_PATH from '../../services/api-service/api-path';
import API from '../../services/api-service/api';
import { loadingAction } from '../auth/action';
import { DiscoveryActionType, EXPERTISE_VIEW_SUCCESS, EXPERTISE_VIEW_FAILURE, DISCOVER_SUCCESS, DISCOVER_FAILURE, DISCOVER_FEATURED_LIST_FAILURE, DISCOVER_FEATURED_LIST_SUCCESS, RECOMMENDED_SUCCESS, RECOMMENDED_FAILURE, RECENT_JOINED_SUCCESS, RECENT_JOINED_FAILURE, TRENDING_SUCCESS, TRENDING_FAILURE, LOCATION_SUCCESS, LOCATION_FAILURE, GENRE_VIEW_SUCCESS, GENRE_VIEW_FAILURE, RANDOM_SUCCESS, RANDOM_FAILURE, DISCOVERHOME_SUCCESS, DISCOVERHOME_FAILURE, DISCOVERRECOMMENDED_SUCCESS, DISCOVERRECOMMENDED_FAILURE, DISCOVERGENRE_SUCCESS, DISCOVERGENRE_FAILURE, DISCOVEREXPERTISE_SUCCESS, DISCOVEREXPERTISE_FAILURE, DISCOVERRECENTLY_SUCCESS, DISCOVERRECENTLY_FAILURE, DISCOVERLOCATION_SUCCESS, DISCOVERLOCATION_FAILURE, DISCOVERTRENDING_SUCCESS, DISCOVERTRENDING_FAILURE, DISCOVERMYNETWORK_SUCCESS, DISCOVERMYNETWORK_FAILURE } from './types';
import { IHomeItem, IHowItWorkItem } from '../../utils/models/other.model';
  
// TypeScript infers that this function is returning SendMessageAction
export function expertiseViewSuccess(data: any[]): DiscoveryActionType {
  return {
    type: EXPERTISE_VIEW_SUCCESS,
    payload: data
  }
}  

export function expertiseViewFailure(): DiscoveryActionType {
  return {
    type: EXPERTISE_VIEW_FAILURE,
  }
}    
// TypeScript infers that this function is returning SendMessageAction
export function discoverySuccess(data: any[]): DiscoveryActionType {
  return {
    type: DISCOVER_SUCCESS,
    payload: data
  }
}  

export function discoveryFailure(): DiscoveryActionType {
  return {
    type: DISCOVER_FAILURE, 
  }
}    
// TypeScript infers that this function is returning SendMessageAction
export function discoveryFeaturedSuccess(data: any[]): DiscoveryActionType {
  return {
    type: DISCOVER_FEATURED_LIST_SUCCESS,
    payload: data
  }
}  

export function discoveryFeaturedFailure(): DiscoveryActionType {
  return {
    type: DISCOVER_FEATURED_LIST_FAILURE, 
  }
}    
 
// TypeScript infers that this function is returning SendMessageAction
export function recommendedSuccess(data: any[]): DiscoveryActionType {
  return {
    type: RECOMMENDED_SUCCESS,
    payload: data
  }
}  

export function recommendedFailure(): DiscoveryActionType {
  return {
    type: RECOMMENDED_FAILURE, 
  }
}   
 
// TypeScript infers that this function is returning SendMessageAction
export function recentlyJoinedSuccess(data: any[]): DiscoveryActionType {
  return {
    type: RECENT_JOINED_SUCCESS,
    payload: data
  }
}  

export function recmentlyJoinedFailure(): DiscoveryActionType {
  return {
    type: RECENT_JOINED_FAILURE, 
  }
}    

 
// TypeScript infers that this function is returning SendMessageAction
export function trendingSuccess(data: any[]): DiscoveryActionType {
  return {
    type: TRENDING_SUCCESS,
    payload: data
  }
}  

export function trendingFailure(): DiscoveryActionType {
  return {
    type: TRENDING_FAILURE, 
  }
}
 
// TypeScript infers that this function is returning SendMessageAction
export function locationSuccess(data: any[]): DiscoveryActionType {
  return {
    type: LOCATION_SUCCESS,
    payload: data
  }
}  

export function locationFailure(): DiscoveryActionType {
  return {
    type: LOCATION_FAILURE, 
  }
}   
 
// TypeScript infers that this function is returning SendMessageAction
export function genreViewSuccess(data: any[]): DiscoveryActionType {
  return {
    type: GENRE_VIEW_SUCCESS,
    payload: data
  }
}  

export function genreViewFailure(): DiscoveryActionType {
  return {
    type: GENRE_VIEW_FAILURE, 
  }
}  
 
// TypeScript infers that this function is returning SendMessageAction
export function randomSuccess(data: any[]): DiscoveryActionType {
  return {
    type: RANDOM_SUCCESS,
    payload: data
  }
}  

export function randomFailure(): DiscoveryActionType {
  return {
    type: RANDOM_FAILURE, 
  }
}    

export function discoverHomeSuccess(data: IHowItWorkItem): any {
  return {
    type: DISCOVERHOME_SUCCESS,
    payload: data
  }
}  

export function discoverHomeFailure(): any {
  return {
    type: DISCOVERHOME_FAILURE, 
  }
}  

export function discoverRecommendedSuccess(data: IHowItWorkItem): any {
  return {
    type: DISCOVERRECOMMENDED_SUCCESS,
    payload: data
  }
}  

export function discoverRecommendedFailure(): any {
  return {
    type: DISCOVERRECOMMENDED_FAILURE, 
  }
}  

export function discoverGenreSuccess(data: IHowItWorkItem): any {
  return {
    type: DISCOVERGENRE_SUCCESS,
    payload: data
  }
}  

export function discoverGenreFailure(): any {
  return {
    type: DISCOVERGENRE_FAILURE, 
  }
} 

export function discoverExpertiseSuccess(data: IHowItWorkItem): any {
  return {
    type: DISCOVEREXPERTISE_SUCCESS,
    payload: data
  }
}  

export function discoverExpertiseFailure(): any {
  return {
    type: DISCOVEREXPERTISE_FAILURE, 
  }
} 

export function discoverRecentlySuccess(data: IHowItWorkItem): any {
  return {
    type: DISCOVERRECENTLY_SUCCESS,
    payload: data
  }
}  

export function discoverRecentlyFailure(): any {
  return {
    type: DISCOVERRECENTLY_FAILURE, 
  }
} 

export function discoverLocationSuccess(data: IHowItWorkItem): any {
  return {
    type: DISCOVERLOCATION_SUCCESS,
    payload: data
  }
}  

export function discoverLocationFailure(): any {
  return {
    type: DISCOVERLOCATION_FAILURE, 
  }
} 

export function discoverTrendingSuccess(data: IHowItWorkItem): any {
  return {
    type: DISCOVERTRENDING_SUCCESS,
    payload: data
  }
}  

export function discoverTrendingFailure(): any {
  return {
    type: DISCOVERTRENDING_FAILURE, 
  }
}

export function discoverNetworkSuccess(data: IHowItWorkItem): any {
  return {
    type: DISCOVERMYNETWORK_SUCCESS,
    payload: data
  }
}  

export function discoverNetworkFailure(): any {
  return {
    type: DISCOVERMYNETWORK_FAILURE, 
  }
}


export const getExpertiseView = (expertise_id: string) =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let query = expertise_id ? `?expertise_id=${expertise_id}` : "";
      let res = await API().get(API_PATH.EXPERTISE_VIEW + query );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(expertiseViewSuccess(data.data))
      }else{
        dispatch(expertiseViewFailure())
      }
      resolve({data: data.data.message})
    } catch (error) {
      dispatch(expertiseViewFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}   

export const discovery = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.DISCOVER );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(discoverySuccess(data.data))
      }else{
        dispatch(discoveryFailure())
      }
      resolve({data: data.data.message})
    } catch (error) {
      dispatch(discoveryFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}


export const discoveryFeatured = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.DISCOVER_FEATURED_LIST );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(discoveryFeaturedSuccess(data.data))
      }else{
        dispatch(discoveryFeaturedFailure())
      }
      resolve({data: data.data.message})
    } catch (error) {
      dispatch(discoveryFeaturedFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}

export const recommended = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.RECOMMENDED );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(recommendedSuccess(data.data))
      }else{
        dispatch(recommendedFailure())
      }
      resolve({data: data.data.message})
    } catch (error) {
      dispatch(recommendedFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}

export const recentlyJoined = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.RECENT_JOINED );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(recentlyJoinedSuccess(data.data))
      }else{
        dispatch(recmentlyJoinedFailure())
      }
      resolve({data: data.data.message})
    } catch (error) {
      dispatch(recmentlyJoinedFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}

export const trending = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.TRENDING );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(trendingSuccess(data.data))
      }else{
        dispatch(trendingFailure())
      }
      resolve({data: data.data.message})
    } catch (error) {
      dispatch(trendingFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}

export const location = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.LOCATION );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(locationSuccess(data.data))
      }else{
        dispatch(locationFailure())
      }
      resolve({data: data.data.message})
    } catch (error) {
      dispatch(locationFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}

export const searchlocation = (payload: any) =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.LOCATION_SEARCH, {
        params: payload} );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(locationSuccess(data.data))
      }else{
        dispatch(locationFailure())
      }
      resolve({data: data.data.message})
    } catch (error) {
      dispatch(locationFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}

export const genreView = (genre_id?: string) =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let query = genre_id ? `?genre_id=${genre_id}` : "";
      let res = await API().get(API_PATH.GENRE_VIEW + query );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(genreViewSuccess(data.data))
      }else{
        dispatch(genreViewFailure())
      }
      resolve({data: data.data.message})
    } catch (error) {
      dispatch(genreViewFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}

export const random = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.RANDOM );
      const data = res.data ; 
      dispatch(loadingAction(false));
       if(data.success){
        dispatch(randomSuccess(data.data))
      }else{
        dispatch(randomFailure())
      }
      console.log('##E s', data.data );
      resolve({data: data.data.message})
    } catch (error) {
      console.log('##E', error);
      dispatch(randomFailure());
      dispatch(loadingAction(false));
      reject({error: error} )
    }
  });
}

export const discoverHomeData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHowItWorkItem>(API_PATH.DISCOVERHOME_DATA );
      dispatch(discoverHomeSuccess(data.data));
    } catch (error) {
      dispatch(discoverHomeFailure());
    }
  });
}

export const discoverRecommendedData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHowItWorkItem>(API_PATH.DISCOVERRECOMMENDED_DATA );
      dispatch(discoverRecommendedSuccess(data.data));
    } catch (error) {
      dispatch(discoverRecommendedFailure());
    }
  });
}

export const discoverGenreData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHowItWorkItem>(API_PATH.DISCOVERGENRE_DATA );
      dispatch(discoverGenreSuccess(data.data));
    } catch (error) {
      dispatch(discoverGenreFailure());
    }
  });
}
 
export const discoverExpertiseData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHowItWorkItem>(API_PATH.DISCOVEREXPERTISE_DATA );
      dispatch(discoverExpertiseSuccess(data.data));
    } catch (error) {
      dispatch(discoverExpertiseFailure());
    }
  });
}

export const discoverRecentlyData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHowItWorkItem>(API_PATH.DISCOVERRECENTLY_DATA );
      dispatch(discoverRecentlySuccess(data.data));
    } catch (error) {
      dispatch(discoverRecentlyFailure());
    }
  });
}

export const discoverLocationData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHowItWorkItem>(API_PATH.DISCOVERLOCATION_DATA );
      dispatch(discoverLocationSuccess(data.data));
    } catch (error) {
      dispatch(discoverLocationFailure());
    }
  });
}

export const discoverTrendingData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHowItWorkItem>(API_PATH.DISCOVERTRENDING_DATA );
      dispatch(discoverTrendingSuccess(data.data));
    } catch (error) {
      dispatch(discoverTrendingFailure());
    }
  });
}

export const discoverMyNetworkData = () =>  (dispatch: Dispatch) => {
  return new Promise(async(resolve, reject) => {
    try {
      let data = await API().get<IHowItWorkItem>(API_PATH.DISCOVERNETWORK_DATA );
      dispatch(discoverNetworkSuccess(data.data));
    } catch (error) {
      dispatch(discoverNetworkFailure());
    }
  });
}