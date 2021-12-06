import API_ENDPOINT from "../globals/api-endpoint";

class EventsSource {
    static async allEvents(page) {
        const response = await fetch(API_ENDPOINT.EVENTS(page));
        const responseJson = await response.json();
        return responseJson.data;
    }
    
    static async eventById(id) {
        const response = await fetch(API_ENDPOINT.EVENT_DETAIL(id));
        return response.json();
    }
    
    static async eventByUserId(id, apiToken) {
        const response = await fetch(API_ENDPOINT.EVENTS_USER(id, apiToken));
        const responseJson = await response.json();
        return responseJson.data;
    }

    static async latestEvent(limit) {
        const response = await fetch(API_ENDPOINT.EVENT_LATEST(limit));
        const responseJson = await response.json();
        return responseJson.data;
    }

    static async eventByCategory(id, page) {
        const response = await fetch(API_ENDPOINT.EVENTS_CATEGORY(id, page));
        const responseJson = await response.json();
        return responseJson.data;
    }

    static async searchEvent(keyword) {
        const response = await fetch(API_ENDPOINT.EVENT_SEARCH(keyword));
        const responseJson = await response.json();
        return responseJson.data;
    }

    static async addEvent(apiToken, data) {
        const response = await fetch(API_ENDPOINT.ADD_EVENT(apiToken), {
            method: 'POST',
            body: data
        });
        const responseJson = await response.json();
        return responseJson;
    }

    static async updateEvent(id, apiToken) {
        const response = await fetch(API_ENDPOINT.UPDATE_EVENT(id, apiToken), {
            method: 'POST',
            body: data
        });
        const responseJson = await response.json();
        return responseJson;
    }

    static async deleteEvent(id, apiToken) {
        const response = await fetch(API_ENDPOINT.DELETE_EVENT(id, apiToken), {
            method: 'DELETE'
        });
        const responseJson = await response.json();
        return responseJson;
    }
}

export default EventsSource;