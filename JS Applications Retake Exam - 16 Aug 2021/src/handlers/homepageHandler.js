import { html } from "../../node_modules/lit-html/lit-html.js";
import { getLatestGames } from "../services/appService.js";

let homepageTemplate = (items) => html`
<section id="welcome-world">
    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">

    <div id="home-page">
        <h1>Latest Games</h1>
        ${items.length === 0
        ? html`
        <p class="no-articles">No games yet</p>
        `
        : html`
        ${items.slice(0, 3).map(x => html`
        <div class="game">
            <div class="image-wrap">
                <img src="${x.imageUrl}">
            </div>
            <h3>${x.title}</h3>
            <div class="rating">
                <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
            </div>
            <div class="data-buttons">
                <a href="/${x._id}" class="btn details-btn">Details</a>
            </div>
        </div>
        `)}
        `}
    </div>
</section>
`

export let homepageHandler = (ctx) => {
    getLatestGames()
        .then(res => res.json())
        .then(items => {
            ctx.render(homepageTemplate(items));
        })
}