import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../services/appService.js";

let dashboardTemplate = (items) => html`
<section id="catalog-page">
    <h1>All Games</h1>
    ${items.length === 0
    ? html`
    <h3 class="no-articles">No articles yet</h3>
    `
    : html`
    ${items.map(x => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src="${x.imageUrl}">
            <h6>${x.category}</h6>
            <h2>${x.title}</h2>
            <a href="/${x._id}" class="details-button">Details</a>
        </div>
    </div>
    `)}
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