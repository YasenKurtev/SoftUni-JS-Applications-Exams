import { get, post } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function register(email, password) {
    return post(baseUrl + '/users/register', { email, password });
}

export function login(email, password) {
    return post(baseUrl + '/users/login', { email, password });
}

export function logout() {
    return get(baseUrl + '/users/logout');
}