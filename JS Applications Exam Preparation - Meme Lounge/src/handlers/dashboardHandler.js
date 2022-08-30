import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../services/appService.js";

let dashboardTemplate = (items) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${items.length === 0
        ? html`
        <p class="no-memes">No memes in database.</p>
        `
        : html`
        ${items.map(x => html`
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${x.title}</p>
                    <img class="meme-image" alt="meme-img" src="${x.imageUrl}">
                </div>
                <div id="data-buttons">
                    <a class="button" href="/${x._id}">Details</a>
                </div>
            </div>
        </div>
        `)}
        `}
    </div>
</section>
`

export let dashboardHandler = (ctx) => {
    getAllItems()
        .then(res => res.json())
        .then(items => {
            ctx.render(dashboardTemplate(items));
        })
}