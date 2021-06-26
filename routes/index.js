var express = require('express');
var router = express.Router();
var CryptoJS = require('crypto-js');
var {check,validationResult} = require('express-validator');

var book = require('../model/book');
var user = require('../model/user');
var jwt = require('../helper/jwt');
var validate = require('../helper/validation');


router.post('/register',validate.register,(req,res)=>{
	var info = req.body;
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		res.json({msg:errors.array()[0].msg});
	}else{
		user.findOne({email:info.email},(err,data)=>{
			if(!data){
				
				var obj={
					username:info.username,
					email:info.email,
					password:info.password
				}
				user.create(obj,(err,userRes)=>{
					if(userRes){
						res.json({msg:'Registered successfully'})
					}else{
						res.json({msg:err})
					}
				})
			}else{
				res.json({msg:'Email already exists'})
			}
		})
	}
	
})

router.post('/login',validate.login,(req,res)=>{
	let info = req.body;
	user.findOne({$and:[{email:info.email},{password:info.password}]},(err,resdata)=>{
		let userId = resdata._id;
		let authKey = jwt.createPayload(userId);
		if(resdata){
			res.json({msg:'LoggedIn successfully!',token:authKey});
		}else{
			res.json({msg:'Invalid credentials'})
		}
	})
})

router.post('/createbook',jwt.userVerify,validate.bookadd,(req,res)=>{
	let info = req.body;
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		res.json({msg:errors.array()[0].msg});
	}else{
		let obj = {
			"title":info.title,
			"author":info.author,
			"price":info.price,
			"pages":info.pages,
			"language":info.language,
			"description":info.description
		}
		book.create(obj,(err,data)=>{
			if(data){
				res.json(data);

			}else{
				res.json(err);
			}
		})
	}
	
})


router.get('/booklist',jwt.userVerify,(req,res)=>{
	book.find({},{title:1,author:1},(err,booklist)=>{
		if(booklist){
			res.json(booklist);
		}else{
			res.json(err);
		}
	})
})

router.get('/viewbook/:id',jwt.userVerify,(req,res)=>{
	let id = req.params.id;
	book.findOne({_id:id},{_id:0},(err,data)=>{
		if(data){
			res.json(data);
		}else{
			res.json(err);
		}
	})
})


router.post('/updatebook/:id',jwt.userVerify,(req,res)=>{
	let id = req.params.id;
	let info = req.body;
	let obj = {
		"title":info.title,
		"author":info.author,
		"price":info.price,
		"pages":info.pages,
		"language":info.language,
		"description":info.description
	}
	book.updateOne({_id:id},{$set:obj},(err,updatebook)=>{
		if(updatebook){
			res.json({msg:'Book updated',data:updatebook});
		}else{
			res.json({msg:err});
		}
	})
})

router.get('/delete/:id',jwt.userVerify,(req,res)=>{
	let id = req.params.id;
	book.deleteOne({_id:id},(err,deletebook)=>{
		if(deletebook){
			res.json({msg:'Book deleted'});
		}else{
			res.json({msg:err});
		}
	})
})

module.exports = router;
