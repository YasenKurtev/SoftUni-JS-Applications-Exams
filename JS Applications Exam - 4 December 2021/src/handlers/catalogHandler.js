import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../services/appService.js";

let catalogTemplate = (items, user) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${items.length === 0
    ? html`
    <p>No Albums in Catalog!</p>
    `
    : html`
    ${items.map(x => html`
    <div class="card-box">
        <img src="${x.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${x.name}</p>
                <p class="artist">Artist: ${x.artist}</p>
                <p class="genre">Genre: ${x.genre}</p>
                <p class="price">Price: $${x.price}</p>
                <p class="date">Release Date: ${x.releaseDate}</p>
            </div>
            ${user
            ? html`
            <div class="btn-group">
                <a href="/${x._id}" id="details">Details</a>
            </div>
            `
            : nothing}
        </div>
    </div>
    `)}
    `}
</section>
`

export let catalogHandler = (ctx) => {
    getAllItems()
        .then(res => res.json())
        .then(items => {
            ctx.render(catalogTemplate(items, ctx.user));
        })
}