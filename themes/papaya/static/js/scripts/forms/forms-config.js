import * as $ from 'jquery'

export const defaultRequiredText = 'This field is required';

export function sendXhrData($form, data, url) {
  // Create the new request
  const xhr = new XMLHttpRequest();

  const finalData = JSON.stringify(data)

  xhr.open('POST', url);
  // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Returns a 200 response if the submission is successful.
      // inlineMessage: "Thanks for submitting the form."
      const { inlineMessage } = JSON.parse(xhr.responseText);
      $form.find('.error-form span').text(inlineMessage);
      $form.find('.error-form').addClass('green');
      if ($form.parents('footer')) {
        $('footer .form-input').addClass('green');
      }
      setTimeout(() => {
        $form.submit();
      }, 3000)
    } else if (xhr.readyState === 4 && xhr.status === 400) {
      // Returns a 400 error the submission is rejected.
      const { errors } = JSON.parse(xhr.responseText);
      $form.find('.error-form span').text(errors[0].message);
      $form.find('.error-form').addClass('red');
      $('footer .form-input').addClass('red');
    } else if (xhr.readyState === 4 && xhr.status === 403) {
      $form.find('.error-form span').text('Error 403');
      $form.find('.error-form').addClass('red');
      if ($form.parents('footer')) {
        $('footer .form-input').addClass('red');
      }

      // Returns a 403 error if the portal isn't allowed to post submissions.
    } else if (xhr.readyState === 4 && xhr.status === 404) {
      $form.find('.error-form span').text('Error 404'); // Returns a 404 error if the formGuid isn't found
      $form.find('.error-form').addClass('red');
      if ($form.parents('footer')) {
        $('footer .form-input').addClass('red');
      }
    }
  }

  // Sends the request
  xhr.send(finalData)
}
