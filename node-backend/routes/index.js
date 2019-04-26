var router = require("express").Router();
var spotify = require("./spotify");
var user = require("./user");
var database = require("./database")
var util = require("./util");
var tweets = require("./tweets");

router.get("/", (req, res) => {
  res.send({ success: "true", message: "Connected to SpotDB server." });
});

router.get("/login", spotify.login);
router.post("/authorized", user.authorize);
router.get("/getaddress", util.getAddress); //Gets lat/lon in query and returns address
router.get("/getTweetInfo", tweets.getTweetInfo);

// Anything below requires user to be logged in
router.use(user.authenticate);
router.get("/authenticate", (req, res) => {
  return res.json({ success: true, authenticated: true });
});
router.get("/search", spotify.search);
router.get("/accountinfo", spotify.accountInfo);
router.get("/artist", spotify.artist);
router.get("/artistalbums", spotify.artistAlbums);
router.get("/albumtracks", spotify.albumTracks);
router.get("/topartists", spotify.topArtists);
router.get("/getHome", user.getHome);
router.post("/sethome", user.setHome);
router.get("/listening", spotify.listening);
router.post("/currentlisteners", spotify.currentListeners);
router.post("/locallisteners", spotify.localListeners);
router.post("/saveSong", spotify.saveSong);
router.post("/play", spotify.play);
router.post("/pause", spotify.pause);
router.get("/library", spotify.library);
router.get("/newalbums", spotify.newAlbums);
router.get("/songanalytics", spotify.songAnalytics);
router.get("/firstartist", spotify.firstArtist);
router.post("/addArtistToDB", database.addArtistToDB);
module.exports = router;
