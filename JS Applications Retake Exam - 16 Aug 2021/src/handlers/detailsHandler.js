import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { createComment, getAllCurrentGameComments, getItemDetails} from "../services/appService.js";

let detailsTemplate = (item, user, comments, onSubmit) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src="${item.imageUrl}" />
            <h1>${item.title}</h1>
            <span class="levels">MaxLevel: ${item.maxLevel}</span>
            <p class="type">${item.category}</p>
        </div>
        <p class="text">${item.summary}</p>
        <div class="details-comments">
            <h2>Comments:</h2>
                ${comments.length === 0
                    ? html`
                    <p class="no-comment">No comments.</p>
                    `
                    : html`
                    <ul>
                        ${comments.map(x => html`
                        <li class="comment">
                        <p>Content: ${x.comment}</p>
                        </li>
                        `)}
                    </ul>
                    `}
        </div>
        ${user !== undefined && item._ownerId === user._id
                    ? html`
                <div class="buttons">
                    <a href="${item._id}/edit" class="button">Edit</a>
                    <a href="${item._id}/delete" class="button">Delete</a>
                </div>`
                    : nothing}
    </div>
    ${user !== undefined && item._ownerId !== user._id
                    ? html`
                <article class="create-comment">
                <label>Add new comment:</label>
                <form class="form" @submit=${onSubmit}>
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
                </article>`
                    : nothing}
</section>
`

export let detailsHandler = (ctx) => {
    getItemDetails(ctx.params.itemId)
        .then(res => res.json())
        .then(item => {
            getAllCurrentGameComments(ctx.params.itemId)
                .then(res => res.json())
                .then(comments => {
                    ctx.render(detailsTemplate(item, ctx.user, comments, onSubmit));
                })
        })

    function onSubmit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let comment = formData.get('comment');

        if(comment !== ''){
            createComment(ctx.params.itemId, comment)
                .then(() => {
                    ev.target.reset();
                    ctx.page.redirect(`/${ctx.params.itemId}`);
                })
        }
    }
}