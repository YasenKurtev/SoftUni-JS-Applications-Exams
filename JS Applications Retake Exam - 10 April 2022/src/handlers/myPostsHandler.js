import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getUserItems } from "../services/appService.js";

let myPostsTemplate = (items) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    ${items.length === 0
    ? html`
    <h1 class="title no-posts-title">You have no posts yet!</h1>
    `
    : html`
    <div class="my-posts">
        ${items.map(x => html`
        <div class="post">
            <h2 class="post-title">${x.title}</h2>
            <img class="post-image" src=${x.imageUrl} alt="Material Image">
            <div class="btn-wrapper">
                <a href="/${x._id}" class="details-btn btn">Details</a>
            </div>
        </div>
        `)}
    </div>
    `}
</section>
`

export let myPostsHandler = (ctx) => {
    getUserItems(ctx.user._id)
        .then(res => res.json())
        .then(items => {
            ctx.render(myPostsTemplate(items));
        })
}