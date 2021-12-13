import API_ENDPOINT from "../globals/api-endpoint";

class UsersSource {
    static async showProfile(apiToken) {
        const response = await fetch(API_ENDPOINT.USER_PROFILE(apiToken));
        const responseJson = await response.json();
        return responseJson.data;
    }

    static async updateProfile(apiToken, data) {
        const response = await fetch(API_ENDPOINT.UPDATE_PROFILE(apiToken), {
            method: 'POST',
            body: data
        });
        const responseJson = response.json();
        return responseJson;
    }

    static async changePassword(apiToken, data) {
        const response = await fetch(API_ENDPOINT.CHANGE_PASSWORD(apiToken), {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseJson = await response.json();
        return responseJson;
    }
}

export default UsersSource;