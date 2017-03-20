/**
 * Created by hobl on 06.03.17.
 */

import config from './config';
import paging from './paging';
import handbarsHelpers from './handlebarsHelpers';
import getValue from './getValue';

import driversTpl from './templates/drivers.hbs';
import driverTpl from './templates/driver.hbs';
import constructorsTpl from './templates/constructors.hbs';
import constructorTpl from './templates/constructor.hbs';
import notFoundTpl from './templates/not-found.hbs';

export default
{
  drivers : (ctx) => {
    let val = getValue(ctx);

    fetch(`${config.api.url}/drivers.json?limit=${20}&offset=${20 * (val - 1)}`)
      .then( response =>
        response.json())
      .then( response => {
        document.getElementById('app').innerHTML = driversTpl(
          {
            drivers: response.MRData.DriverTable.Drivers
          }
        )
        paging('/drivers', val, response.MRData.total);
      })
      .catch( err => {
          document.getElementById('app').innerHTML = notFoundTpl();
      });
  },
  driver: (ctx) => {
    const urls = [
      `${config.api.url}/drivers/${ctx.params.id}/constructors.json`,
      `${config.api.url}/drivers/${ctx.params.id}.json`
    ];

    Promise
      .all(urls.map( url =>
        fetch(url)
          .then( response =>
            response.json()
          )
        )
      )
      .then(response => {
        const lastConstructor = response[0].MRData.ConstructorTable.Constructors[parseInt(response[0].MRData.total) - 1];
        const driver = response[1].MRData.DriverTable.Drivers[0];

        document.getElementById('app').innerHTML = driverTpl(
          {
            constructor: lastConstructor,
            driver
          });
      })
      .catch( err => {
        console.log(err);
        document.getElementById('app').innerHTML = notFoundTpl();
      });
  },
  constructors: (ctx) => {
    let val = getValue(ctx);

    fetch(`${config.api.url}/constructors.json?limit=${20}&offset=${20 * (val - 1)}`)
      .then(response =>
        response.json())
      .then(response => {
        document.getElementById('app').innerHTML = constructorsTpl({constructors: response});
        paging('/constructors', val, response.MRData.total);
      })
      .catch( err =>
        document.getElementById('app').innerHTML = notFoundTpl()
      );
  },
  constructor: (ctx) => {
    const urls = [
      `${config.api.url}/constructors/${ctx.params.id}.json`,
      `${config.api.url}/constructors/${ctx.params.id}/drivers.json`,
    ];

    Promise
      .all(urls.map( url =>
        fetch(url)
          .then(response =>
            response.json()
          )
        )
      )
      .then(response => {
        const driverConstructor = response[0].MRData.ConstructorTable.Constructors[0];
        const drivers = response[1].MRData.DriverTable.Drivers;

        document.getElementById('app').innerHTML = constructorTpl(
          {
            constructor: driverConstructor,
            drivers
          });
      })
      .catch(err => {
        document.getElementById('app').innerHTML = notFoundTpl()
      });
  },
  notFound: (ctx) => {
    document.getElementById('app').innerHTML = notFoundTpl();
  }
};

