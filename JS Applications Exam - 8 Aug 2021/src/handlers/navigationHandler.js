import { html } from "../../node_modules/lit-html/lit-html.js";

let navigationTemplate = (user) => html`
<nav class="navbar">
    <section class="navbar-dashboard">
        <a href="/">Dashboard</a>
            ${user
            ? html`<div id="user">
                <span>Welcome, ${user.email}</span>
                <a class="button" href="/myBooks">My Books</a>
                <a class="button" href="/create">Add Book</a>
                <a class="button" href="/logout">Logout</a>
            </div>`
            : html`
            <div id="guest">
                <a class="button" href="/login">Login</a>
                <a class="button" href="/register">Register</a>
            </div>`}
    </section>
</nav>
`

export let navigationHandler = (ctx) => {
    return navigationTemplate(ctx.user);
}