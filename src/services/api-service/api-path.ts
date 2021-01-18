const API_PATH = {
    // auth
    LOGIN : 'api/auth/login',
    REGISTER: 'api/auth/register',
    // home
    CONTACT_US: 'api/home/contact-us',
    //user
    GET_PROFILE: 'api/user/authorized-user-details',
    GET_PROFILE_BY_ID: 'api/user/details', 
    EDIT_PROFILE: 'api/user/edit-details',
    UPLOAD_PROFILE: 'api/user/user-image-upload',
    GET_NOTIFICATION: 'api/alerts/notifications',
    READ_NOTIFICATION: 'api/alerts/notifications/read',
    //track
    TRACK_ADD: 'api/demo-tracks/add',
    TRACK_EDIT: 'api/demo-tracks/edit',
    TRACK_LIST: 'api/demo-tracks/list',
    TRACK_DELETE: 'api/demo-tracks/delete',
    TRACK_TRENDING: 'api/save/recommended-trending',
    //master
    AREA_OF_EXPERTISE_LIST: 'api/master-data/area-of-expertise-list',
    GENRE_LIST: 'api/master-data/genre-list',
    //discovery
    EXPERTISE_VIEW: 'api/area-of-expertise/view',
    DISCOVER: 'api/discover',
    DISCOVER_FEATURED_LIST: 'api/discover-feature-list',
    RECOMMENDED: 'api/recommended',
    RECENT_JOINED: 'api/recently-joined',
    TRENDING: 'api/trending',
    LOCATION: 'api/location',
    LOCATION_SEARCH: 'api/location/search',
    RANDOM: 'api/random',
    GENRE_VIEW: 'api/genre/view',
    //network
    MY_NETWORK: 'api/network/my-connections',
    ADD_NETWORK: 'api/network/add',
    REMOVE_NETWORK: 'api/network/remove',
    ACCEPT_REQUEST: 'api/network/accept-connections',
    REJECT_REQUEST: 'api/network/reject-connections',
    CANCEL_REQUEST: 'api/network/cancel-request',
    //project
    CREATE_PROJECT: 'api/project/create',
    UPDATDE_PROJECT: 'api/project/update',
    LIST_PROJECT: 'api/project/list',
    PROJECT_DETAILS: 'api/project/details',  ///api/project/details/{project_id}
    PROJECT_ADD_COLLABORATOR: 'api/project/collaborators/add',
    PROJECT_ADD_TRACK: 'api/project/add-tracks',
    PROJECT_DELETE_TRACK: 'api/project/remove-task', // /api/project/remove-task/{file_id}
    PROJECT_ADD_VOICE: 'api/project/add-voice-memo',
    PROJECT_DELETE_VOICE: 'api/project/remove-voice-memo',
    PROJECT_DELETE: 'api/project/delete',
    PROJECT_ADD_ARCHIVE: 'api/project/archive-add',
    PROJECT_REMOVE_ARCHIVE: 'api/project/archive-remove',
    PROJECT_ADD_FILE: 'api/project/add-project-file',
    PROJECT_REMOVE_FILE: 'api/project/files-remove',
    // cms admin
    HOME_DATA: 'api/cms/frontend/home',
    HOWITWORK_DATA: 'api/cms/frontend/how-it-work',
    SUBSCRIPTION_DATA: 'api/cms/frontend/subscription',
    DISCOVERHOME_DATA: 'api/cms/home',
    DISCOVERRECOMMENDED_DATA: 'api/cms/recommended',
    DISCOVERGENRE_DATA: 'api/cms/genre',
    DISCOVEREXPERTISE_DATA: 'api/cms/area-of-expertise',
    DISCOVERRECENTLY_DATA: 'api/cms/recently-joined',
    DISCOVERLOCATION_DATA: 'api/cms/location',
    DISCOVERTRENDING_DATA: 'api/cms/trending',
    DISCOVERNETWORK_DATA: 'api/cms/network',
    CONTACT_DATA: 'api/cms/frontend/contact',
}
export default API_PATH;