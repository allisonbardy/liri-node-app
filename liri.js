// hides keys used for api requests
require("dotenv").config();

// required files/installed packages
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var fs = require('fs');

// variables for command line inputs
var command = process.argv[2];
var argument = process.argv[3];

// object with keys and commands 
var commandList = {
  "spotify-this-song": spotifyThisSong,
  "movie-this": movieThis,
  "concert-this": concertThis,
  "do-what-it-says": doWhatItSays,
};

// if command is entered by user, run function with entered argument 
if (commandList[command]) {
  commandList[command](argument);
}
else {
  console.log("Unrecognized command");
};

// function to send song request to spotify API
function spotifyThisSong(song) {
  // if no argument entered, default argument
  if (!argument) {
    song = "I Saw The Sign";
  }
  // search spotify track with song 
  spotify
    .search ({ 
      type: "track", 
      query: song,
    })
    // function to console log response when data is received
      .then(function(response) {
        //for each song it will console log the following data
        response.tracks.items.forEach(function (track) {
          console.log("\n------------------------------------------");
          console.log(`Preview: ${track.preview_url}`);
          console.log(`Track Name:  ${track.name}`);
          console.log(`Artist: ${track.artists[0].name}`);
          console.log(`Album: ${track.album.name}`);
          console.log("\n");
        })
      })
      // if error, console logs error message
      .catch(function(err) {
        console.error(err);
      })
};

// function to send movie request to ombd API through axios
function movieThis(movie) {
    // if no argument entered, default argument
  if (!argument) {
    movie = "Mr. Nobody";
  }
  // search ombd API movie with movie
  axios
    .get(`https://www.omdbapi.com/?t=${movie}&apikey=trilogy`)
      // function to console log response when data is received
      .then(function(response) {
          console.log("\n------------------------------------------");
          console.log(`Movie Title: ${response.data.Title}`);
          console.log(`Year Released:  ${response.data.Year}`);
          console.log(`Actors:  ${response.data.Actors}`);
          console.log(`IMBD Rating:  ${response.data.imdbRating}`);
          console.log(`Rotten Tomatoes Rating:  ${response.data.Ratings[1].Value}`);
          console.log(`Produced in: ${response.data.Country}`);
          console.log(`Language:  ${response.data.Language}`);
          console.log(`Plot:  ${response.data.Plot}`);
          console.log("\n");
      })
      // if error, console logs error message
      .catch(function(err) {
        console.error(err);
      })
};

// function to send artist event request to bands in town API through axios
function concertThis(artistname) {
    // if no argument entered, default argument
    if (!argument) {
      artistname = "Drake";
    }
  // search bands in town API for events with artistname
  axios
    .get(`https://rest.bandsintown.com/artists/${artistname}/events?app_id=codingbootcamp`)
      // function to console log response when data is received
      .then(function(response) {
          var results = response.data;
          // for loop to iterate through all the venues/events for artistname
          for(var i = 0; i < results.length; i++){
              var venue = results[i].venue;
              // function to console log response when data is received
              console.log("\n------------------------------------------");
              console.log(`Name of Venue: ${venue.name}`);
              console.log(`Venue location: ${venue.city}, ${venue.country}`);
              console.log("Date of the Event: "+ moment(results[i].datetime).format('MM/DD/YYYY'));    
              console.log("\n");
          }
      })
      // if error, console logs error message
      .catch(function(err) {
        console.error(err); 
      })
};

// function to read file with fs 
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    // if error, console log error
    if (error) {
      return console.log(error);
    }
    else {
      // split data from text file
      data = data.split(",");
      // assign data values to command and argument variables
      var command = data[0];
      var argument = data[1];
      // run function and consolde log with data values from text file
      commandList[command](argument);
      console.log(command, argument);
    }
  });
};
