import API_ENDPOINT from "../globals/api-endpoint";

class CategoriesSource {
    static async allCategories() {
        const response = await fetch(API_ENDPOINT.CATEGORIES);
        const responseJson = await response.json();
        return responseJson;
    }
}

export default CategoriesSource;