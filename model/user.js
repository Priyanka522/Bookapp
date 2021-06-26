var mongoose = require('mongoose');

var userSchema=new mongoose.Schema({
	username:String,
	email:String,
	password:String,
	createdAt:{type:Date,default:Date.now()}
},{"versionKey":false});

var user = mongoose.model('user',userSchema);

module.exports=user;
