 import { Track } from "../../utils/models/user/response.model";

 export const EXPERTISE_VIEW_SUCCESS = 'EXPERTISE_VIEW_SUCCESS';
 export const EXPERTISE_VIEW_FAILURE = 'EXPERTISE_VIEW_FAILURE';

export const DISCOVER_SUCCESS = 'DISCOVER_SUCCESS';
export const DISCOVER_FAILURE = 'DISCOVER_FAILURE';

export const DISCOVER_FEATURED_LIST_SUCCESS = 'DISCOVER_FEATURED_LIST_SUCCESS';
export const DISCOVER_FEATURED_LIST_FAILURE = 'DISCOVER_FEATURED_LIST_FAILURE';

export const RECOMMENDED_SUCCESS = 'RECOMMENDED_SUCCESS';
export const RECOMMENDED_FAILURE = 'RECOMMENDED_FAILURE';

export const RECENT_JOINED_SUCCESS = 'RECENT_JOINED_SUCCESS';
export const RECENT_JOINED_FAILURE = 'RECENT_JOINED_FAILURE';

export const TRENDING_SUCCESS = 'TRENDING_SUCCESS';
export const TRENDING_FAILURE = 'TRENDING_FAILURE';

export const LOCATION_SUCCESS = 'LOCATION_SUCCESS';
export const LOCATION_FAILURE = 'LOCATION_FAILURE';

export const GENRE_VIEW_SUCCESS = 'GENRE_VIEW_SUCCESS';
export const GENRE_VIEW_FAILURE = 'GENRE_VIEW_FAILURE';

export const RANDOM_SUCCESS = 'RANDOM_SUCCESS';
export const RANDOM_FAILURE = 'RANDOM_FAILURE';

export const DISCOVERHOME_SUCCESS = 'DISCOVERHOME_SUCCESS';
export const DISCOVERHOME_FAILURE = 'DISCOVERHOME_FAILURE';

export const DISCOVERRECOMMENDED_SUCCESS = 'DISCOVERRECOMMENDED_SUCCESS';
export const DISCOVERRECOMMENDED_FAILURE = 'DISCOVERRECOMMENDED_FAILURE';

export const DISCOVERGENRE_SUCCESS = 'DISCOVERGENRE_SUCCESS';
export const DISCOVERGENRE_FAILURE = 'DISCOVERGENRE_FAILURE';

export const DISCOVEREXPERTISE_SUCCESS = 'DISCOVEREXPERTISE_SUCCESS';
export const DISCOVEREXPERTISE_FAILURE = 'DISCOVEREXPERTISE_FAILURE';

export const DISCOVERRECENTLY_SUCCESS = 'DISCOVERRECENTLY_SUCCESS';
export const DISCOVERRECENTLY_FAILURE = 'DISCOVERRECENTLY_FAILURE';

export const DISCOVERLOCATION_SUCCESS = 'DISCOVERLOCATION_SUCCESS';
export const DISCOVERLOCATION_FAILURE = 'DISCOVERLOCATION_FAILURE';

export const DISCOVERTRENDING_SUCCESS = 'DISCOVERTRENDING_SUCCESS';
export const DISCOVERTRENDING_FAILURE = 'DISCOVERTRENDING_FAILURE';

export const DISCOVERMYNETWORK_SUCCESS = 'DISCOVERMYNETWORK_SUCCESS';
export const DISCOVERMYNETWORK_FAILURE = 'DISCOVERMYNETWORK_FAILURE';

interface ExpertiseViewSuccessAction {
  type: typeof EXPERTISE_VIEW_SUCCESS,
  payload: any
}

interface ExpertiseViewFailureAction {
  type: typeof EXPERTISE_VIEW_FAILURE, 
}

interface DiscoverySuccessAction {
  type: typeof DISCOVER_SUCCESS,
  payload: any
}

interface DiscoveryFailureAction {
  type: typeof DISCOVER_FAILURE, 
}

interface DiscoveryFeaturedSuccessAction {
  type: typeof DISCOVER_FEATURED_LIST_SUCCESS,
  payload: any
}

interface DiscoveryFeaturedFailureAction {
  type: typeof DISCOVER_FEATURED_LIST_FAILURE, 
}

interface RecommendedSuccessAction {
  type: typeof RECOMMENDED_SUCCESS,
  payload: any
}

interface RecommendedFailureAction {
  type: typeof RECOMMENDED_FAILURE, 
}

