import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemDetails, updateItem } from "../services/appService.js";

let editTemplate = (item, onSubmit) => html`
<section id="edit-page" class="edit">
    <form id="edit-form" action="#" method="" @submit=${onSubmit}>
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" value="${item.title}">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" .value="${item.description}"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" value="${item.imageUrl}">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" value="${item.type}">
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
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
        let type = formData.get('type');

        let inputsArr = [title, description, imageUrl, type];
        let isEmpty = false;
        for (let item of inputsArr) {
            if (item === '') {
                isEmpty = true;
            }
        }

        if (isEmpty === false) {
            updateItem(ctx.params.itemId, title, description, imageUrl, type)
                .then(res => res.json())
                .then(() => {
                    ev.target.reset();
                    ctx.page.redirect(`/${ctx.params.itemId}`);
                })
                .catch(err => alert(err));
        } else {
            alert('There are empty inputs!!!');
        }
    }
}