import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemDetails, updateItem } from "../services/appService.js";

let editTemplate = (item, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form id="edit-form" @submit=${onSubmit}>
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value="${item.brand}">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value="${item.model}">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value="${item.description}">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value="${item.year}">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${item.imageUrl}">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value="${item.price}">

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
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
        let brand = formData.get('brand');
        let model = formData.get('model');
        let description = formData.get('description');
        let year = formData.get('year');
        let imageUrl = formData.get('imageUrl');
        let price = formData.get('price');

        let inputsArr = [brand, model, description, year, imageUrl, price];
        let isEmpty = false;
        for (let item of inputsArr) {
            if (item === '') {
                isEmpty = true;
            }
        }

        if (isEmpty === false) {
            updateItem(ctx.params.itemId, brand, model, description, year, imageUrl, price)
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