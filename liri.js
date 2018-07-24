//get the reference to "dotenv" package;
require("dotenv").config();

//get the reference to the key.js;
var keys = require("./key.js");

//test what key.js exports;
// console.log(keys);
// console.log(keys.twitter.access_token_key);

//get the reference to "request" package;
var request = require("request");

//get the reference to the Twitter package;
var Twitter = require('twitter');
var liriArguments = process.argv[2];

switch(liriArguments) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        mySpotify();
        break;
    case "movie-this":
        movieThis();
        break;
    default:
        console.log("Please type in your arguments carefully")
}

function myTweets() { 
    var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
    });
    
    var params = {screen_name: 'PeterLi48661338',
                //   id:'1020358710923755522',
                //   count: 10,
                //   result_type: 'recent',
                //   lang: 'en'
                };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        // console.log(tweets.length);
        for(i=0;i<tweets.length;i++) {
            var count = i+1;
            var twitterResults = 
                "------------------------------ " + count + " ------------------------------" + "\r\n" +
                "@" + tweets[i].user.screen_name + ": " + 
                tweets[i].text + "\r\n" + 
                tweets[i].created_at + "\r\n" + 
                "\r\n";
                console.log(twitterResults);
        }
    } else {
        console.log("Error" + error);
        return;
    }
    });

}

function mySpotify() {
    var Spotify = require('node-spotify-api');
    
    var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
    });

    if(process.argv[3]) {
        songName = process.argv[3];
    } else {
        songName = "The Sign";
    }
    
    spotify
    .search({ type: 'track', query: songName })
    .then(function(response) {
        var songsInfo = response.tracks.items;

        for(i=0;i<songsInfo.length;i++) {
            // console.log(response.tracks.items[i]);
            var count = i+1;
          
            console.log("---------"+ count +"---------")
            console.log("Artist: " + songsInfo[i].artists[0].name);
            console.log("Song: " + songsInfo[i].name);
            console.log("Album: " + songsInfo[i].album.name);
            console.log("Preview: " + songsInfo[i].preview_url);
            console.log ("");
            
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

function movieThis() {

    var movieName = process.argv[3];

    if(!process.argv[3]) {
        movieName = "Mr. Nobody";
    } 

    var url = "http://www.omdbapi.com/?t=" + movieName +"&y=&plot=short&apikey=trilogy";
    // console.log(url);
    
    request(url, function(error, response, body) {

   // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    //console.log(JSON.parse(body));
    var movieInfo = JSON.parse(body);
    var movieResults = 
    "----------------------------Movie Information--------------------------" +"\r\n" +
                           "Title:          " + movieInfo.Title               +"\r\n" +
                           "Year:           " + movieInfo.Year                +"\r\n" +
                           "IMDB Rating:     " + movieInfo.imdbRating          +"\r\n" +
                           "Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value +"\r\n" +
                           "Country: " + movieInfo.Country                    +"\r\n" +
                           "Plot: " + movieInfo.Plot                          +"\r\n" +
                           "Actors: " + movieInfo.Actors                      +"\r\n" +
    "-----------------------------------------------------------------------";
    console.log(movieResults);
  } else {
      console.log("Error: " + error);
  }
});
} 