var cloudinary = require('cloudinary').v2;
// var cloudinaryURL = require('./config/cloudinaryURL')



cloudinary.config({ 
    cloud_name: 'purwadhika-startup-and-coding-school', 
    api_key: '394951552522159', 
    api_secret: 'TDwOIYuITdV08ipBOukJ58lpjKw' 
  });

module.exports = cloudinary