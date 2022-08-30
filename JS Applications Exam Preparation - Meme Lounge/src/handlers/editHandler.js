import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemDetails, updateItem } from "../services/appService.js";
import { errorMessageHandler } from "../handlers/errorMessageHandler.js"

let editTemplate = (item, onSubmit) => html`
<section id="edit-meme">
    <form id="edit-form" @submit=${onSubmit}>
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" value="${item.title}">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value="${item.description}">
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="${item.imageUrl}">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`

export let editHandler = (ctx) => {
    getItemDetails(ctx.params.itemId)
        .then(res => res.json())
        .then(item => {
            ctx.render(editTemplate(item, onSubmit));
        })

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
            updateItem(ctx.params.itemId, title, description, imageUrl)
                .then(res => res.json())
                .then(() => {
                    ev.target.reset();
                    ctx.page.redirect(`/${ctx.params.itemId}`);
                })
                .catch(err => alert(err));
        } else {
            errorMessageHandler(ctx, 'There are empty fields!!!');
        }
    }
}