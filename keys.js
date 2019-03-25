// hides keys used for apis
require("dotenv").config();


module.exports = {
  spotify: {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET,
  },
};


// exports.spotify = {
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET
// };
//  exports.ombd = {
//     id: process.env.OMBD_ID,
//   };
  // write the same for the other apis