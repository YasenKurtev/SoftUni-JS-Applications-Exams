import page from '../../node_modules/page/page.mjs';
import { createHandler } from './handlers/createHandler.js';
import { dashboardHandler } from './handlers/dashboardHandler.js';
import { deleteHandler } from './handlers/deleteHandler.js';
import { detailsHandler } from './handlers/detailsHandler.js';
import { editHandler } from './handlers/editHandler.js';
import { loginHandler } from './handlers/loginHandler.js';
import { logoutHandler } from './handlers/logoutHandler.js';
import { myBooksHandler } from './handlers/myBooksHandler.js';
import { registerHandler } from './handlers/registerHandler.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderContent, renderNavigation } from './middlewares/renderMiddleware.js';

page(authMiddleware);
page(renderNavigation);
page(renderContent);

page('/', dashboardHandler);
page('/login', loginHandler);
page('/register', registerHandler);
page('/logout', logoutHandler);
page('/create', createHandler);
page('/myBooks', myBooksHandler);
page('/:itemId', detailsHandler);
page('/:itemId/edit', editHandler);
page('/:itemId/delete', deleteHandler);

page.start();