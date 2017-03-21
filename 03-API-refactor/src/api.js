/**
 * Created by hobl on 20.03.17.
 */

import config from './config';
import getPage from './getPage';

export default {
  drivers: {
    fetch: (ctx, limit) => {
      const page = getPage(ctx);

      return fetch(`${config.api.url}/drivers.json?limit=${limit}&offset=${limit * (page - 1)}`)
        .then( response =>
          response.json())
        .then( response => {
          return {drivers: response.MRData.DriverTable.Drivers, total: response.MRData.total};
        });
    }
  },
  driver : {
    fetch: (ctx) => {
      const urls = [
        `${config.api.url}/drivers/${ctx.params.id}/constructors.json`,
        `${config.api.url}/drivers/${ctx.params.id}.json`
      ];

      return Promise
        .all(
          urls.map( url =>
            fetch(url)
              .then( response =>
                response.json()
              )
          )
        )
        .then(response => {
          const constructor = response[0].MRData.ConstructorTable.Constructors[parseInt(response[0].MRData.total) - 1];
          const driver = response[1].MRData.DriverTable.Drivers[0];

          return {driver, constructor};
        })
    }
  },
  constructors: {
    fetch: (ctx, limit) => {
      const page = getPage(ctx);

      return fetch(`${config.api.url}/constructors.json?limit=${limit}&offset=${limit * (page - 1)}`)
        .then(response =>
          response.json())
        .then(response => {
          return {constructors: response.MRData.ConstructorTable.Constructors, total: response.MRData.total};
        })
    }
  },
  constructor: {
    fetch: (ctx) => {
      const urls = [
        `${config.api.url}/constructors/${ctx.params.id}.json`,
        `${config.api.url}/constructors/${ctx.params.id}/drivers.json`,
      ];

      return Promise
        .all(
          urls.map( url =>
            fetch(url)
              .then(response =>
                response.json()
              )
          )
        )
        .then(response => {
          const constructor = response[0].MRData.ConstructorTable.Constructors[0];
          const drivers = response[1].MRData.DriverTable.Drivers;

          return {drivers, constructor}
        })
    }
  }
}
