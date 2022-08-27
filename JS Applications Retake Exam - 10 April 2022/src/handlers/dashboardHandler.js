import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../services/appService.js";

let dashboardTemplate = (items) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    ${items.length === 0
        ? html`
    <h1 class="title no-posts-title">No posts yet!</h1>
    `
        : html`
    <div class="all-posts">
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

export let dashboardHandler = (ctx) => {
    getAllItems()
        .then(res => res.json())
        .then(items => {
            ctx.render(dashboardTemplate(items));
        })
}