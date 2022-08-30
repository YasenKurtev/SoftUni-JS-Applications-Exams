import { html } from "../../node_modules/lit-html/lit-html.js";

let navigationTemplate = (user) => html`
<nav>
    <a href="/dashboard">All Memes</a>
    ${user
    ? html`
    <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${user.email}</span>
            <a href="/profile">My Profile</a>
            <a href="/logout">Logout</a>
        </div>
    </div>`
    : html`
    <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
    </div>`}
</nav>
`

export let navigationHandler = (ctx) => {
    return navigationTemplate(ctx.user);
}