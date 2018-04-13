
var mongoose = require('mongoose');

var dbUrl = 'mongodb://localhost:27017/Reveelz';

mongoose.connect(dbUrl, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + dbUrl + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + dbUrl);
    }
});
module.exports = mongoose.connection;