/**
 * Created by hobl on 06.03.17.
 */

import page from 'page';
import pages from './pages';

page('/', '/drivers');
page('/drivers', pages.drivers);
page('/driver/:id', pages.driver);
page('/constructors', pages.constructors);
page('/constructor/:id', pages.constructor);
page('*', pages.notFound)
page.start();


