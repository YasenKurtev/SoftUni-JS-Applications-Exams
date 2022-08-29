import { html } from "../../node_modules/lit-html/lit-html.js";

let navigationTemplate = (user) => html`
<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        ${user
        ? loggedUserTemplate
        : guestUserTemplate}
    </ul>
</nav>
`

let loggedUserTemplate = html`
<li><a href="/create">Create Postcard</a></li>
<li><a href="/logout">Logout</a></li>
`

let guestUserTemplate = html`
<li><a href="/login">Login</a></li>
<li><a href="/register">Register</a></li>
`

export let navigationHandler = (ctx) => {
    return navigationTemplate(ctx.user);
}