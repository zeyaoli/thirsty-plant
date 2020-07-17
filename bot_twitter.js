console.log("bot_stream is starting")

const Twit = require('twitter');
require('dotenv').config();
// console.log(process.env);

let Tweet = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
});

let params = {
    q: '#plant OR #thirsty',
    count: 5,
    result_type: 'recent',
    lang: 'en'
}

Tweet.get('search/tweets', params, consoleTweet);

function consoleTweet(err, data, response){
    if(!err){
        let tweets = data.statuses;
        for(let i=0; i<tweets.length; i++){
            console.log(tweets[i].text);
        }
    } else {
        console.log(err);
    }
}