interface RecentlyJoinedSuccessAction {
  type: typeof RECENT_JOINED_SUCCESS,
  payload: any
}

interface RecentlyJoinedFailureAction {
  type: typeof RECENT_JOINED_FAILURE, 
}

interface TrendingSuccessAction {
  type: typeof TRENDING_SUCCESS,
  payload: any
}

interface TrendingFailureAction {
  type: typeof TRENDING_FAILURE, 
}

interface LocationSuccessAction {
  type: typeof LOCATION_SUCCESS,
  payload: any
}

interface LocationFailureAction {
  type: typeof LOCATION_FAILURE, 
}

interface GenreViewSuccessAction {
  type: typeof GENRE_VIEW_SUCCESS,
  payload: any
}

interface GenreViewFailureAction {
  type: typeof GENRE_VIEW_FAILURE, 
}

interface RandomSuccessAction {
  type: typeof RANDOM_SUCCESS,
  payload: any
}

interface RandomFailureAction {
  type: typeof RANDOM_FAILURE, 
} 

interface DiscoverHomeSuccessAction {
  type: typeof DISCOVERHOME_SUCCESS,
  payload: any
}

interface DiscoverHomeFailureAction {
  type: typeof DISCOVERHOME_FAILURE, 
} 

interface DiscoverRecommendedSuccessAction {
  type: typeof DISCOVERRECOMMENDED_SUCCESS,
  payload: any
}

interface DiscoverRecommendedFailureAction {
  type: typeof DISCOVERRECOMMENDED_FAILURE, 
}

interface DiscoverGenreSuccessAction {
  type: typeof DISCOVERGENRE_SUCCESS,
  payload: any
}

interface DiscoverGenreFailureAction {
  type: typeof DISCOVERGENRE_FAILURE, 
} 

interface DiscoverExpertiseSuccessAction {
  type: typeof DISCOVEREXPERTISE_SUCCESS,
  payload: any
}

interface DiscoverExpertiseFailureAction {
  type: typeof DISCOVEREXPERTISE_FAILURE, 
}

interface DiscoverRecentlySuccessAction {
  type: typeof DISCOVERRECENTLY_SUCCESS,
  payload: any
}

interface DiscoverRecentlyFailureAction {
  type: typeof DISCOVERRECENTLY_FAILURE, 
}

interface DiscoverLocationSuccessAction {
  type: typeof DISCOVERLOCATION_SUCCESS,
  payload: any
}

interface DiscoverLocationFailureAction {
  type: typeof DISCOVERLOCATION_FAILURE,
  payload: any
}

interface DiscoverTrendingSuccessAction {
  type: typeof DISCOVERTRENDING_SUCCESS,
  payload: any
}
interface DiscoverTrendingFailureAction {
  type: typeof DISCOVERTRENDING_FAILURE, 
}


interface DiscoverMyNetworkSuccessAction {
  type: typeof DISCOVERMYNETWORK_SUCCESS,
  payload: any
}
interface DiscoverMyNetworkFailureAction {
  type: typeof DISCOVERMYNETWORK_FAILURE, 
}

export type DiscoveryActionType = ExpertiseViewSuccessAction | RandomFailureAction | RandomSuccessAction | GenreViewFailureAction | GenreViewSuccessAction
                                | LocationFailureAction | LocationSuccessAction | TrendingFailureAction | TrendingSuccessAction | RecentlyJoinedFailureAction 
                                | RecentlyJoinedSuccessAction | RecommendedFailureAction | RecommendedSuccessAction | DiscoveryFeaturedFailureAction | DiscoveryFeaturedSuccessAction
                                | DiscoveryFailureAction | DiscoverySuccessAction | ExpertiseViewFailureAction 
                                | DiscoverHomeSuccessAction | DiscoverHomeFailureAction | DiscoverRecommendedSuccessAction | DiscoverRecommendedFailureAction 
                                | DiscoverGenreSuccessAction | DiscoverGenreFailureAction | DiscoverExpertiseSuccessAction | DiscoverExpertiseFailureAction
                                | DiscoverRecentlySuccessAction | DiscoverRecentlyFailureAction
                                | DiscoverLocationSuccessAction | DiscoverLocationFailureAction
                                | DiscoverTrendingSuccessAction | DiscoverTrendingFailureAction
                                |DiscoverMyNetworkSuccessAction | DiscoverMyNetworkFailureAction
                                ;