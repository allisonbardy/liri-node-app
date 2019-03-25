// hides keys used for apis
require("dotenv").config();

// provess.env.SPOTIFY_ID
// project vars
var keys = require("./keys.js");

// var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var moment = require('moment');
var fs = require('fs');

var command = process.argv[2];
var argument = process.argv[3];

var commandList = {
"spotify-this-song": spotifyThisSong,
"movie-this": movieThis,
"concert-this": concertThis,
"do-what-it-says": doWhatItSays,
};

if (commandList[command]) {
  commandList[command](argument);
}
else {
  console.log("Unrecognized command");
};

function spotifyThisSong(song) {
  if (!argument) {
    song = "I Saw The Sign";
  }
  spotify
    .search ({ 
      type: "track", 
      query: song,
    })
      .then(function(response) {
        response.tracks.items.forEach(function (track) {
          console.log("\n------------------------------------------");
          console.log(`Preview: ${track.preview_url}`);
          console.log(`Track Name:  ${track.name}`);
          console.log(`Artist: ${track.artists[0].name}`);
          console.log(`Album: ${track.album.name}`);
          console.log("\n");
        })
      })
      .catch(function(err) {
        console.error(err);
      })
};



function movieThis(movie) {
  if (!argument) {
    movie = "Mr. Nobody";
  }
  axios
    .get(`https://www.omdbapi.com/?t=${movie}&apikey=trilogy`)
      .then(function(response) {
          console.log("\n------------------------------------------");
          console.log(`Movie Title: ${response.data.Title}`);
          console.log(`Year Released:  ${response.data.Year}`);
          console.log(`Actors:  ${response.data.Actors}`);
          console.log(`IMBD Rating:  ${response.data.imdbRating}`);
          console.log(`Produced in: ${response.data.Country}`);
          console.log(`Language:  ${response.data.Language}`);
          console.log(`Plot:  ${response.data.Plot}`);

          console.log("\n");
      })

      .catch(function(err) {
        console.error(err);
      })
};

function concertThis(artistname) {
  axios
    .get(`https://rest.bandsintown.com/artists/${artistname}/events?app_id=codingbootcamp`)
      .then(function(response) {
          var results = response.data;
          for(var i = 0; i < results.length; i++){
              var venue = results[i].venue;
              console.log("\n------------------------------------------");
              console.log(`Name of Venue: ${venue.name}`);
              console.log(`Venue location: ${venue.city}, ${venue.country}`);
              console.log("Date of the Event: "+ moment(results[i].datetime).format('MM/DD/YYYY'));    
              console.log("\n");
          }
      })
      .catch(function(err) {
        console.error(err); 
      })
};

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    else {
    spotifyThisSong("I Want It That Way")
    console.log(data);
    }
  });
}