var mongoose = require('mongoose');

var bookSchema=new mongoose.Schema({
	title:String,
	author:String,
	price:Number,
	pages:Number,
	language:String,
	description:String,
	createdAt:{type:Date,default:Date.now()}
},{"versionKey":false});

var book = mongoose.model('book',bookSchema);

module.exports=book;
