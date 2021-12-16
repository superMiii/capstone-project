import CONFIG from './config';

const API_ENDPOINT = {
    REGISTER: `${CONFIG.BASE_URL}register`,
    LOGIN: `${CONFIG.BASE_URL}login`,
    LOGOUT: (apiToken) => `${CONFIG.BASE_URL}logout?api_token=${apiToken}`,
    USER_PROFILE: (apiToken) => `${CONFIG.BASE_URL}user?api_token=${apiToken}`,
    UPDATE_PROFILE: (apiToken) => `${CONFIG.BASE_URL}user?api_token=${apiToken}`,
    CHANGE_PASSWORD: (apiToken) => `${CONFIG.BASE_URL}user/changepassword?api_token=${apiToken}`,
    EVENTS: (page) => `${CONFIG.BASE_URL}events?page=${page}`,
    EVENT_DETAIL: (id) => `${CONFIG.BASE_URL}events/${id}`,
    EVENT_SEARCH: (keyword, page) => `${CONFIG.BASE_URL}events/search?keyword=${keyword}&page=${page}`,
    EVENT_LATEST: (limit) => `${CONFIG.BASE_URL}events/latest?limit=${limit}`,
    EVENTS_USER: (id, apiToken) => `${CONFIG.BASE_URL}events/user/${id}?api_token=${apiToken}`,
    EVENTS_CATEGORY: (id, page) => `${CONFIG.BASE_URL}events/category/${id}?page=${page}`,
    ADD_EVENT: (apiToken) => `${CONFIG.BASE_URL}events?api_token=${apiToken}`,
    UPDATE_EVENT: (id, apiToken) => `${CONFIG.BASE_URL}events/${id}?api_token=${apiToken}`,
    DELETE_EVENT: (id, apiToken) => `${CONFIG.BASE_URL}events/${id}?api_token=${apiToken}`,
    SHOW_FAVORITE: (apiToken) => `${CONFIG.BASE_URL}favorite?api_token=${apiToken}`,
    GET_FAVORITE: (event_id, apiToken) => `${CONFIG.BASE_URL}favorite/${event_id}?api_token=${apiToken}`,
    ADD_FAVORITE: (apiToken) => `${CONFIG.BASE_URL}favorite?api_token=${apiToken}`,
    DELETE_FAVORITE: (event_id, apiToken) => `${CONFIG.BASE_URL}favorite/${event_id}?api_token=${apiToken}`,
    CATEGORIES: `${CONFIG.BASE_URL}categories`,
    ADMIN_ALL_USERS: (apiToken) => `${CONFIG.BASE_URL}admin/users?api_token=${apiToken}`,
    ADMIN_DETAIL_USER: (id, apiToken) => `${CONFIG.BASE_URL}admin/users/${id}?api_token=${apiToken}`,
    ADMIN_CHANGE_ROLE_USER: (id, apiToken) => `${CONFIG.BASE_URL}admin/users/${id}/role?api_token=${apiToken}`,
    ADMIN_DELETE_USER: (id, apiToken) => `${CONFIG.BASE_URL}admin/users/${id}?api_token=${apiToken}`,
    ADMIN_ALL_EVENTS: (apiToken) => `${CONFIG.BASE_URL}admin/events?api_token=${apiToken}`,
    ADMIN_DETAIL_EVENT: (id, apiToken) => `${CONFIG.BASE_URL}admin/events/${id}?api_token=${apiToken}`,
    ADMIN_APPROVED_EVENT: (id, apiToken) => `${CONFIG.BASE_URL}admin/events/${id}/status?api_token=${apiToken}`,
    ADMIN_DELETE_EVENT: (id, apiToken) => `${CONFIG.BASE_URL}admin/events/${id}?api_token=${apiToken}`
}

export default API_ENDPOINT;