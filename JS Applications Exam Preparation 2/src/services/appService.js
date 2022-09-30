import { get, post, del, put } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function getAllItems() {
    return get(baseUrl + '/data/cars?sortBy=_createdOn%20desc');
}

export function getItemDetails(id) {
    return get(baseUrl + `/data/cars/${id}`);
}

export function createItem(brand, model, description, year, imageUrl, price) {
    return post(baseUrl + '/data/cars', { brand: brand, model: model, description: description, year: Number(year), imageUrl: imageUrl, price: Number(price) });
}

export function deleteItem(id) {
    return del(baseUrl + `/data/cars/${id}`);
}

export function updateItem(id, brand, model, description, year, imageUrl, price) {
    return put(baseUrl + `/data/cars/${id}`, { brand: brand, model: model, description: description, year: Number(year), imageUrl: imageUrl, price: Number(price) });
}

export function getSearchByYearResults(query) {
    return get(baseUrl + `/data/cars?where=year%3D${query}`);
}

export function getCurrentUserListings(id) {
    return get(baseUrl + `/data/cars?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}