console.log("bot_stream is starting")

const Twit = require('twit');
require('dotenv').config();
// console.log(process.env);

let T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
});

let stream = T.stream('user');

stream.on('follow', followed);

function followed(event){
    console.log("Follow!!");
    let name = event.source.name;
    let screenName = event.source.screen_name;
    console.log(screenName);
}