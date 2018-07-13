let dotEnv = require("dotenv").config();

let keys = require("./keys.js");

var fs = require("fs");

var action = process.argv[2];
var input = process.argv.slice(3).join(" ");

switch (action) {
    case "sectionTwitter":
        client.findTweets()
        break;

    case "sectionSpotify":
        if (!input) {
            input = "The Sign"
        }
        spotify.findSong(input);
        break;

    case "sectionOmdb":
        if (!input) {
            input = "Mr Nobody"
        }
        movie.findMovie(input)
        break;
}


function sectionTwitter() {

    var Twitter = require('twitter');

    var client = new Twitter(keys.twitter);

    let client = function () {
        this.findTweets = function () {

            var params = { student_fahy: 'nodejs' };
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error && response.statusCode === 200) {
                    let tweetInfo = JSON.stringify(tweets, null, 2)[0].created_at.text;
                    console.log("Here are my tweets:" + tweetInfo + "\n");
                }
            });
        }
    }
}

function sectionSpotify() {

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);

    let query = input;
    // // let queryUrl = "https://api.spotify.com/v1/search/q=" + searchTerm;
    let spotify = function () {

        this.findSong = function () {
            spotify.search({ type: 'track', query: 'Crazy', limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                let completeList = JSON.stringify(data, null, 2);
                console.log(completeList);

                let artistName = completeList.album.artists[0].name;
                let songName = completeList.album.name;
                console.log("Artists name: " + artistName);
                console.log("Song name: " + songName);

                console.log("Preview URL: " + JSON.parse(data, null, 2).Preview_url);
                console.log("Album name: " + JSON.parse(data, null, 2).Album);
            });
        }
    }
}


function sectionOmdb() {

    var request = require("request");

    let movieName = input;

    let movie = new request();

    let request = function () {

        this.findMovie = function (movieName) {

            let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
            request(queryUrl, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                }

                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoes);
                console.log("Country of Production: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            });
        }
    }
}
new request().findMovie("")
new spotify().findSong("")
new client().findTweets()
