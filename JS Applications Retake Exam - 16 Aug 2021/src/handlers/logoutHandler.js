import { logout } from "../services/authService.js"
import { clearUser } from "../services/userService.js"

export let logoutHandler = (ctx) => {
    logout().then(() => {
        clearUser();
        ctx.page.redirect('/');
    })
        .catch(err => alert(err));
}