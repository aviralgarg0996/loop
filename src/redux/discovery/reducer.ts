import { discovery, recommended } from './action';
import { boolean } from "yup";
import { DiscoveryActionType, EXPERTISE_VIEW_SUCCESS, EXPERTISE_VIEW_FAILURE, DISCOVER_SUCCESS, 
    DISCOVER_FAILURE, DISCOVER_FEATURED_LIST_SUCCESS, DISCOVER_FEATURED_LIST_FAILURE,
     RECOMMENDED_FAILURE, RECOMMENDED_SUCCESS, RECENT_JOINED_SUCCESS, RECENT_JOINED_FAILURE, 
     TRENDING_SUCCESS, TRENDING_FAILURE, LOCATION_SUCCESS, LOCATION_FAILURE, GENRE_VIEW_SUCCESS,
      GENRE_VIEW_FAILURE, RANDOM_SUCCESS, RANDOM_FAILURE, DISCOVERHOME_SUCCESS, DISCOVERHOME_FAILURE, DISCOVERRECOMMENDED_SUCCESS, DISCOVERRECOMMENDED_FAILURE, DISCOVERGENRE_SUCCESS, DISCOVERGENRE_FAILURE, DISCOVEREXPERTISE_SUCCESS, DISCOVEREXPERTISE_FAILURE, DISCOVERRECENTLY_SUCCESS, DISCOVERRECENTLY_FAILURE, DISCOVERLOCATION_SUCCESS, DISCOVERLOCATION_FAILURE, DISCOVERTRENDING_SUCCESS, DISCOVERTRENDING_FAILURE, DISCOVERMYNETWORK_SUCCESS, DISCOVERMYNETWORK_FAILURE } from "./types";

const initialState : any = {
    expertiseView: [], 
    discover: [], 
    discoverFeatured: [],
    recommended: [],
    recentJoined: [],
    trending: [],
    location: [],
    genreView:[],
    random: [], 
    disData: [],
    recData: [],
    genData: [],
    expData: [],
    recentData: [],
    locData: [],
    trendData: [],
    myNetData: [],
    loading: false
}

export const DiscoveryReducer = (state= initialState, action: DiscoveryActionType) : any => {
    switch(action.type){
        case DISCOVERHOME_SUCCESS:
            return {
                ...state,
                disData: action.payload.data,
            }
        case DISCOVERHOME_FAILURE:
            return {
                ...state,
                disData: [],
            }
        case DISCOVERRECOMMENDED_SUCCESS:
            return {
                ...state,
                recData: action.payload.data,
            }
        case DISCOVERRECOMMENDED_FAILURE:
            return {
                ...state,
                recData: [],
            }
        case DISCOVERGENRE_SUCCESS:
            return {
                ...state,
                genData: action.payload.data,
            }
        case DISCOVERGENRE_FAILURE:
            return {
                ...state,
                genData: [],
            }
        case DISCOVEREXPERTISE_SUCCESS:
            return {
                ...state,
                expData: action.payload.data,
            }
        case DISCOVEREXPERTISE_FAILURE:
            return {
                ...state,
                expData: [],
            }
        case DISCOVERRECENTLY_SUCCESS:
            return {
                ...state,
                recentData: action.payload.data,
            }
        case DISCOVERRECENTLY_FAILURE:
            return {
                ...state,
                expData: [],
            }
        case DISCOVERLOCATION_SUCCESS:
            return {
                ...state,
                locData: action.payload.data,
            }
        case DISCOVERLOCATION_FAILURE:
            return {
                ...state,
                locData: [],
            }
        case DISCOVERTRENDING_SUCCESS:
            return {
                ...state,
                trendData: action.payload.data,
            }
        case DISCOVERTRENDING_FAILURE:
            return {
                ...state,
                trendData: [],
            }
        case DISCOVERMYNETWORK_SUCCESS:
            return {
                ...state,
                myNetData: action.payload.data,
            }
        case DISCOVERMYNETWORK_FAILURE:
            return {
                ...state,
                myNetData: [],
            }
        case EXPERTISE_VIEW_SUCCESS:
            return {
                ...state,
                expertiseView: action.payload,
            }
        case EXPERTISE_VIEW_FAILURE:
            return {
                ...state,
                expertiseView: [],
            }
        case DISCOVER_SUCCESS:
            return {
                ...state,
                discover: action.payload,
            }
        case DISCOVER_FAILURE:
            return {
                ...state,
                discover: [],
            }
        case DISCOVER_FEATURED_LIST_SUCCESS:
            return {
                ...state,
                discoverFeatured: action.payload,
            }
        case DISCOVER_FEATURED_LIST_FAILURE:
            return {
                ...state,
                discoverFeatured: [],
            } 
        case RECOMMENDED_SUCCESS:
            return {
                ...state,
                recommended: action.payload,
            }
        case RECOMMENDED_FAILURE:
            return {
                ...state,
                recommended: [],
            } 
        case RECENT_JOINED_SUCCESS:
            return {
                ...state,
                recentJoined: action.payload,
            }
        case RECENT_JOINED_FAILURE:
            return {
                ...state,
                recentJoined: [],
            } 
        case TRENDING_SUCCESS:
            return {
                ...state,
                trending: action.payload,
            }
        case TRENDING_FAILURE:
            return {
                ...state,
                trending: [],
            } 
        case LOCATION_SUCCESS:
            return {
                ...state,
                location: action.payload,
            }
        case LOCATION_FAILURE:
            return {
                ...state,
                location: [],
            } 
        case GENRE_VIEW_SUCCESS:
            return {
                ...state,
                genreView: action.payload,
            }
        case GENRE_VIEW_FAILURE:
            return {
                ...state,
                genreView: [],
            } 
        case RANDOM_SUCCESS:
            return {
                ...state,
                random: action.payload,
            }
        case RANDOM_FAILURE:
            return {
                ...state,
                random: [],
            }
        
        default:
           return state;    
    }
}