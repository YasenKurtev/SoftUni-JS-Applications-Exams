import { html } from "../../node_modules/lit-html/lit-html.js";
import { getItemDetails, updateItem } from "../services/appService.js";

let editTemplate = (item, onSubmit) => html`
<section id="editPage">
    <form class="editForm" @submit=${onSubmit}>
        <img src="${item.image}">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value="${item.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value="${item.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value="${item.age}">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value="${item.weight}">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value="${item.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
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
        let name = formData.get('name');
        let breed = formData.get('breed');
        let age = formData.get('age');
        let weight = formData.get('weight');
        let image = formData.get('image');

        let inputsArr = [name, breed, age, weight, image];
        let isEmpty = false;
        for (let item of inputsArr) {
            if (item === '') {
                isEmpty = true;
            }
        }

        if (isEmpty === false) {
            updateItem(ctx.params.itemId, name, breed, age, weight, image)
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