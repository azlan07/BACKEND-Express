const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'doilg1m0l',
    api_key: '433865781989791',
    api_secret: 'SNQa-ftMmEM1jwcvnSStaezr6lU',
    secure: true
})

module.exports = cloudinary