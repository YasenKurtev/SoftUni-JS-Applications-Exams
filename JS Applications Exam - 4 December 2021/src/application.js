import page from '../../node_modules/page/page.mjs';
import { catalogHandler } from './handlers/catalogHandler.js';
import { createHandler } from './handlers/createhandler.js';
import { deleteHandler } from './handlers/deleteHandler.js';
import { detailsHandler } from './handlers/detailsHandler.js';
import { editHandler } from './handlers/edithandler.js';
import { homepageHandler } from './handlers/homepageHandler.js';
import { loginHandler } from './handlers/loginHandler.js';
import { logoutHandler } from './handlers/logouthandler.js';
import { registerHandler } from './handlers/registerhandler.js';
import { searchHandler } from './handlers/searchHandler.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderContent, renderNavigation } from './middlewares/renderMiddleware.js';

page(authMiddleware);
page(renderNavigation);
page(renderContent);

page('/', homepageHandler);
page('/login', loginHandler);
page('/register', registerHandler);
page('/logout', logoutHandler);
page('/catalog', catalogHandler);
page('/create', createHandler);
page('/search', searchHandler);
page('/:itemId', detailsHandler);
page('/:itemId/edit', editHandler);
page('/:itemId/delete', deleteHandler);


page.start();