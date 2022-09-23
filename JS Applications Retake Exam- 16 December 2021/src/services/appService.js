import { get, post, del, put } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function getAllItems() {
    return get(baseUrl + '/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export function getItemDetails(id) {
    return get(baseUrl + `/data/theaters/${id}`);
}

export function createItem(title, date, author, description, imageUrl) {
    return post(baseUrl + '/data/theaters', { title: title, date: date, author: author, description: description, imageUrl: imageUrl });
}

export function deleteItem(id) {
    return del(baseUrl + `/data/theaters/${id}`);
}

export function updateItem(id, title, date, author, description, imageUrl) {
    return put(baseUrl + `/data/theaters/${id}`, { title: title, date: date, author: author, description: description, imageUrl: imageUrl });
}

export function addLike(id) {
    return post(baseUrl + '/data/likes', { theaterId: id });
}

export function getTotalTheaterLikesCount(id) {
    return get(baseUrl + `/data/likes?where=theaterId%3D%22${id}%22&distinct=_ownerId&count`);
}

export function getCurrentUserTheaterLikes(theaterId, userId) {
    return get(baseUrl + `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export function getCurrentUserEvents(id) {
    return get(baseUrl + `/data/theaters?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}