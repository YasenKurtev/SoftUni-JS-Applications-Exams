import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../services/authService.js";
import { setUser } from "../services/userService.js";

let loginTemplate = (onSubmit) => html`
<section id="login">
    <div class="container">
        <form id="login-form" action="#" method="post" @submit=${onSubmit}>
            <h1>Login</h1>
            <p>Please enter your credentials.</p>
            <hr>

            <p>Username</p>
            <input placeholder="Enter Username" name="username" type="text">

            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn" value="Login">
        </form>
        <div class="signin">
            <p>Dont have an account?
                <a href="#">Sign up</a>.
            </p>
        </div>
    </div>
</section>
`

export let loginHandler = (ctx) => {
    ctx.render(loginTemplate(onSubmit));

    function onSubmit(ev) {
        ev.preventDefault();
        let formData = new FormData(ev.target);
        let email = formData.get('username');
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