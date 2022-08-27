import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getCurrentUserDonation, getItemDetails, getTotalDonationCount, makeDonation } from "../services/appService.js";
import { getUser } from "../services/userService.js";

let detailsTemplate = (item, user, donations, onDonate, count) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${item.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${item.title}</h2>
                <p class="post-description">Description: ${item.description}</p>
                <p class="post-address">Address: ${item.address}</p>
                <p class="post-number">Phone number: ${item.phone}</p>
                <p class="donate-Item">Donate Materials: ${donations}</p>
                ${user !== undefined
                    ? html`
                    <div class="btns">
                    ${item._ownerId === user._id
                        ? html`
                        <a href="${item._id}/edit" class="edit-btn btn">Edit</a>
                        <a href="${item._id}/delete" class="delete-btn btn">Delete</a>
                        `
                        : nothing}
                        ${count === 0
                            ? html`
                            <a href="" class="donate-btn btn" @click=${onDonate}>Donate</a>
                            `
                            : nothing}
                    </div>
                    `
                    : nothing}
            </div>
        </div>
    </div>
</section>
`

export let detailsHandler = (ctx) => {
    console.log(ctx.params.itemId);
    getItemDetails(ctx.params.itemId)
        .then(res => res.json())
        .then(item => {
            getTotalDonationCount(ctx.params.itemId)
                .then(res => res.json())
                .then(donations => {
                    if(getUser() !== undefined){
                        getCurrentUserDonation(ctx.params.itemId, ctx.user._id)
                        .then(res => res.json())
                        .then(count => {
                            ctx.render(detailsTemplate(item, ctx.user, donations, onDonate, count));
                        })
                    }else{
                        ctx.render(detailsTemplate(item, ctx.user, donations, onDonate, 0));
                    }
                })
            
        })

    function onDonate(ev){
        ev.preventDefault();
        makeDonation(ctx.params.itemId)
            .then(() => {
                ctx.page.redirect(`/${ctx.params.itemId}`)
            })
    }
}