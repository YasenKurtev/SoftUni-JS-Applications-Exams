import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../services/authService.js";
import { setUser } from "../services/userService.js";

let loginTemplate = (onSubmit) => html`
<section id="loginaPage">
    <form class="loginForm" @submit=${onSubmit}>
        <h2>Login</h2>
        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>
        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="#">here</a></span>
        </p>
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