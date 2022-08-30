import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../services/authService.js";
import { setUser } from "../services/userService.js";
import { errorMessageHandler } from "../handlers/errorMessageHandler.js"

let loginTemplate = (onSubmit) => html`
<section id="login">
    <form id="login-form" @submit=${onSubmit}>
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="#">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>
`

export let loginHandler = (ctx) => {
    ctx.render(loginTemplate(onSubmit));

    function onSubmit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('email');
        let password = formData.get('password');

        if (email !== '' && password !== '') {
            login(email, password)
                .then(res => {
                    if (!res.ok) {
                        ev.target.reset();
                        throw new Error('Ivalid email or password!!!');
                    } else {
                        return res.json();
                    }
                })
                .then(user => {
                    setUser(user);
                    ev.target.reset();
                    ctx.page.redirect('/')
                })
                .catch(err => errorMessageHandler(ctx, err));
        } else {
            errorMessageHandler(ctx, 'There are empty fields!!!');
        }
    }
}