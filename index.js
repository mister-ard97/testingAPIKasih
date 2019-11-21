var express = require('express'),
    http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
const port = 2019
const bodyParser = require('body-parser')
const cors = require('cors')
const bearerToken = require('express-bearer-token');
const fs = require('fs')
require('./scheduler/schedulers')

app.use(bodyParser.json())
app.use(cors())

app.io = io

app.use(bodyParser.urlencoded({extended : false}))
app.use(express.static('public')) 


app.use(bearerToken())

const {
    userRouter, 
    paymentRouter,
    studentRouter,
    // studentDetailRouter,
    projectRouter,
    testRouter, 
    studentRevisionRouter,
    scholarshipRouter,
    // studentDetailRevisionRouter,
    subscriptionRouter,
    // schoolRouter,
    payoutRouter
} = require('./router')

// cloudinary.v2.uploader.upload("dog.mp4", 
//   { resource_type: "video", 
//     public_id: "my_folder/my_sub_folder/dog_closeup",
//     chunk_size: 6000000,
//     eager: [
//       { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
//       { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
//     eager_async: true,
//     eager_notification_url: "www.google.com" },
//   function(error, result) {console.log(result, error)});

app.use("/user", userRouter)
app.use('/payment', paymentRouter)
app.use("/user", userRouter)
app.use('/student',studentRouter)
app.use("/project", projectRouter)
// app.use("/studentdetail", studentDetailRouter)
app.use('/test',testRouter)
app.use('/studentrev', studentRevisionRouter)
app.use('/scholarship', scholarshipRouter)
// app.use('/studentdetailrev', studentDetailRevisionRouter);
app.use('/subscription', subscriptionRouter);
// app.use('/school', schoolRouter)
app.use('/payout', payoutRouter)

console.log('masuk io')
io.on('connection', (socket) => {
        console.log('User connected')
        io.emit('user connected', {})
        socket.on('disconnect', () => {
                console.log('user disconnected')
                io.emit('user connected', {})
        })
})



app.get('/', (req, res) => {
    res.status(200).send(
        `<h3>Welcome to Kasih Nusantara API</h3>`
    )
})

server.listen(port, ()=>console.log('listen on port ' + port));

// CLOUDINARY
// UI TO API, API TO CLOUDINARY
// const cloudinary = require('./config/cloudinary')

// console.log(__dirname)
// cloudinary.uploader.upload(`${__dirname}/public/post/image/project/PJT1571217869195.png`, 
//     function(error, result) {
//         console.log(result, error)
//     });

// YOUTUBE 
// const Youtube = require("youtube-api")
//     , readJson = require("r-json")
//     , Lien = require("lien")
//     , Logger = require("bug-killer")
//     , opn = require("opn")
//     , prettyBytes = require("pretty-bytes")
//     ;
    

// const CREDENTIALS = readJson(`${__dirname}/config/credentials.json`);

// // Init lien server
// let serveryoutube = new Lien({
//     host: "localhost"
//   , port: 5000
// });



// // Authenticate
// // You can access the Youtube resources via OAuth2 only.
// // https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
// let oauth = Youtube.authenticate({
//     type: "oauth"
//   , client_id: CREDENTIALS.web.client_id
//   , client_secret: CREDENTIALS.web.client_secret
//   , redirect_url: CREDENTIALS.web.redirect_uris[0]
// })

// ;

// opn(oauth.generateAuthUrl({
//     access_type: "offline"
//   , scope: ["https://www.googleapis.com/auth/youtube.upload"]
// }));

// // //socketio

// serveryoutube.addPage("/oauth2callback", lien => {
//     console.log('asidjais')
//     Logger.log("Trying to get the token using the following code: " + lien.query.code);
//     oauth.getToken(lien.query.code, (err, tokens) => {

//         if (err) {
//             lien.lien(err, 400);
//             return Logger.log(err);
//         }

//         Logger.log("Got the tokens.");

//         oauth.setCredentials(tokens);

//         lien.end("The video is being uploaded. Check out the logs in the terminal.");

//         var req = Youtube.videos.insert({
//             resource: {
//                 // Video title and description
//                 snippet: {
//                     title: "Testing YoutTube API NodeJS module"
//                   , description: "Test video upload via YouTube API"
//                 }
//                 // I don't want to spam my subscribers
//               , status: {
//                     privacyStatus: "public"
//                 }
//             }
//             // This is for the callback function
//           , part: "snippet,status"

//             // Create the readable stream to upload the video
//           , media: {
//                 body: fs.createReadStream("pidio.mp4")
//             }
//         }, (err, data) => {
//             //url = https://youtu.be/${data.id}
//             console.log("Done.");
//             console.log(err)
//             console.log(data)
//             console.log(lien)
//             process.exit();
//             // return true
//         });

//         setInterval(function () {
//             Logger.log(`${prettyBytes(req.req.connection._bytesDispatched)} bytes uploaded.`);
//         }, 250);
//     });
// });















