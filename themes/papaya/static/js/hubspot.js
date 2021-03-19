function formv3(){
    // Create the new request
    console.log('test form');
    var xhr = new XMLHttpRequest();
    var url = 'https://api.hsforms.com/submissions/v3/integration/submit/6876576/7185e054-82cd-475a-871b-9747be9f059f'

    // Example request JSON:
    var data = {
        "submittedAt": "1517927174000",
        "fields": [
            {
                "name": "email",
                "value": "example@example.com"
            }
        ],
        "context": {
            "hutk": ':hutk', // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
            "pageUri": "https://unybrands.netlify.app/",
            "pageName": "Home page"
        },
        "legalConsentOptions":{ // Include this object when GDPR options are enabled
            "consent":{
                "consentToProcess":true,
                "text":"I agree to allow Example Company to store and process my personal data.",
                "communications":[
                    {
                        "value":true,
                        "subscriptionTypeId":999,
                        "text":"I agree to receive marketing communications from Example Company."
                    }
                ]
            }
        }
    }

    var final_data = JSON.stringify(data)

    xhr.open('POST', url);
    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText); // Returns a 200 response if the submission is successful.
        } else if (xhr.readyState == 4 && xhr.status == 400){
            alert(xhr.responseText); // Returns a 400 error the submission is rejected.
        } else if (xhr.readyState == 4 && xhr.status == 403){
            alert(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
        } else if (xhr.readyState == 4 && xhr.status == 404){
            alert(xhr.responseText); //Returns a 404 error if the formGuid isn't found
        }
    }


    // Sends the request

    xhr.send(final_data)
}
formv3();
