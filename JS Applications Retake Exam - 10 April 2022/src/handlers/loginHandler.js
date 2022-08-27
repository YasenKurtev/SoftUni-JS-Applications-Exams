import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../services/authService.js";
import { setUser } from "../services/userService.js";

let loginTemplate = (onSubmit) => html`
<section id="login-page" class="auth">
    <form id="login" @submit=${onSubmit}>
        <h1 class="title">Login</h1>

        <article class="input-group">
            <label for="login-email">Email: </label>
            <input type="email" id="login-email" name="email">
        </article>

        <article class="input-group">
            <label for="password">Password: </label>
            <input type="password" id="password" name="password">
        </article>

        <input type="submit" class="btn submit-btn" value="Log In">
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