import { get, post } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function register(username, password) {
    return post(baseUrl + '/users/register', { username, password });
}

export function login(username, password) {
    return post(baseUrl + '/users/login', { username, password });
}

export function logout() {
    return get(baseUrl + '/users/logout');
}