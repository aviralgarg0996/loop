 import { Track } from "../../utils/models/user/response.model";

export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_FAILURE = 'EDIT_PROFILE_FAILURE';

export const TRACK_LIST_SUCCESS = 'TRACK_LIST_SUCCESS';
export const TRACK_LIST_FAILURE = 'TRACK_LIST_FAILURE';
export const PLAY_TRACK_SUCCESS = 'PLAY_TRACK_SUCCESS';
 
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
 
export const GET_PROFILE_ID_SUCCESS = 'GET_PROFILE_ID_SUCCESS';
export const GET_PROFILE_ID_FAILURE = 'GET_PROFILE_ID_FAILURE';

export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS';
export const NOTIFICATION_FAILURE = 'NOTIFICATION_FAILURE';

export const VOX_USERS_SUCCESS = 'VOX_USERS_SUCCESS';
export const VOX_USERS_FAILURE = 'VOX_USERS_FAILURE';

export const UPPDATE_CONVERSATION_HISTORY_SUCCESS = 'UPPDATE_CONVERSATION_HISTORY_SUCCESS';
export const UPPDATE_CONVERSATION_HISTORY_FAILURE = 'UPPDATE_CONVERSATION_HISTORY';

export const UPPDATE_CURRENT_CONVERSATION_ID_SUCCESS = 'UPPDATE_CURRENT_CONVERSATION_ID_SUCCESS';
export const UPPDATE_CURRENT_CONVERSATION_ID_FAILURE = 'UPPDATE_CURRENT_CONVERSATION_ID_FAILURE';

export const UPPDATE_VOX_USERS_SUCCESS = 'UPPDATE_VOX_USERS_SUCCESS';
export const UPPDATE_VOX_CONVERSATION_SUCCESS = 'UPPDATE_VOX_CONVERSATION_SUCCESS';


interface PlayTrackSuccessAction {
  type: typeof PLAY_TRACK_SUCCESS,
  payload: any
}

interface EditProfileSuccessAction {
  type: typeof EDIT_PROFILE_SUCCESS,
}

interface TrackListSuccessAction {
  type: typeof TRACK_LIST_SUCCESS,
  payload: Track[]
}

interface TrackListFailureAction {
  type: typeof TRACK_LIST_FAILURE
}

interface GetProfileSuccessAction {
  type: typeof GET_PROFILE_SUCCESS,
  payload: any
}

interface GetProfileFailureAction {
  type: typeof GET_PROFILE_FAILURE
}


interface ProfileByIdSuccessAction {
  type: typeof GET_PROFILE_ID_SUCCESS,
  payload: any
}

interface ProfileByIdFailureAction {
  type: typeof GET_PROFILE_ID_FAILURE
}

interface NotificationSuccessAction {
  type: typeof NOTIFICATION_SUCCESS,
  payload: any
}

interface NotificationFailureAction {
  type: typeof NOTIFICATION_FAILURE, 
}

interface VoxUsersSuccessAction {
  type: typeof VOX_USERS_SUCCESS,
  payload: any
}

interface VoxUsersFailureAction {
  type: typeof VOX_USERS_FAILURE, 
}

interface UpdateConversationHistorySuccessAction {
  type: typeof UPPDATE_CONVERSATION_HISTORY_SUCCESS,
  payload: any
}

interface UpdateConversationHistoryFailureAction {
  type: typeof UPPDATE_CONVERSATION_HISTORY_FAILURE, 
}

interface UpdateCurrentConversationIdSuccessAction {
  type: typeof UPPDATE_CURRENT_CONVERSATION_ID_SUCCESS,
  payload: any
}

interface UpdateCurrentConversationIdFailureAction {
  type: typeof UPPDATE_CURRENT_CONVERSATION_ID_FAILURE, 
}

interface updateVoxUsersSuccess {
  type: typeof UPPDATE_VOX_USERS_SUCCESS, 
  payload: any,
}


interface updateVoxConversationSuccess {
  type: typeof UPPDATE_VOX_CONVERSATION_SUCCESS, 
  payload: any,
}

export type EditProfileActionType = NotificationSuccessAction | NotificationFailureAction |  ProfileByIdSuccessAction | ProfileByIdFailureAction | PlayTrackSuccessAction | GetProfileSuccessAction | GetProfileFailureAction | TrackListFailureAction | TrackListSuccessAction | EditProfileSuccessAction | VoxUsersSuccessAction | VoxUsersFailureAction | UpdateConversationHistorySuccessAction | UpdateConversationHistoryFailureAction | UpdateCurrentConversationIdSuccessAction | UpdateCurrentConversationIdFailureAction | updateVoxUsersSuccess | updateVoxConversationSuccess;