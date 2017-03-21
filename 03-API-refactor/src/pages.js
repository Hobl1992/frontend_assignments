/**
 * Created by hobl on 06.03.17.
 */

import config from './config';
import api from './api';
import paging from './paging';
import getPage from './getPage';

import driversTpl from './templates/drivers.hbs';
import driverTpl from './templates/driver.hbs';
import constructorsTpl from './templates/constructors.hbs';
import constructorTpl from './templates/constructor.hbs';
import notFoundTpl from './templates/not-found.hbs';

export default {
  drivers: (ctx) => {
    let page = getPage(ctx);

    api.drivers.fetch(ctx, 20)
      .then(response => {
        const {drivers, total} = response;
        document.getElementById('app').innerHTML = driversTpl(
          {drivers}
        );
        paging('/drivers', page, total);
      })
      .catch(err =>
        document.getElementById('app').innerHTML = notFoundTpl()
      )
  },
  driver: (ctx) => {
    api.driver.fetch(ctx)
      .then(response => {
        document.getElementById('app').innerHTML = driverTpl(
          {driver: response.driver, constructor: response.constructor}
        );
      })
      .catch(err =>
        document.getElementById('app').innerHTML = notFoundTpl()
      )
  },
  constructors: (ctx) => {
    let page = getPage(ctx);

    api.constructors.fetch(ctx, 20)
      .then(response => {
        const {constructors, total} = response;
        document.getElementById('app').innerHTML = constructorsTpl(
          {constructors}
        );
        paging('/constructors', page, total);
      })
      .catch(err =>
        document.getElementById('app').innerHTML = notFoundTpl()
      )
  },
  constructor: (ctx) => {
    api.constructor.fetch(ctx)
      .then(response => {
        document.getElementById('app').innerHTML = constructorTpl(
          {drivers: response.drivers, constructor: response.constructor}
        );
      })
      .catch(err =>
        document.getElementById('app').innerHTML = notFoundTpl()
      )
  },
  notFound: (ctx) => {
    document.getElementById('app').innerHTML = notFoundTpl();
  }
};

