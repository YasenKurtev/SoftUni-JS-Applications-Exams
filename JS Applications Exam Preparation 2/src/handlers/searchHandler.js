import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { getSearchByYearResults } from "../services/appService.js";

let searchTemplate = (onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button class="button-list" @click=${onSearch}>Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

    </div>
</section>
`

let resultsTemplate = (items) => html`
    ${items.length === 0
        ? html`
    <p class="no-cars"> No results.</p>
    `
        : html`
    ${items.map(x => html`
    <div class="listing">
        <div class="preview">
            <img src="${x.imageUrl}">
        </div>
        <h2>${x.brand} ${x.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${x.year}</h3>
                <h3>Price: ${x.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/${x._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>
    `)}
    `}
`

export let searchHandler = (ctx) => {
    ctx.render(searchTemplate(onSearch));

    function onSearch(ev) {
        ev.preventDefault();
        let input = document.getElementById('search-input');
        let searchContainer = document.getElementsByClassName('listings')[0];

        if (input.value !== '') {
            getSearchByYearResults(input.value)
                .then(res => res.json())
                .then(items => {
                    render(resultsTemplate(items), searchContainer);
                })
        } else {
            alert('Input is empty!!!');
        }

    }
}