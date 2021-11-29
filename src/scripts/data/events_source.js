import API_ENDPOINT from "../globals/api-endpoint";

class EventsSource {
    static async getAllEvents() {
        const respose = await fetch(API_ENDPOINT.EVENTS)
    }
}