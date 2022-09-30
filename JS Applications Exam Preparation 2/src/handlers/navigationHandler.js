import { html } from "../../node_modules/lit-html/lit-html.js";

let navigationTemplate = (user) => html`
<nav>
    <a class="active" href="/">Home</a>
    <a href="/allListings">All Listings</a>
    <a href="/byYear">By Year</a>
        ${user
            ? html`
            <div id="profile">
                <a>Welcome ${user.username}</a>
                <a href="/myListings">My Listings</a>
                <a href="/create">Create Listing</a>
                <a href="/logout">Logout</a>
            </div>`
            : html`
            <div id="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>`}
</nav>
`

export let navigationHandler = (ctx) => {
    return navigationTemplate(ctx.user);
}