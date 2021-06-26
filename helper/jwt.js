var jwt = require('jsonwebtoken');

let authKey = 'jCafMvw(v4:*F.Ak*x$Xhsx2Lc@ru4F';

exports.createPayload = (key) =>{
	let payload = {secret : key }
	let token = jwt.sign(payload,authKey);
	return token;
}

exports.userVerify = (req,res,next) =>{
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if(!token){
		return res.json({success:401,msg:'Unauthorized'})
	}
	token = token.split(' ')[1];
	if(token === 'null'){
		return res.json({success:401,msg:'Unauthorized'});
	}else{
		let payload = jwt.verify(token,authKey)
		if(!payload){
			return res.json({success:401,msg:'Unauthorized'})
		}
		req.userId = payload.secret;
		next();
	}
}
