import { get, post, del, put } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function getAllItems() {
    return get(baseUrl + '/data/games?sortBy=_createdOn%20desc');
}

export function getItemDetails(id) {
    return get(baseUrl + `/data/games/${id}`);
}

export function createItem(title, category, maxLevel, imageUrl, summary) {
    return post(baseUrl + '/data/games', { title: title, category: category, maxLevel: maxLevel, imageUrl: imageUrl, summary: summary });
}

export function deleteItem(id) {
    return del(baseUrl + `/data/games/${id}`);
}

export function updateItem(id, title, category, maxLevel, imageUrl, summary) {
    return put(baseUrl + `/data/games/${id}`, { title: title, category: category, maxLevel: maxLevel, imageUrl: imageUrl, summary: summary });
}

export function createComment(id, comment) {
    return post(baseUrl + '/data/comments', { gameId: id, comment: comment });
}

export function getAllCurrentGameComments(id) {
    return get(baseUrl + `/data/comments?where=gameId%3D%22${id}%22`);
}

export function getLatestGames() {
    return get(baseUrl + `/data/games?sortBy=_createdOn%20desc&distinct=category`);
}