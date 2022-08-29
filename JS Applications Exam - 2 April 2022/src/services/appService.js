import { get, post, del, put } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function getAllItems() {
    return get(baseUrl + '/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export function getItemDetails(id) {
    return get(baseUrl + `/data/pets/${id}`);
}

export function createItem(name, breed, age, weight, image) {
    return post(baseUrl + '/data/pets', { name: name, breed: breed, age: age, weight: weight, image: image });
}

export function deleteItem(id) {
    return del(baseUrl + `/data/pets/${id}`);
}

export function updateItem(id, name, breed, age, weight, image) {
    return put(baseUrl + `/data/pets/${id}`, { name: name, breed: breed, age: age, weight: weight, image: image });
}

export function makeDonation(id) {
    return post(baseUrl + '/data/donation', { petId: id });
}

export function getTotalDonationCount(id) {
    return get(baseUrl + `/data/donation?where=petId%3D%22${id}%22&distinct=_ownerId&count`);
}

export function getCurrentUserDonation(petId, userId) {
    return get(baseUrl + `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}