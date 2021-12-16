import API_ENDPOINT from "../globals/api-endpoint";

class AdminSource {
    static async allEvents(apiToken) {
        const response = await fetch(API_ENDPOINT.ADMIN_ALL_EVENTS(apiToken));
        const responseJson = await response.json();
        return responseJson.data;
    }

    static async eventById(id, apiToken) {
        const response = await fetch(API_ENDPOINT.ADMIN_DETAIL_EVENT(id, apiToken));
        return response.json();
    }
    
    static async approvedEvent(id, apiToken, data) {
        const response = await fetch(API_ENDPOINT.ADMIN_APPROVED_EVENT(id, apiToken), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseJson = await response.json();
        return responseJson;
    }
    
    static async deleteEvent(id, apiToken) {
        const response = await fetch(API_ENDPOINT.ADMIN_DELETE_EVENT(id, apiToken), {
            method: 'DELETE'
        });
        const responseJson = await response.json();
        return responseJson;
    }

    static async userById(id, apiToken) {
        const response = await fetch(API_ENDPOINT.ADMIN_DETAIL_USER(id, apiToken));
        return response.json();
    }
    
    static async allUsers(apiToken) {
        const response = await fetch(API_ENDPOINT.ADMIN_ALL_USERS(apiToken));
        const responseJson = await response.json();
        return responseJson.data;
    }
    
    static async changeRoleUser(id, apiToken, data) {
        const response = await fetch(API_ENDPOINT.ADMIN_CHANGE_ROLE_USER(id, apiToken), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseJson = await response.json();
        return responseJson;
    }

    static async deleteUser(id, apiToken) {
        const response = await fetch(API_ENDPOINT.ADMIN_DELETE_USER(id, apiToken), {
            method: 'DELETE'
        });
        const responseJson = await response.json();
        return responseJson;
    }
}

export default AdminSource;