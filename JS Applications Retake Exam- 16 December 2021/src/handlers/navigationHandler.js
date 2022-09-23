import { html } from "../../node_modules/lit-html/lit-html.js";

let navigationTemplate = (user) => html`
<nav>
    <a href="/">Theater</a>
        <ul>
        ${user
            ? html`
            <li><a href="/profile">Profile</a></li>
            <li><a href="/create">Create Event</a></li>
            <li><a href="/logout">Logout</a></li>`
            : html`
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>`}
        </ul>
</nav>
`

export let navigationHandler = (ctx) => {
    return navigationTemplate(ctx.user);
}