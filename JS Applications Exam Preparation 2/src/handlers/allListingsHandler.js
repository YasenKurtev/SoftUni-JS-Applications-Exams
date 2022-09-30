import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../services/appService.js";

let allListingsTemplate = (items) => html`
<section id="car-listings">
    <h1>Car Listings</h1>
    <div class="listings">
        ${items.length === 0
        ? html`
        <p class="no-cars">No cars in database.</p>
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
</section>
`

export let allListingsHandler = (ctx) => {
    getAllItems()
        .then(res => res.json())
        .then(items => {
            ctx.render(allListingsTemplate(items));
        })
}