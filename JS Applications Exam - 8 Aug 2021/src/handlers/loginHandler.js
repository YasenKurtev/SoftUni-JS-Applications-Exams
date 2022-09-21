import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../services/authService.js";
import { setUser } from "../services/userService.js";

let loginTemplate = (onSubmit) => html`
<section id="login-page" class="login">
    <form id="login-form" action="" method="" @submit=${onSubmit}>
        <fieldset>
            <legend>Login Form</legend>
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
            <input class="button submit" type="submit" value="Login">
        </fieldset>
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
                .catch(err => alert(err));
        } else {
            alert('There are empty fields!');
        }
    }
}