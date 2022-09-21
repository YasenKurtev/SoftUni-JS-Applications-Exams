import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../services/appService.js";

let dashboardTemplate = (items) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${items.length === 0
        ? html`
    <p class="no-books">No books in database!</p>
    `
        : html`
    <ul class="other-books-list">
        ${items.map(x => html`
        <li class="otherBooks">
            <h3>${x.title}</h3>
            <p>Type: ${x.type}</p>
            <p class="img"><img src="${x.imageUrl}"></p>
            <a class="button" href="/${x._id}">Details</a>
        </li>
        `)}
    </ul>
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