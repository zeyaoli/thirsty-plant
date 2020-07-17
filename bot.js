console.log("bot is starting")

const Twit = require('twit');
require('dotenv').config();
// console.log(process.env);
// const config = require('./config');
// console.log(config);

let T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
});

let params = {
    q: '#thirstyplant',
    count: 2
}

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    let tweets = data.statuses;
    for(let i=0; i<tweets.length; i++){
        console.log(tweets[i].text);
    }
}