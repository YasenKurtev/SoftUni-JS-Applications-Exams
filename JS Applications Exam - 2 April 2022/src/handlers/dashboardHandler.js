import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../services/appService.js";

let dashboardTemplate = (items) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    ${items.length === 0
        ? html`
    <div>
        <p class="no-pets">No pets in dashboard</p>
    </div>
    `
        : html`
    <div class="animals-dashboard">
        ${items.map(x => html`
        <div class="animals-board">
            <article class="service-img">
                <img class="animal-image-cover" src=${x.image}>
            </article>
            <h2 class="name">${x.name}</h2>
            <h3 class="breed">${x.breed}</h3>
            <div class="action">
                <a class="btn" href="/${x._id}">Details</a>
            </div>
        </div>
        `)}
    </div>
    `}
</section>
`

export let dashboardHandler = (ctx) => {
    getAllItems()
        .then(res => res.json())
        .then(items => {
            ctx.render(dashboardTemplate(items));
        })
}