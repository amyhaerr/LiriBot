require("dotenv").config();
// Grab Spotify keys securely 
var keys = require("./keys.js");


// Grab the axios package
var axios = require("axios");

var moment = require("moment");

// grab and read random.txt
var fs = require("fs");

// Grab Spotify package
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
// Use slice and join in case artist has spaces in name
var input = process.argv.slice(3).join(" ");
console.log(command, input);

switch (command) {
    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        music();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        random();
        break;
    default:
        console.log("Please submit a valid request");

}

function concert() {
    var concertUrl = `https://rest.bandsintown.com/artists/${input}events?app_id=codingbootcamp`;

    axios
        .get(concertUrl).then(function (repsonse) {
            console.log(response.data);
        });
}
