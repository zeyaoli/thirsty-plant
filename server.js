const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const twitterWebhooks = require("twitter-webhooks");

app.listen(80, () => console.log("listening at 80"));
app.use(bodyParser.json());

// Setting up the serial communication
const serialport = require("serialport");
const Readline = require("@serialport/parser-readline");

const port = new serialport("/dev/cu.usbmodem62045401", {
  baudRate: 9600,
});
const parser = port.pipe(
  new Readline({
    delimiter: "\n",
  })
);

//Read the port data
port.on("open", () => {
  console.log("serial port open. data rate: " + port.baudRate);
});

parser.on("data", (data) => {
  console.log("got word from arduino:", data);
});

port.on("close", () => {
  console.log("port closed.");
});

port.on("error", () => {
  console.log("Serial port error:" + error);
});

// if catches the too much resources error then change a dev environment --> code: 214
// if catches client application is not permitted then revoke the accessToken -->code: 348

const userActivityWebhook = twitterWebhooks.userActivity({
  // Fill out the url that you want to serve the data (i use ngrok for a virtual server)
  serverUrl: "",
  route: "/twitter", //default : '/'
  // fill out the api key here
  consumerKey: "",
  consumerSecret: "",
  accessToken: "",
  accessTokenSecret: "",
  environment: "lsc", //default : 'env-beta'
  app,
});

//Register your webhook url - just needed once per URL
// Register it every time it changes the ngrok website.
// Only put subscribe function in then

// ******************************
// userActivityWebhook.register().then(() => {

// });
// userActivityWebhook.register();
// *******************************

userActivityWebhook
  .subscribe({
    userId: "lizeyao",
    accessToken: "356808904-u52DK9IkZK2BFL05Lziz0oCDKyQZqGU9anx9hbLK",
    accessTokenSecret: "wA9Ij43BMBvuqiGgUhsecn2pEySbVe7QZJmk1sWzSCoR0",
  })
  .then(function (userActivity) {
    console.log("new user activity");
  })
  .catch((err) => {
    console.log("#######################");
    console.log(err);
    console.log("#######################");
  });

//listen to any user activity
userActivityWebhook.on("event", (event, userId, data) => {
  switch (event) {
    case "favorite":
      console.log(userId + " - favorite");
      port.write("Q");
      break;

    case "follow":
      console.log(userId + " - follow");
      port.write("A");
      break;

    default:
      break;
  }

  // console.log(event)
});

//listen to unknown payload (in case of api new features)
userActivityWebhook.on("unknown-event", (rawData) => console.log(rawData));
