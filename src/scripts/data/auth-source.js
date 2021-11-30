import API_ENDPOINT from "../globals/api-endpoint";

class AuthSource {
    static async register(data) {
        const response = await fetch(API_ENDPOINT.REGISTER, {
            method: 'POST',
            body: data
        });
        const responseJson = await response.json();
        return responseJson;
    }

    static async login(data) {
        const response = await fetch(API_ENDPOINT.LOGIN, {
            method: 'POST',
            body: data
        });
        const responseJson = await response.json();
        return responseJson;
    }

    static async logout(apiToken) {
        const response = await fetch(API_ENDPOINT.LOGOUT(apiToken));
        const responseJson = await response.json();
        return responseJson;
    }
}

export default AuthSource;