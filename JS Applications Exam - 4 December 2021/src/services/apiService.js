import { getUser } from "./userService.js";

let request = (method, url, data) => {
    let options = {
        method: method,
        headers: {}
    }

    if (method !== 'GET') {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    let user = getUser();
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    return fetch(url, options);
}

export function get(url) {
    return request('GET', url);
}

export function post(url, data) {
    return request('POST', url, data);
}

export function put(url, data) {
    return request('PUT', url, data);
}

export function del(url) {
    request('DELETE', url);
}