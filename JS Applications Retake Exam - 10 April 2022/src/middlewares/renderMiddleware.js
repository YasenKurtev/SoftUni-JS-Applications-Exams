import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationHandler } from '../handlers/navigationHandler.js';

let rootHeader = document.getElementsByTagName('header')[0];
let rootMain = document.getElementsByTagName('main')[0];

export let renderNavigation = (ctx, next) => {
    render(navigationHandler(ctx), rootHeader);
    next();
}

export let renderContent = (ctx, next) => {
    ctx.render = (template) => render(template, rootMain);
    next();
}