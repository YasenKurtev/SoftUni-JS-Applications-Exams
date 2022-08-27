import { html } from "../../node_modules/lit-html/lit-html.js";

let navigationTemplate = (user) => html`
<h1><a href="/">Orphelp</a></h1>
<nav>
    <a href="/">Dashboard</a>
    ${user
    ? loggedUserTemplate
    : guestUserTemplate}
</nav>
`

let loggedUserTemplate = html`
<div id="user">
    <a href="/myPosts">My Posts</a>
    <a href="/create">Create Post</a>
    <a href="/logout">Logout</a>
</div>
`

let guestUserTemplate = html`
<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>
`

export let navigationHandler = (ctx) => {
    return navigationTemplate(ctx.user);
}