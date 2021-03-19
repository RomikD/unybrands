import * as $ from 'jquery'
import { sendXhrData, defaultRequiredText } from '@/scripts/forms/forms-config'

export function footerForm() {
  const $footerForm = $('#xhr-form-footer');
  $footerForm.find('.submit-btn').on('click', () => {
    const $emailInput = $footerForm.find('input[type="email"]');
    const $footerError = $footerForm.find('.error-form');
    const $footerErrorSpanText = $footerError.find('span.text');
    if ($footerForm.find('.one-input input').val().length === 0) {
      $footerForm.find('.form-input').addClass('red');
      $footerError.addClass('red');
      $footerError.find('span.text').text(defaultRequiredText);
    } else if ($emailInput.is(':invalid')) {
      $footerError.addClass('red');
      $footerForm.addClass('error')
      $footerErrorSpanText.text('Incorrect email')
    } else {
      $footerForm.find('.form-input').removeClass('red');
      $footerError.removeClass('red');
      $footerForm.removeClass('error');
      $footerErrorSpanText.text('');

      const dataFormFooter = {
        'fields': [
          {
            'name': 'email',
            'value': $footerForm.find('.one-input input').val(),
          }
        ],
        'context': {
          'pageUri': 'https://unybrands.netlify.app/',
          'pageName': 'Home page'
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
      const url = 'https://api.hsforms.com/submissions/v3/integration/submit/6876576/13e940ba-51e4-4e54-ad7d-c2ba5aa88c6e';
      sendXhrData($footerForm, dataFormFooter, url);
    }
  })
}
