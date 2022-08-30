import { get, post } from "./apiService.js";

let baseUrl = 'http://localhost:3030';

export function register(username, email, password, gender) {
    return post(baseUrl + '/users/register', { username, email, password, gender });
}

export function login(email, password) {
    return post(baseUrl + '/users/login', { email, password });
}

export function logout() {
    return get(baseUrl + '/users/logout');
}