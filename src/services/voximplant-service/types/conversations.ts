export interface ConversationsState {
    currentUser: User | any;
    conversations: Conversation[] | [];
    conversationsHistory: any;
    users: User[] | [];
    currentConversationId: number;
    typingUsers: string[];
    onlineUsers: string[];
  }
  
  export interface User {
    userId: number;
    conversationsList: any;
    displayName: string;
    userName: string;
    customData: UserCustomData;
  }
  
  export interface Conversation {
    uuid: number;
    createdAt: number;
    lastUpdate: number;
    direct: boolean;
    publicJoin: boolean;
    uberConversation: boolean;
    lastSeq: number;
    title: string;
    participants: Participant[];
    customData: ChatCustomData;
  }
  
  export interface ChatCustomData {
    type: 'chat' | 'channel' | 'direct';
    image?: string;
    description?: string;
    permissions: Permissions;
  }
  
  export interface UserCustomData {
    image?: string;
    status?: string;
  }
  
  export interface Permissions {
    canWrite: boolean;
    canEdit: boolean;
    canRemove: boolean;
    canManageParticipants: boolean;
    canEditAll: boolean;
    canRemoveAll: boolean;
    isOwner?: boolean;
  }
  
  export interface Participant extends Permissions {
    lastRead: number;
    userId: number;
  }
  
  export interface NewChatData {
    title: string;
    usersId: number[];
    isPublic: boolean;
    isUber: boolean;
    avatar?: number;
    description?: string;
  }
  
  export interface InitialData {
    currentUser: User;
    users: User[];
    conversations: Conversation[];
  }
  
  export interface Message {
    uuid: string;
    timestamp: number;
    seq: number;
    sender: number;
    user: User;
    markAsRead: boolean;
  }
  