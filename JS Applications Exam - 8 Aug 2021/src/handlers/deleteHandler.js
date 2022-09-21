import { deleteItem } from "../services/appService.js"

export let deleteHandler = (ctx) => {
    let confirmed = confirm('Do you want to delete this item?');
    if (confirmed) {
        deleteItem(ctx.params.itemId)
            .then(() => ctx.page.redirect('/'));
    }
}