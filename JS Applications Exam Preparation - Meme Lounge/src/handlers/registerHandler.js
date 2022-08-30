import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../services/authService.js";
import { setUser } from "../services/userService.js";
import { errorMessageHandler } from "../handlers/errorMessageHandler.js"

let registerTemplate = (onSubmit) => html`
<section id="register">
    <form id="register-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="#">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>
`

export let registerHandler = (ctx) => {
    ctx.render(registerTemplate(onSubmit));

    function onSubmit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let username = formData.get('username');
        let email = formData.get('email');
        let password = formData.get('password');
        let repeatPassword = formData.get('repeatPass');
        let gender = formData.get('gender');

        if (username !== '' && email !== '' && password !== '' && password === repeatPassword) {
            register(username, email, password, gender)
                .then(res => res.json())
                .then(user => {
                    setUser(user);
                    ev.target.reset();
                    ctx.page.redirect('/');
                })
                .catch(err => alert(err));
        } else {
            errorMessageHandler(ctx, 'There are empty fields!!!');
        }
    }
}