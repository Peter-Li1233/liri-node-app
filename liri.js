//get the reference to "dotenv" package;
require("dotenv").config();

//get the reference to the key.js;
var keys = require("./key.js");

//test what key.js exports;
// console.log(keys);
// console.log(keys.twitter.access_token_key);

//get the reference to the Twitter package;
var Twitter = require('twitter');
 
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