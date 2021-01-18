import { TrackResponse, Track } from './../../utils/models/user/response.model';
import { IUserDetail } from '../../utils/models/user/request.model';
import { Dispatch } from 'redux';
import API_PATH from '../../services/api-service/api-path';
import API from '../../services/api-service/api';
import {
  TRACK_LIST_SUCCESS,
  EditProfileActionType,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILURE,
  PLAY_TRACK_SUCCESS,
  TRACK_LIST_FAILURE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_ID_SUCCESS,
  GET_PROFILE_ID_FAILURE,
  VOX_USERS_SUCCESS,
  VOX_USERS_FAILURE,
  UPPDATE_CONVERSATION_HISTORY_SUCCESS,
  UPPDATE_CONVERSATION_HISTORY_FAILURE,
  UPPDATE_CURRENT_CONVERSATION_ID_SUCCESS,
  UPPDATE_CURRENT_CONVERSATION_ID_FAILURE,
  UPPDATE_VOX_USERS_SUCCESS,
  UPPDATE_VOX_CONVERSATION_SUCCESS,
} from './types';
import { loadingAction, voxLoadingAction } from '../auth/action';
import store, { history } from '../../store';
import MessengerService from '../../services/voximplant-service/messenger.service';
import _ from 'lodash';

const TYPE_CONVERSATION = {
  direct: 'direct',
  chat: 'chat',
  channel: 'channel',
};

// TypeScript infers that this function is returning SendMessageAction
export function playTrackSuccess(data: any): EditProfileActionType {
  return {
    type: PLAY_TRACK_SUCCESS,
    payload: data,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function trackListSuccess(trackList: Track[]): EditProfileActionType {
  return {
    type: TRACK_LIST_SUCCESS,
    payload: trackList,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function getProfileSuccess(profile: any): EditProfileActionType {
  console.log('profile', profile);

  return {
    type: GET_PROFILE_SUCCESS,
    payload: profile,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function getProfileFailure(): EditProfileActionType {
  return {
    type: GET_PROFILE_FAILURE,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function getVoxUsersSuccess(users: any): EditProfileActionType {
  return {
    type: VOX_USERS_SUCCESS,
    payload: users,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function getVoxUsersFailure(): EditProfileActionType {
  return {
    type: VOX_USERS_FAILURE,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function updateCurrentConversationHistorySuccess(
  conversationHistory: any
): EditProfileActionType {
  return {
    type: UPPDATE_CONVERSATION_HISTORY_SUCCESS,
    payload: conversationHistory,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function updateCurrentConversationHistoryFailure(): EditProfileActionType {
  return {
    type: UPPDATE_CONVERSATION_HISTORY_FAILURE,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function updateCurrentConversationIdSuccess(
  uuid: any
): EditProfileActionType {
  return {
    type: UPPDATE_CURRENT_CONVERSATION_ID_SUCCESS,
    payload: uuid,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function updateCurrentConversationIdFailure(): EditProfileActionType {
  return {
    type: UPPDATE_CURRENT_CONVERSATION_ID_FAILURE,
  };
}

export function updateVoxUsersSuccess(users: any): EditProfileActionType {
  return {
    type: UPPDATE_VOX_USERS_SUCCESS,
    payload: users,
  };
}

export function updateVoxConversationSuccess(
  conversation: any
): EditProfileActionType {
  return {
    type: UPPDATE_VOX_CONVERSATION_SUCCESS,
    payload: conversation,
  };
}
// TypeScript infers that this function is returning SendMessageAction
export function getProfileByIdSuccess(profile: any): EditProfileActionType {
  console.log('profile', profile);

  return {
    type: GET_PROFILE_ID_SUCCESS,
    payload: profile,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function getProfileByIdFailure(): EditProfileActionType {
  return {
    type: GET_PROFILE_ID_FAILURE,
  };
}

// TypeScript infers that this function is returning SendMessageAction
export function trackListFailure(): EditProfileActionType {
  return {
    type: TRACK_LIST_FAILURE,
  };
}

export function notificationSuccess(data: any[]): EditProfileActionType {
  return {
    type: NOTIFICATION_SUCCESS,
    payload: data,
  };
}

export function notificationFailure(): EditProfileActionType {
  return {
    type: NOTIFICATION_FAILURE,
  };
}

export const editProfile = (userDetail: IUserDetail) => (
  dispatch: Dispatch
) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.EDIT_PROFILE, userDetail);
      dispatch(loadingAction(false));
      resolve({ data: data.data.message });
    } catch (error) {
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};

export const getProfile = () => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.GET_PROFILE);
      const data = res.data;
      dispatch(loadingAction(false));
      if (data.success) {
        localStorage.setItem('userData', JSON.stringify(data.data));
        dispatch(getProfileSuccess(data.data));
      } else {
        dispatch(getProfileFailure());
      }
      resolve({ data: data.data.message });
    } catch (error) {
      dispatch(getProfileFailure());
      dispatch(loadingAction(false));
      console.log('errorerrorerror', error);
      reject({ error: error });
    }
  });
};

export const getProfileById = (id: string) => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let res = await API().get(API_PATH.GET_PROFILE_BY_ID + '/' + id);
      const data = res.data;
      dispatch(loadingAction(false));
      if (data.success) {
        dispatch(getProfileByIdSuccess(data.data));
      } else {
        dispatch(getProfileByIdFailure());
      }
      resolve({ data: data.data });
    } catch (error) {
      dispatch(getProfileByIdFailure());
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};

export const uploadProfile = (file: FileList) => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('user_image', file[0]);
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.UPLOAD_PROFILE, formData);
      dispatch(loadingAction(false));
      resolve({ data: data.data.message });
    } catch (error) {
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};

export const addTrack = (
  coverFile: FileList,
  trackFile: FileList,
  title: string,
  firstDemoTrack: boolean,
  duration: string
) => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('cover_image', coverFile[0]);
      formData.append('track', trackFile[0]);
      formData.append('name', title);
      formData.append('duration', duration);
      formData.append('primary', firstDemoTrack ? '1' : '0');
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.TRACK_ADD, formData);
      dispatch(loadingAction(false));
      resolve({ data: data.data.message });
    } catch (error) {
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};

export const editTrack = (payload: any) => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.TRACK_EDIT, payload);
      dispatch(loadingAction(false));
      resolve({ data: data.data.message });
    } catch (error) {
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};

export const deleteTrack = (track_id: string) => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post(API_PATH.TRACK_DELETE, { track_id });
      dispatch(loadingAction(false));
      resolve({ data: data.data.message });
    } catch (error) {
      reject({ error: error });
    }
  });
};

export const listTrack = () => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(loadingAction(true));
      let data = await API().post<TrackResponse>(API_PATH.TRACK_LIST);
      dispatch(loadingAction(false));
      dispatch(trackListSuccess(data.data.message));
      resolve({ data: data.data.message });
    } catch (error) {
      dispatch(trackListFailure());
      dispatch(loadingAction(false));
      reject({ error: error });
    }
  });
};

