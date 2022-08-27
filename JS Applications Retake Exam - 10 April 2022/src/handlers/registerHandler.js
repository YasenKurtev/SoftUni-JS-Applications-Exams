import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../services/authService.js";
import { setUser } from "../services/userService.js";

let registerTemplate = (onSubmit) => html`
<section id="register-page" class="auth">
    <form id="register" @submit=${onSubmit}>
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
    </form>
</section>
`

export let registerHandler = (ctx) => {
    ctx.render(registerTemplate(onSubmit));

    function onSubmit(ev) {
        ev.preventDefault();

        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPassword');

        if (email !== '' && password !== '' && password === repeatPassword) {
            register(email, password)
                .then(res => res.json())
                .then(user => {
                    setUser(user);
                    ev.target.reset();
                    ctx.page.redirect('/');
                })
                .catch(err => alert(err));
        } else {
            alert('Error!!!');
        }
    }
}