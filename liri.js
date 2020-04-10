require("dotenv").config();
// Grab Spotify keys securely 
var keys = require("./keys.js");

// Grab the axios package
var axios = require("axios");

// grab and read random.txt
var fs = require("fs");

var moment = require("moment");

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
    var concertURL = `https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`;

    axios.get(concertURL).then(function (response) {
        
        // Venue Information
        for (var i = 0; i < response.data.length; i++) {
            console.log (`\nVenue Name: ${response.data[i].venue.name}\nVenue Location: ${response.data[i].venue.city}, ${response.data[i].venue.country},\nEvent date and time: ${moment(response.data[i].datetime).format("MM-DD-YYYY LT")}`);
        };
    });
}

function music() {
    if (command === "spotify-this-song" && process.argv[3] === undefined) {
        input = "Chupando";
    }

    spotify
    .search ({ type: 'track', query: input, limit: 1 }, function(err, data){
        if (err) {
            console.log(`an error occured: ${err}`);
        } else {
            console.log(`\nArtist(s): ${data.tracks.items[0].artists[0].name}\nSong Name: ${data.tracks.items[0].name}\nPreview Link: ${data.tracks.items[0].preview_url}\nAlbum: ${data.tracks.items[0].album.name}`);
        };
    });
}
