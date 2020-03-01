const express = require('express');
const fs = require('fs');
const port = 23456;
const filename = 'message.json';

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let encode = function (shift, message) {
    let output = '';
    for (let i = 0; i < message.length; i++) {
        if (message[i].match(/[a-z]/i)) {

            // Get its code
            let code = message.charCodeAt(i);

            // Uppercase letters
            if ((code >= 65) && (code <= 90))
                output += String.fromCharCode(((code - 65 + shift) % 26) + 65);

            // Lowercase letters
            else if ((code >= 97) && (code <= 122))
                output += String.fromCharCode(((code - 97 + shift) % 26) + 97);

        }
        else {
            output += message[i];
        }
    }
    return output
};

const check_input = function(request){
    if(! request.body.hasOwnProperty('Shift')){
        throw new Error('Shift Key Missing in Input JSON');
    }
    if(! request.body.hasOwnProperty('Message')){
        throw new Error('Message Key Missing in Input JSON');
    }
    if( typeof request.body.Shift != 'number'){
        throw new Error('Shift Value is not numeric');
    }
    if(typeof request.body.Message != 'string'){
        throw new Error('Message Value is not String')
    }
};

app.post('/api/encode', function (request, response) {
    let encoded_message_json = {'EncodedMessage': ''};
    try{
        check_input(request);
        encoded_message_json['EncodedMessage'] = encode(request.body.Shift, request.body.Message);
        fs.writeFile(filename, JSON.stringify(encoded_message_json), err => {
           if(err) throw err;
        });
        response.status(200);

    } catch (e) {
        console.log(e);
        response.status(500);
    }
    response.send(encoded_message_json);
});

app.listen(port);

