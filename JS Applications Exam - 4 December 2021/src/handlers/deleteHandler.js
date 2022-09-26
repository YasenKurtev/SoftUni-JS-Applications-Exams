import { deleteItem, getItemDetails } from "../services/appService.js"

export let deleteHandler = (ctx) => {
    getItemDetails(ctx.params.itemId)
        .then(res => res.json())
        .then(item => {
            let confirmed = confirm('Do you want to delete this item?');
            if (confirmed) {
                deleteItem(ctx.params.itemId)
                    .then(() => page.redirect('/'));
            }
        })
}