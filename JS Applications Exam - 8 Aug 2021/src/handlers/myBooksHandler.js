import { html } from "../../node_modules/lit-html/lit-html.js";
import { getCurrentUserBooks } from "../services/appService.js";

let myBooksTemplate = (items) => html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${items.length === 0
        ? html`
    <p class="no-books">No books in database!</p>
    `
        : html`
    <ul class="my-books-list">
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

export let myBooksHandler = (ctx) => {
    getCurrentUserBooks(ctx.user._id)
        .then(res => res.json())
        .then(items => {
            ctx.render(myBooksTemplate(items));
        })
}