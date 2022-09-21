export function getUser() {
    let user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    } else {
        return undefined;
    }
}

export function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function clearUser() {
    localStorage.clear();
}