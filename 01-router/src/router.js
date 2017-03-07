import $ from 'jquery'

var routes = [];

export default function(route, func) {

  if(route == null) {
    $(document).on('click', 'a', handleLinkEvent);
    $(window).on('popstate', handlePopStateEvent);
    $(window).on('load', handleLoadEvent);
  }
  else {
    registerRoutes(route, func);
  }
}

function handleLinkEvent(event) {

  var rel = $(event.currentTarget).attr('rel');

  if(rel === 'download' || rel === 'external' || $(event.currentTarget).get(0).host !== location.host)
  {
    return;
  }
  event.preventDefault();

  var href = $(event.currentTarget).attr('href');

  navigate(href);
}

function handlePopStateEvent(event) {
  navigate(history.state);
}

function handleLoadEvent() {
  navigate(location.pathname);
}

function navigate(href) {

  var isRegistered = false;

  for (var obj of routes) {
    if (obj.route.test(href)) {
      isRegistered = true;

      if (href != history.state) {
        history.pushState(href, "title", href);
      }

      obj.func(href.split('/')[2]);
      break;
    }
  }
  if(!isRegistered) {
    routes[routes.length - 1].func();
  }
}

function registerRoutes(route, func) {

  route = getRegExOfRoute(route);

  var obj = {
    route,
    func
  };
  routes.push(obj);
}

function getRegExOfRoute(route) {
  var regExToReplace = /:[a-z]{0,}(?=\/|$)/g;
  var replaceWith = "[a-z]{1,}(?=\/|$)";

  if(route !== '*') {
    route = route.replace(regExToReplace, replaceWith);
  }
  else {
    route = '\\*';
  }

  return new RegExp(route + '$');
}



