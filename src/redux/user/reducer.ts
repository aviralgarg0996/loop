import { boolean } from 'yup';
import {
  EditProfileActionType,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  PLAY_TRACK_SUCCESS,
  GET_PROFILE_ID_SUCCESS,
  GET_PROFILE_ID_FAILURE,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
  VOX_USERS_SUCCESS,
  VOX_USERS_FAILURE,
  UPPDATE_CONVERSATION_HISTORY_SUCCESS,
  UPPDATE_CONVERSATION_HISTORY_FAILURE,
  UPPDATE_CURRENT_CONVERSATION_ID_SUCCESS,
  UPPDATE_CURRENT_CONVERSATION_ID_FAILURE,
} from './types';

const initialState: any = {
  profile: undefined,
  profileById: undefined,
  loading: false,
  playingTrack: undefined,
  vox_users: {},
  currentConversationId: '',
  conversationHistory: {},
};

export const UserReducer = (
  state = initialState,
  action: EditProfileActionType
): any => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    case GET_PROFILE_FAILURE:
      return {
        ...state,
        profile: undefined,
      };
    case GET_PROFILE_ID_SUCCESS:
      return {
        ...state,
        profileById: action.payload,
      };
    case GET_PROFILE_ID_FAILURE:
      return {
        ...state,
        profileById: undefined,
      };
    case PLAY_TRACK_SUCCESS:
      console.log('#redice', action);
      return {
        ...state,
        playingTrack: { ...action.payload },
      };
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: action.payload,
      };
    case NOTIFICATION_FAILURE:
      return {
        ...state,
        notification: [],
      };
    case VOX_USERS_SUCCESS:
      return {
        ...state,
        vox_users: action.payload,
      };
    case VOX_USERS_FAILURE:
      return {
        ...state,
        vox_users: {},
      };
    case UPPDATE_CONVERSATION_HISTORY_SUCCESS:
      return {
        ...state,
        conversationHistory: action.payload,
      };
    case UPPDATE_CONVERSATION_HISTORY_FAILURE:
      return {
        ...state,
        conversationHistory: {},
      };
    case UPPDATE_CURRENT_CONVERSATION_ID_SUCCESS:
      return {
        ...state,
        currentConversationId: action.payload,
      };
    case UPPDATE_CURRENT_CONVERSATION_ID_FAILURE:
      return {
        ...state,
        currentConversationId: '',
      };
    default:
      return state;
  }
};
