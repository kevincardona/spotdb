module.exports = {
    port: process.env.PORT || 5000,
    mongo_url: process.env.MONGO_URL || 'mongodb://localhost:27017/spotdb',
    geocodio_key: 'c6cdc66262525000492221a9c14c6f151c94296',
    sock_port: 8000,
    secret: process.env.secret || 'tHs1sS0secRet' //This will be moved to .env for builds
}