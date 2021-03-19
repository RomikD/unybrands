import './scss/index.scss';
import * as $ from 'jquery';
import { scrollAnimation } from './scripts/scroll-animation';
import { footerForm } from './scripts/forms/footer-form';
import { contactForm } from './scripts/forms/contact-form';
import { applicationForm } from './scripts/forms/application-form';

footerForm();

contactForm();

applicationForm();

window.addEventListener('load', scrollAnimation);

$('#experience .members .one-m a').on('click', function(e) {
  e.preventDefault();
});

$('#experience .members .one-m').on('click', function() {
  if ($(this).find('p').hasClass('description')) {
    $(this).find('.description').removeClass('description');
    $(this).find('a').hide();
    $(this).find('a.showless').show();
  } else {
    $(this).find('p.opys').addClass('description');
    $(this).find('a').show();
    $(this).find('a.showless').hide();
  }
});
// history.pushState(null, null, '/team/') /* міняє теперішню ссилку сторінки (це як консоль лог лиш в адресну строку =)) */
const $anchors = $('.links a');
$anchors.each(function(i, anchor) {
  if ($(anchor).attr('href') === window.location.pathname) {
    $(this).addClass('active')
  }
});

$('.menu-btn').on('click', function() {
  const $links = $('.links');
  const $btn = $('.button-btn span');

  $links.toggle();
  if ($btn.hasClass('afterclick')) {
    $btn.removeClass('afterclick');
  } else {
    $btn.addClass('afterclick');
  }
});
