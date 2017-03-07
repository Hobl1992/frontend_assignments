/**
 * Created by hobl on 07.03.17.
 */

import Handlebars from 'hbsfy/runtime'

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
