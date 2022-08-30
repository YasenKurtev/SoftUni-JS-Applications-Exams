import { html } from "../../node_modules/lit-html/lit-html.js";
import { createItem } from "../services/appService.js";
import { errorMessageHandler } from "../handlers/errorMessageHandler.js"

let createTemplate = (onSubmit) => html`
<section id="create-meme">
    <form id="create-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`

export let createHandler = (ctx) => {
    ctx.render(createTemplate(onSubmit));

    function onSubmit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let title = formData.get('title');
        let description = formData.get('description');
        let imageUrl = formData.get('imageUrl');

        let inputsArr = [title, description, imageUrl];
        let isEmpty = false;
        for (let item of inputsArr) {
            if (item === '') {
                isEmpty = true;
            }
        }

        if (isEmpty === false) {
            createItem(title, description, imageUrl)
                .then(res => res.json())
                .then(() => {
                    ev.target.reset();
                    ctx.page.redirect('/');
                })
                .catch(err => alert(err));
        } else {
            errorMessageHandler(ctx, 'There are empty fields!!!');
        }
    }
}