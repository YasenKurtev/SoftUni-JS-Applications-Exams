import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getCurrentUserBookLikes, getItemDetails, getTotalBookLikesCount, likeBook} from "../services/appService.js";
import { getUser } from "../services/userService.js";

let detailsTemplate = (item, user, likes, onLike, count) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${item.title}</h3>
        <p class="type">Type: ${item.type}</p>
        <p class="img"><img src="${item.imageUrl}"></p>
        <div class="actions">
            ${user !== undefined && item._ownerId === user._id
                    ? html`
            <a class="button" href="${item._id}/edit">Edit</a>
            <a class="button" href="${item._id}/delete">Delete</a>
            `
                    : nothing}
            ${user !== undefined && item._ownerId !== user._id && count === 0
                    ? html`
            <a class="button" href="" @click=${onLike}>Like</a>
            `
                    : nothing}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${item.description}</p>
        </div>
</section>
`

export let detailsHandler = (ctx) => {
    getItemDetails(ctx.params.itemId)
        .then(res => res.json())
        .then(item => {
            getTotalBookLikesCount(ctx.params.itemId)
                .then(res => res.json())
                .then(likes => {
                    if (getUser() !== undefined) {
                        getCurrentUserBookLikes(ctx.params.itemId, ctx.user._id)
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
        likeBook(ctx.params.itemId)
            .then(() => {
                ctx.page.redirect(`/${ctx.params.itemId}`)
            })
    }
}