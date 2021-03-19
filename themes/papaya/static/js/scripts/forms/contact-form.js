import * as $ from 'jquery';
import { sendXhrData, defaultRequiredText } from '@/scripts/forms/forms-config'

export function contactForm() {
  const $contactForm = $('#xhr-form-contact');
  $contactForm.find('.submit-btn').on('click', () => {
    $('#xhr-form-contact').each(function() {
      if ($(this).find('p input').val().length === 0) {
        $('.error-form span.text').text(defaultRequiredText);
        $('.error-form').addClass('red')
      } else {
        const dataFormContact = {
          'fields': [
            {
              'name': 'email',
              'value': $contactForm.find('input#email').val(),
            },
            {
              'name': 'firstname',
              'value': $contactForm.find('input#name').val(),
            },
            {
              'name': 'message',
              'value': $contactForm.find('textarea#message').val(),
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
        const url = 'https://api.hsforms.com/submissions/v3/integration/submit/6876576/99f36a4e-abc0-4eed-9ef2-ba60847c7b63'

        sendXhrData($contactForm, dataFormContact, url);
      }
    });
  })
}
