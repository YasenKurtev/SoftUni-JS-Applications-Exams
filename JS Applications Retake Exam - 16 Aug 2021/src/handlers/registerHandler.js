import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../services/authService.js";
import { setUser } from "../services/userService.js";

let registerTemplate = (onSubmit) => html`
<section id="register-page" class="content auth">
    <form id="register" @submit=${onSubmit}>
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="#">here</a></span>
            </p>
        </div>
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
        let repeatPassword = formData.get('confirm-password');

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