import { get, post, del, put } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function getAllItems() {
    return get(baseUrl + '/data/books?sortBy=_createdOn%20desc');
}

export function getItemDetails(id) {
    return get(baseUrl + `/data/books/${id}`);
}

export function createItem(title, description, imageUrl, type) {
    return post(baseUrl + '/data/books', { title: title, description: description, imageUrl: imageUrl, type: type });
}

export function deleteItem(id) {
    return del(baseUrl + `/data/books/${id}`);
}

export function updateItem(id, title, description, imageUrl, type) {
    return put(baseUrl + `/data/books/${id}`, { title: title, description: description, imageUrl: imageUrl, type: type });
}

export function likeBook(id) {
    return post(baseUrl + '/data/likes', { bookId: id });
}

export function getTotalBookLikesCount(id) {
    return get(baseUrl + `/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`);
}

export function getCurrentUserBookLikes(bookId, userId) {
    return get(baseUrl + `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export function getCurrentUserBooks(id) {
    return get(baseUrl + `/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}