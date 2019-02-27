module.exports = {
    port: process.env.PORT || 5000,
    mongo_url: process.env.MONGO_URL || 'mongodb://localhost:27017/spotdb',
    geocodio_key: process.env.GEOCODIO_KEY,
    sock_port: 8000,
    secret: process.env.secret || 'tHs1sS0secRet' //This will be moved to .env for builds
}
