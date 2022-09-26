import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getItemDetails, deleteItem } from "../services/appService.js";

let detailsTemplate = (item, user) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${item.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${item.name}</h1>
                <h3>Artist: ${item.artist}</h3>
                <h4>Genre: ${item.genre}</h4>
                <h4>Price: $${item.price}</h4>
                <h4>Date: ${item.releaseDate}</h4>
                <p>Description: ${item.description}</p>
            </div>
            ${user !== undefined && item._ownerId === user._id
                ? html`
            <div class="actionBtn">
                <a href="${item._id}/edit" class="edit">Edit</a>
                <a href="${item._id}/delete" class="remove">Delete</a>
            </div>
            `
                : nothing}
        </div>
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