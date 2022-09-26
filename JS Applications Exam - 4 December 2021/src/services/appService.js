import { get, post, del, put } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function getAllItems() {
    return get(baseUrl + '/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export function getItemDetails(id) {
    return get(baseUrl + `/data/albums/${id}`);
}

export function createItem(name, imgUrl, price, releaseDate, artist, genre, description) {
    return post(baseUrl + '/data/albums', { name: name, imgUrl: imgUrl, price: price, releaseDate: releaseDate, artist: artist, genre: genre, description: description });
}

export function deleteItem(id) {
    return del(baseUrl + `/data/albums/${id}`);
}

export function updateItem(id, name, imgUrl, price, releaseDate, artist, genre, description) {
    return put(baseUrl + `/data/albums/${id}`, { name: name, imgUrl: imgUrl, price: price, releaseDate: releaseDate, artist: artist, genre: genre, description: description });
}

export function likeBook(id) {
    return post(baseUrl + '/data/likes', { bookId: id });
}

export function getSearchedAlbums(query) {
    return get(baseUrl + `/data/albums?where=name%20LIKE%20%22${query}%22`);
}

export function getCurrentUserBookLikes(bookId, userId) {
    return get(baseUrl + `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export function getCurrentUserBooks(id) {
    return get(baseUrl + `/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}