export const playTrack = (item: any, isPaused: boolean) => (
  dispatch: Dispatch
) => {
  return new Promise(async (resolve, reject) => {
    const { user : { playingTrack }} = store.getState();
    dispatch(playTrackSuccess({ ...item, isPaused }));
    if (!_.isEqual(playingTrack && playingTrack.track_id , item && item.track_id)) {
      await API().post(API_PATH.TRACK_TRENDING, { tracks_id : item.track_id });
    }
  });
  
};

export const getNotification = () => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await API().get(API_PATH.GET_NOTIFICATION);
      const data = res.data;
      if (data.success) {
        dispatch(notificationSuccess(data.data));
      } else {
        dispatch(notificationFailure());
      }
    } catch (error) {
      dispatch(notificationFailure());
    }
  });
};

export const readNotification = (id: any) => (dispatch: Dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await API().get(API_PATH.READ_NOTIFICATION + '/' + id);
      const data = res.data;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const currentConversation = (uuid: any) => {
  const {
    user: { vox_users },
    user,
  } = store.getState();
  const con_uuid = uuid || user.currentConversationId;
  return (
    vox_users &&
    vox_users.conversations &&
    vox_users.conversations.find((c: any) => c.uuid === con_uuid)
  );
};

export const setCurrentConversation = (uuid: any) => (dispatch: Dispatch) => {
  if (uuid) dispatch(updateCurrentConversationIdSuccess(uuid));
  else dispatch(updateCurrentConversationIdFailure());
};

export const onMessageSent = (e: any) => {
  e.message.timestamp = e.timestamp;
  e.message.seq = e.seq;
  const { user } = store.getState();

  if (e.message.sender === user.vox_users.currentUser.userId) {
    e.message.user = user.vox_users.currentUser;
  } else {
    e.message.user = user.vox_users.users.find(
      (c: any) => c.userId === e.message.sender
    );
  }
  if (
    user.conversationHistory &&
    user.currentConversationId &&
    e.message.conversation === user.currentConversationId
  ) {
    const conversationsHistoryTemp = {
      ...user.conversationHistory,
      [user.currentConversationId]: [
        ...(user.conversationHistory[user.currentConversationId] || []),
        e.message,
      ],
    };
    console.log("conversationsHistoryTemp", conversationsHistoryTemp);
    store.dispatch(
      updateCurrentConversationHistorySuccess(conversationsHistoryTemp)
    );
  }
};

const currentDirectConversations = (vox_users: any) =>
  vox_users &&
  vox_users.conversations &&
  vox_users.conversations.filter((c: any) => c.direct);

const currentDirectUsersId = (vox_users: any) => {
  const currDirectConversations = currentDirectConversations(vox_users);
  return (
    currDirectConversations &&
    currDirectConversations.reduce((res: number[], d: any) => {
      d.participants.forEach((u: any) => {
        if (u.userId !== vox_users.currentUser.userId) {
          res.push(u.userId);
        }
      });

      return res;
    }, [])
  );
};

export const getDirectConversation = (userId: number) => {
  const { user } = store.getState();
  const currDireactUsersId = currentDirectUsersId(user.vox_users);
  if (currDireactUsersId && currDireactUsersId.includes(userId)) {
    const index = currentDirectUsersId(user.vox_users).indexOf(userId);
    const chatUuid = currentDirectConversations(user.vox_users)[index].uuid;
    store.dispatch(updateCurrentConversationIdSuccess(chatUuid));
  } else {
    MessengerService.get()
      .createDirect(userId)
      .catch(console.log);
  }
};

export const getCurrentConversation = (chatUuid: number | string) => {
  const { user } = store.getState();
  if (typeof chatUuid === 'string') {
    const { user } = store.getState();
    store.dispatch(updateCurrentConversationIdSuccess(chatUuid));
    if (chatUuid && !user.conversationHistory[chatUuid]) {
      getConversationHistory(chatUuid);
    }
  } else if (typeof chatUuid === 'number') {
    getDirectConversation(chatUuid);
  }
};


export const loadAllConversation = (conversations: any[], currentUser: any, vox_users: any[]) => {
  
  let ps:any[] = [];

  conversations && conversations.map((item: any)=> {
    const uuid = item.uuid;
    const lastEvent =
    item.lastEvent
      ? item.lastEvent
      : item.lastSeq;

    ps.push(MessengerService.get()
    .retransmitMessageEvents(item, lastEvent)
    .then((messageEvents: any[]) => {
      let conversationsHistory = {}

      const messages = messageEvents.map(e => {
        e.message.timestamp = e.timestamp;
        e.message.seq = e.seq;

        if (e.message.sender === currentUser.userId) {
          e.message.user = currentUser;
        } else {
          e.message.user = vox_users.find(
            (c: any) => c.userId === e.message.sender
          );
        }

        // TODO 'll highlight to singular dispatch
        // if one participant read a message, it marked as read
        const arrLastRead = item.participants.map((p: any) => {
          return p.userId !== currentUser.userId
            ? p.lastRead
            : 0;
        });

        if (Math.max(...arrLastRead) >= e.seq) {
          e.message.markAsRead = true;
        }

        return e.message;
      });

      if (messages.length > 0) {
        const conversationID = messages[0].conversation;
        conversationsHistory = {
          messages: [...messages],
          uuId: conversationID
        };
      } else {
        conversationsHistory = {
          messages: [...messages],
          uuId: uuid
        };
      }
      return conversationsHistory;
    }));
  });

  store.dispatch(voxLoadingAction(true));
  Promise.all(ps)
    .then((results) => {
      let conversationsHistory = {}
      results && results.map((item:any)=>{
        conversationsHistory = {
          ...conversationsHistory,
          [item.uuId] : item.messages
        }
      })
      store.dispatch(
        updateCurrentConversationHistorySuccess(conversationsHistory)
      );
      store.dispatch(voxLoadingAction(false));
      console.log('load all conversation history success', conversationsHistory);
         // Result of all resolve as an array
    }).catch(err => {
      console.log('load all conversation history error', err);
      store.dispatch(voxLoadingAction(false));
    }); 
}

export const getConversationHistory = async (uuid: any) => {
  const curConversation = currentConversation(uuid);
  const { user } = store.getState();
  const lastEvent =
    user.currentConversationHistory && user.currentConversationHistory.length
      ? curConversation && curConversation.lastEvent
      : curConversation && curConversation.lastSeq;

  if (lastEvent !== 0 && curConversation) {
    store.dispatch(voxLoadingAction(true));
    await MessengerService.get()
      .retransmitMessageEvents(curConversation, lastEvent)
      .then((messageEvents: any[]) => {
        const messages = messageEvents.map(e => {
          e.message.timestamp = e.timestamp;
          e.message.seq = e.seq;

          if (e.message.sender === user.vox_users.currentUser.userId) {
            e.message.user = user.vox_users.currentUser;
          } else {
            e.message.user = user.vox_users.users.find(
              (c: any) => c.userId === e.message.sender
            );
          }

          // TODO 'll highlight to singular dispatch
          // if one participant read a message, it marked as read
          const arrLastRead = curConversation.participants.map((p: any) => {
            return p.userId !== user.vox_users.currentUser.userId
              ? p.lastRead
              : 0;
          });

          if (Math.max(...arrLastRead) >= e.seq) {
            e.message.markAsRead = true;
          }

          return e.message;
        });
        if (messages.length > 0) {
          const conversationID = messages[0].conversation;
          const conversationsHistory = {
            ...user.conversationHistory,
            [conversationID]: [...messages],
          };
          store.dispatch(
            updateCurrentConversationHistorySuccess(conversationsHistory)
          );
        }
        store.dispatch(voxLoadingAction(false));
        // context.dispatch('markedAsRead', context.getters.currentConversation.lastSeq);
      })
      .catch((err: any) => {
        console.log('current conversation error', err);
        store.dispatch(voxLoadingAction(false));
        store.dispatch(updateCurrentConversationHistoryFailure());
      });
  }
};

export const onConversationCreated = (e: any) => {
  console.log('Conversation created', e);
  const { user } = store.getState();

  // Update conversation list
  // TODO commit('updateConversations', e.conversation);
  if (e.conversation.customData.type === 'direct') {
    const participant = e.conversation.participants.find(
      (p: any) => p.userId !== user.vox_users.currentUser.userId
    );
    e.conversation.directUserId = participant.userId;
  }

  // @ts-ignore
  let conversations = [user.vox_users.conversations, e.conversation];
  store.dispatch(updateVoxConversationSuccess(conversations));

  // Set the conversation as a current if it is created by this user
  if (e.initiator === user.vox_users.currentUser.userId) {
    store.dispatch(updateCurrentConversationIdSuccess(e.conversation.uuid));
    history.push(`/hub/chat/collaborators-chat?uuid=${e.conversation.uuid}`);
  } else {
    // Get participants user data if there are new
    const newUsers = e.conversation.participants.filter(
      (p: any) => !user.vox_users.users.some((u: any) => u.userId === p.userId)
    );

    if (newUsers.length) {
      const usersIds = newUsers.map((u: any) => u.userId);
      MessengerService.messenger
        .getUsersById(usersIds)
        .then((events: any) => {
          const users = [
            ...user.vox_users.users,
            events.map((e: any) => e.user),
          ];
          store.dispatch(updateVoxUsersSuccess(users));
        })
        .catch(console.log);
    }
  }

  // Get participant ids excluding the current user
  const otherParticipantIds = e.conversation.participants
    .map((p: any) => p.userId)
    .filter((id: number) => id !== user.vox_users.currentUser.userId);
  // Subscribe to other participant events (info and presence status change)
  if (otherParticipantIds.length) {
    MessengerService.messenger
      .subscribe(otherParticipantIds)
      .then((e: any) => {
        console.log('Subscribed to conversation participants', e);
      })
      .catch(console.log);
  }
};

export const onMessageMarkAsRead = (evt: any) => {
  const { user } = store.getState();
  if (evt.initiator !== user.vox_users.currentUser.userId) {
    const updateHistory = user.conversationsHistory[user.currentConversationId].map((m:any) => {
      if (m.seq >= evt.seq) {
        return {
          ...m,
          markAsRead: true
        }
      }
      return m
    });
    store.dispatch(updateCurrentConversationHistorySuccess(updateHistory));
  }
}

export const createConversation = async (newChat: any) => {
  try {
    let response;
    store.dispatch(voxLoadingAction(true));
    if (newChat.type === TYPE_CONVERSATION.chat) {
      response = await MessengerService.get().createChat(newChat);
    } else if (newChat.type === TYPE_CONVERSATION.channel) {
      response = await MessengerService.get().createChannel(newChat);
    } else if (newChat.type === TYPE_CONVERSATION.direct) {
      response = await MessengerService.get().createDirect(newChat.usersId);
    } else {
      console.log(`Conversation type ${newChat.type} is unknown`);
    }
    store.dispatch(voxLoadingAction(false));
    return response;
  } catch (e) {
    console.log('create conversation error', e);
    store.dispatch(voxLoadingAction(false));
  }
};
