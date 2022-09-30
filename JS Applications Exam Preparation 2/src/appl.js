import page from '../../node_modules/page/page.mjs';
import { allListingsHandler } from './handlers/allListingsHandler.js';
import { createHandler } from './handlers/createHandler.js';
import { deleteHandler } from './handlers/deleteHandler.js';
import { detailsHandler } from './handlers/detailsHandler.js';
import { editHandler } from './handlers/editHandler.js';
import { homepageHandler } from './handlers/homepageHandler.js';
import { loginHandler } from './handlers/loginHandler.js';
import { logoutHandler } from './handlers/logoutHandler.js';
import { myListingsHandler } from './handlers/myListingsHandler.js';
import { registerHandler } from './handlers/registerHandler.js';
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
page('/allListings', allListingsHandler);
page('/create', createHandler);
page('/myListings', myListingsHandler);
page('/byYear', searchHandler);
page('/:itemId', detailsHandler);
page('/:itemId/edit', editHandler);
page('/:itemId/delete', deleteHandler);

page.start();