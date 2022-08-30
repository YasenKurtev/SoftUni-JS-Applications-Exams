import { get, post, del, put } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function getAllItems() {
    return get(baseUrl + '/data/memes?sortBy=_createdOn%20desc');
}

export function getItemDetails(id) {
    return get(baseUrl + `/data/memes/${id}`);
}

export function createItem(title, description, imageUrl) {
    return post(baseUrl + '/data/memes', { title: title, description: description, imageUrl: imageUrl });
}

export function deleteItem(id) {
    return del(baseUrl + `/data/memes/${id}`);
}

export function updateItem(id, title, description, imageUrl) {
    return put(baseUrl + `/data/memes/${id}`, { title: title, description: description, imageUrl: imageUrl });
}

export function getCurrentUserMemes(id) {
    return get(baseUrl + `/data/memes?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}