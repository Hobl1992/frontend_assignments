import $ from 'jquery';
import router from './router';

import homeTpl from './templates/home.hbs';
import contactTpl from './templates/contact.hbs';
import notFoundTpl from './templates/not-found.hbs';
import playerTpl from './templates/player.hbs';

const $app = $('#app');

function index() {
  $app.html(homeTpl());
}

function contact() {
  $app.html(contactTpl());
}

function notFound() {
  $app.html(notFoundTpl());
}

function players(dynamicPart) {
    $app.html(playerTpl({dynamicPart}));
}

router('/', index);
router('/contact', contact);
router('/players/:player', players);
router('*', notFound);
router();
