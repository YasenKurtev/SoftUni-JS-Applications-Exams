import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getItemDetails } from "../services/appService.js";

let detailsTemplate = (item, user) => html`
<section id="listing-details">
    <h1>Details</h1>
        <div class="details-info">
            <img src="${item.imageUrl}">
            <hr>
            <ul class="listing-props">
                <li><span>Brand:</span>${item.brand}</li>
                <li><span>Model:</span>${item.model}</li>
                <li><span>Year:</span>${item.year}</li>
                <li><span>Price:</span>${item.price}$</li>
            </ul>
            <p class="description-para">${item.description}</p>
            ${user !== undefined && item._ownerId === user._id
                ? html`
            <div class="listings-buttons">
                <a href="${item._id}/edit" class="button-list">Edit</a>
                <a href="${item._id}/delete" class="button-list">Delete</a>
            </div>
            `
                : nothing}
        </div>
</section>
`

export let detailsHandler = (ctx) => {
    getItemDetails(ctx.params.itemId)
        .then(res => res.json())
        .then(item => {
            ctx.render(detailsTemplate(item, ctx.user));
        })
}