/**
 * Created by hobl on 07.03.17.
 */

import Handlebars from 'hbsfy/runtime';
import moment from 'moment';

Handlebars.registerHelper('link', function(url, text){

  return new Handlebars.SafeString(
    "<a href='" + url + "'>" + text + "</a>"
  );
});

Handlebars.registerHelper('concat', function(con, cat){

  return new Handlebars.SafeString(
    con + cat
  );
});

Handlebars.registerHelper('moment', function (date) {
  return moment(date).format("D.MM.YYYY");
});
