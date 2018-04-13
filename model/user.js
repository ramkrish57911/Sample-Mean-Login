
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
module.exports = mongoose.model('User', new Schema({

    fname: {type:String,trim:true},
	lname: {type:String,trim:true},
	email: {type:String,trim:true},
	username: {type:String,trim:true},
	password: {type:String,trim:true},
	phone: {type:Number,trim:true},
    deleteuser : {type:String,trim:true}
	
    }));
	

