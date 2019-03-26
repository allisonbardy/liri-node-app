# LIRI (Language Interpretation and Recognition Interface)

Command line node app in which user sends requests using the axios package to the Bands in Town, Spotify and OMDB APIs and retrieves the data.

## Installation
Enter "npm install" in command line to download packages 

## Commands to Run

node liri.js spotify-this-song "input track name" <br /><br />
Received Data: <br />
1. Preview URL
2. Track name
3. Artist
4. Album

node liri.js movie-this "input movie name" <br /><br />
Received Data: <br />
1. Movie title
2. Year released
3. Actors in the film
4. IMBD rating
5. Country produced in
6. Language
7. Plot

node liri.js concert-this "input artist name" <br /><br />
Received Data: <br />
1. Venue name
2. Venue location (city, country)
3. Event date

node liri.js do-what-it-says <br /><br />
Received Data: <br />
1. Retreives data from random text file
2. Uses this data to send request with spotify API

## DEMO VIDEO

https://drive.google.com/file/d/18pHlonIOJR3b6FJJth3nbRY9iGDb0c5y/view?usp=sharing
