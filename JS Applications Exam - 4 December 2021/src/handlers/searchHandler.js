import { html, nothing, render } from "../../node_modules/lit-html/lit-html.js";
import { getSearchedAlbums } from "../services/appService.js";

let searchTemplate = (onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${onSearch}>Search</button>
    </div>

    <h2>Results:</h2>

    <div class="search-result" id="search-container">

    </div>
</section>
`

let resultsTemplate = (user, items) => html`
${items.length === 0
    ? html`
<p class="no-result">No result.</p>
`
    : html`
${items.map(x => html`
<div class="card-box">
    <img src="${x.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${x.name}</p>
            <p class="artist">Artist: ${x.artist}</p>
            <p class="genre">Genre: ${x.genre}</p>
            <p class="price">Price: $${x.price}</p>
            <p class="date">Release Date: ${x.releaseDate}</p>
        </div>
        ${user
                    ? html`
        <div class="btn-group">
            <a href="/${x._id}" id="details">Details</a>
        </div>
        `
                    : nothing}
        `)}
        `}
`

export let searchHandler = (ctx) => {
    ctx.render(searchTemplate(onSearch));

    function onSearch(ev){
        ev.preventDefault();
        let input = document.getElementById('search-input');
        let searchContainer = document.getElementById('search-container');

        if(input.value !== ''){
            getSearchedAlbums(input.value)
            .then(res => res.json())
            .then(items => {
                render(resultsTemplate(ctx.user, items), searchContainer);
            })
        }else{
            alert('Input is empty!!!');
        }
        
    }
}