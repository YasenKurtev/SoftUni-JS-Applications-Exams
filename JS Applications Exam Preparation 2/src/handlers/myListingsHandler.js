import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCurrentUserListings } from "../services/appService.js";

let myListingsTemplate = (items) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">
        ${items.length === 0
        ? html`
        <p class="no-cars"> You haven't listed any cars yet.</p>
        `
        : html`
        ${items.map(x => html`
        <div class="listing">
            <div class="preview">
                <img src="${x.imageUrl}">
            </div>
            <h2>${x.brand} ${x.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${x.year}</h3>
                    <h3>Price: ${x.price} $</h3>
                </div>
                <div class="data-buttons">
                    <a href="/${x._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>
        `)}
        `}
    </div>
</section>
`

export let myListingsHandler = (ctx) => {
    getCurrentUserListings(ctx.user._id)
        .then(res => res.json())
        .then(items => {
            ctx.render(myListingsTemplate(items));
        })
}