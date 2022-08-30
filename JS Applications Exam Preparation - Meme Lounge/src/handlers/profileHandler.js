import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems, getCurrentUserMemes } from "../services/appService.js";

let profileTemplate = (items, user) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${items.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${items.length === 0
            ? html`
            <p class="no-memes">No memes in database.</p>
            `
            : html`
            ${items.map(x => html`
            <div class="user-meme">
            <p class="user-meme-title">${x.title}</p>
            <img class="userProfileImage" alt="meme-img" src="${x.imageUrl}">
            <a class="button" href="/${x._id}">Details</a>
        </div>
            `)}
            `}
    </div>
</section>
`

export let profileHandler = (ctx) => {
    getCurrentUserMemes(ctx.user._id)
        .then(res => res.json())
        .then(items => {
            ctx.render(profileTemplate(items, ctx.user));
        })
}