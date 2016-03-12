// This file will handle requests to IMGUR API
var Fetch = require('whatwg-fetch');
var rootUrl = 'https://api.imgur.com/3/';
var apiKey = '629cf4720ad6ea4';

module.exports = {
    get: function(url) {
        return fetch(rootUrl + url, {
            headers: {
                'Authorization': 'Client-ID ' + apiKey
            }
        })
        .then(function(response) {
            return response.json()
        })
    }
};
 
