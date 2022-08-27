import { get, post, del, put } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function getAllItems() {
    return get(baseUrl + '/data/posts?sortBy=_createdOn%20desc');
}

export function getItemDetails(id) {
    return get(baseUrl + `/data/posts/${id}`);
}

export function createItem(title, description, imageURL, address, phone) {
    return post(baseUrl + '/data/posts', { title: title, description: description, imageUrl: imageURL, address: address, phone: phone });
}

export function deleteItem(id) {
    return del(baseUrl + `/data/posts/${id}`);
}

export function updateItem(id, title, description, imageURL, address, phone) {
    return put(baseUrl + `/data/posts/${id}`, { title: title, description: description, imageUrl: imageURL, address: address, phone: phone });
}

export function getUserItems(id) {
    return get(baseUrl + `/data/posts?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`);
}

export function makeDonation(id) {
    return post(baseUrl + '/data/donations', { postId: id });
}

export function getTotalDonationCount(id) {
    return get(baseUrl + `/data/donations?where=postId%3D%22${id}%22&distinct=_ownerId&count`);
}

export function getCurrentUserDonation(postId, userId) {
    return get(baseUrl + `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}