import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../services/authService.js";
import { setUser } from "../services/userService.js";

let registerTemplate = (onSubmit) => html`
<section id="registerPage">
    <form class="registerForm" @submit=${onSubmit}>
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="#">here</a></span>
        </p>
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