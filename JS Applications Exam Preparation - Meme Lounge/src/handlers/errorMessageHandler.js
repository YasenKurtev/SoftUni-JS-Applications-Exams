import { html } from "../../node_modules/lit-html/lit-html.js";

let errorMessageTemplate = (message) => html`
<div id="errorBox" class="notification">
    <span>${message}</span>
</div>
`

export let errorMessageHandler = (ctx, message) => {
    ctx.renderError(errorMessageTemplate(message));
    let container = document.getElementById('errorBox');
    container.style.display = 'block';
    setTimeout(() => container.style.display = 'none', 3000);
}