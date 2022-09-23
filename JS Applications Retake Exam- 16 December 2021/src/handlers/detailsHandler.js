import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { addLike, getCurrentUserTheaterLikes, getItemDetails, getTotalTheaterLikesCount } from "../services/appService.js";
import { getUser } from "../services/userService.js";

let detailsTemplate = (item, user, likes, onLike, count) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${item.title}</h1>
            <div>
                <img src="${item.imageUrl}" />
            </div>
        </div>
        <div class="details">
            <h3>Theater Description</h3>
            <p>${item.description}</p>
            <h4>Date: ${item.date}</h4>
            <h4>Author: ${item.author}</h4>
            <div class="buttons">
                ${user !== undefined && item._ownerId === user._id
                ? html`
                <a class="btn-delete" href="${item._id}/delete">Delete</a>
                <a class="btn-edit" href="${item._id}/edit">Edit</a>
                `
                : nothing}
                ${user !== undefined && item._ownerId !== user._id && count === 0
                ? html`
                <a class="btn-like" href="" @click=${onLike}>Like</a>
                `
                : nothing}
            </div>
            <p class="likes">Likes: ${likes}</p>
        </div>
</section>
`

export let detailsHandler = (ctx) => {
    getItemDetails(ctx.params.itemId)
        .then(res => res.json())
        .then(item => {
            getTotalTheaterLikesCount(ctx.params.itemId)
                .then(res => res.json())
                .then(likes => {
                    if (getUser() !== undefined) {
                        getCurrentUserTheaterLikes(ctx.params.itemId, ctx.user._id)
                            .then(res => res.json())
                            .then(count => {
                                ctx.render(detailsTemplate(item, ctx.user, likes, onLike, count));
                            })
                    } else {
                        ctx.render(detailsTemplate(item, ctx.user, likes, onLike, 0));
                    }
                })

        })

    function onLike(ev) {
        ev.preventDefault();
        addLike(ctx.params.itemId)
            .then(() => {
                ctx.page.redirect(`/${ctx.params.itemId}`)
            })
    }
}