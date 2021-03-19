import * as $ from 'jquery'
import { sendXhrData, defaultRequiredText } from '@/scripts/forms/forms-config'

export function applicationForm() {
  const $applicationForm = $('#xhr-application');

  $applicationForm.find('.submit-btn').on('click', () => {
    let appErrCount = 0;
    const $fieldsInput = $applicationForm.find('.field-input');

    // перевірка текстових інпутів на required
    $fieldsInput.each((index, field) => {
      const $input = $(field).find('input');
      const $spanText = $input.siblings('span.text');
      if (!$input.val().length) {
        appErrCount++;
        $spanText.text(defaultRequiredText);
      } else {
        $spanText.text('');
      }
    });

    // перевірка email input на правильність емейла
    const $emailInput = $fieldsInput.find('input#email');
    const $emailSpanText = $emailInput.siblings('span.text');
    if ($emailInput.val().length && $emailInput.is(':invalid')) {
      appErrCount++;
      $emailSpanText.text('Incorrect email')
    }

    // перевірка phone input на правильність номера
    const $phoneInput = $fieldsInput.find('input#phone');
    const $phoneSpanText = $phoneInput.siblings('span.text');
    if ($phoneInput.val().length && $phoneInput.is(':invalid')) {
      appErrCount++;
      $phoneSpanText.text('Not a valid Phone Number')
    }

    // перевірка radio на то чи вибране хоть одне значення
    const $radioSpanText = $applicationForm.find('.checkboxes-block span.text');
    if (!$applicationForm.find('input[name="revenue"]').is(':checked')) {
      $radioSpanText.text('Need to select a value');
      appErrCount++;
    } else {
      $radioSpanText.text('');
    }

    // перевірка чи є у формі помилки і їх кількість
    const $errorForm = $applicationForm.find('.error-form');
    if (appErrCount) {
      $applicationForm.addClass('error');
      $('#application-form').addClass('error');
      $errorForm.addClass('red');
      $($errorForm).find('span.text').text(`Incorrect value in ${appErrCount} fields`);
    } else {
      $applicationForm.removeClass('error');
      $('#application-form').removeClass('error');
      $errorForm.removeClass('red');
      $($errorForm).find('span.text').text('');

      const dataApplicationForm = {
        'fields': [
          { name: 'your_full_name',     value: $applicationForm.find('input#name').val() },
          { name: 'your_e_mail',        value: $applicationForm.find('input#email').val() },
          { name: 'your_phone_number',  value: $applicationForm.find('input#phone').val() },
          { name: 'your_brand',         value: $applicationForm.find('input#company').val() },
          { name: 'company_revenue',    value: $applicationForm.find('input[name="revenue"]:checked').val() },
          { name: 'your_message',       value: $applicationForm.find('textarea#message').val() }
        ],
        'context': { pageUri: 'https://unybrands.netlify.app/', pageName: 'Home page'
        },
        'legalConsentOptions': { // Include this object when GDPR options are enabled
          'consent': {
            'consentToProcess': true,
            'text': 'I agree to allow Example Company to store and process my personal data.',
            'communications': [
              {
                'value': true,
                'subscriptionTypeId': 999,
                'text': 'I agree to receive marketing communications from Example Company.'
              }
            ]
          }
        }
      }

      const url = 'https://api.hsforms.com/submissions/v3/integration/submit/6876576/0801fcfe-773e-4824-af5b-db156ba2a7b8'

      sendXhrData($applicationForm, dataApplicationForm, url);
    }
  });
}
