import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getCurrentUserDonation, getItemDetails, getTotalDonationCount, makeDonation } from "../services/appService.js";
import { getUser } from "../services/userService.js";

let detailsTemplate = (item, user, donations, onDonate, count) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${item.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${item.name}</h1>
                <h3>Breed: ${item.breed}</h3>
                <h4>Age: ${item.age}</h4>
                <h4>Weight: ${item.weight}</h4>
                <h4 class="donation">Donation: ${donations * 100}$</h4>
            </div>
            ${user !== undefined
                    ? html`
                    <div class="actionBtn">
                    ${item._ownerId === user._id
                        ? html`
                        <a href="${item._id}/edit" class="edit">Edit</a>
                <a href="${item._id}/delete" class="remove">Delete</a>
                        `
                        : nothing}
                        ${item._ownerId !== user._id && count === 0
                            ? html`
                            <a href="" class="donate" @click=${onDonate}>Donate</a>
                            `
                            : nothing}
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