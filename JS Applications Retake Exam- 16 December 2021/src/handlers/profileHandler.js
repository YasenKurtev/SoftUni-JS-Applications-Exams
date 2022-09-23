import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCurrentUserEvents } from "../services/appService.js";

let myProfileTemplate = (items, user) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${items.length === 0
        ? html`
        <div class="no-events">
            <p>This user has no events yet!</p>
        </div>
        `
        : html`
        ${items.map(x => html`
        <div class="eventBoard">
            <div class="event-info">
                <img src="${x.imageUrl}">
                <h2>${x.title}</h2>
                <h6>${x.date}</h6>
                <a href="/${x._id}" class="details-button">Details</a>
            </div>
        </div>
        `)}
        `}
    </div>
</section>
`

export let myProfileHandler = (ctx) => {
    getCurrentUserEvents(ctx.user._id)
        .then(res => res.json())
        .then(items => {
            ctx.render(myProfileTemplate(items, ctx.user));
        })
}