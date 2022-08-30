import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getItemDetails, deleteItem } from "../services/appService.js";

let detailsTemplate = (item, user, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${item.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${item.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${item.description}
            </p>
            ${user !== undefined && item._ownerId === user._id
                ? html`
                <a class="button warning" href="${item._id}/edit">Edit</a>
            <button class="button danger" @click=${onDelete}>Delete</button>
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
            ctx.render(detailsTemplate(item, ctx.user, onDelete));
        })

    function onDelete(){
        let confirmed = confirm('Do you want to delete this item?');
        if (confirmed) {
        deleteItem(ctx.params.itemId)
            .then(() => ctx.page.redirect('/dashboard'));
        }
    }
}