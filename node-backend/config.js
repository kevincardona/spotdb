if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

module.exports = {
    port: process.env.PORT || 5000,
    mongo_url: process.env.MONGODB_URI,
	geocodio_key: process.env.GEOCODIO_KEY,
    sock_port: 8000,
    secret: process.env.secret || 'tHs1sS0secRet' //This will be moved to .env for builds
}
