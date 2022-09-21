import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../services/authService.js";
import { setUser } from "../services/userService.js";

let registerTemplate = (onSubmit) => html`
<section id="register-page" class="register">
    <form id="register-form" action="" method="" @submit=${onSubmit}>
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
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
        let repeatPassword = formData.get('confirm-pass');

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