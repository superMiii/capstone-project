import API_ENDPOINT from "../globals/api-endpoint";

class FavoritesSource {
    static async allFavorites(apiToken) {
        const response = await fetch(API_ENDPOINT.SHOW_FAVORITE(apiToken));
        const responseJson = await response.json();
        return responseJson;
    }
    
    static async getFavorite(event_id, apiToken) {
        const response = await fetch(API_ENDPOINT.GET_FAVORITE(event_id, apiToken));
        return response.json();
    }

    static async addFavorite(apiToken, data) {
        const response = await fetch(API_ENDPOINT.ADD_FAVORITE(apiToken), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseJson = await response.json();
        return responseJson;
    }

    static async deleteFavorite(event_id, apiToken) {
        const response = await fetch(API_ENDPOINT.DELETE_FAVORITE(event_id, apiToken), {
            method: 'DELETE'
        });
        const responseJson = await response.json();
        return responseJson;
    }
}

export default FavoritesSource;