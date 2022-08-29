import { getUser } from "../services/userService.js";

export let authMiddleware = (ctx, next) => {
    ctx.user = getUser();

    next();
}