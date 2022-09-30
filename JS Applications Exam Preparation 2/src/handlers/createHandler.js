import { html } from "../../node_modules/lit-html/lit-html.js";
import { createItem } from "../services/appService.js";

let createTemplate = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form id="create-form" @submit=${onSubmit}>
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`

export let createHandler = (ctx) => {
    ctx.render(createTemplate(onSubmit));

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
            createItem(brand, model, description, year, imageUrl, price)
                .then(res => res.json())
                .then(() => {
                    ev.target.reset();
                    ctx.page.redirect('/allListings');
                })
                .catch(err => alert(err));
        } else {
            alert('There are empty inputs!!!');
        }
    }
}