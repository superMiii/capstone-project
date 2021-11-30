import API_ENDPOINT from "../globals/api-endpoint";

class UsersSource {
    static async showProfile(apiToken) {
        const response = await fetch(API_ENDPOINT.USER_PROFILE(apiToken));
        const responseJson = await response.json();
        return responseJson.data;
    }

    static async updateProfile(apiToken) {
        const response = await fetch(API_ENDPOINT.UPDATE_PROFILE(apiToken));
        const responseJson = response.json();
        return responseJson.data;
    }

    static async changePassword(apiToken) {
        const response = await fetch(API_ENDPOINT.CHANGE_PASSWORD(apiToken));
        const responseJson = await response.json();
        return responseJson.data;
    }
}

export default UsersSource;