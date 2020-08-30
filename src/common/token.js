const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const { createOne } = require('../model/refresh-token');
const token = {};

token.generateToken = (data) => { 
	try { 
		const userToken = jwt.sign(data, "cb$2%#nldvejrLootahHoldingngjrtui432y7ryfhneroafjslk093irosd812ewi", { expiresIn : "12d" });
		return userToken;
	} catch (e) {
		throw e;
	}
}; 

token.generateRefreshToken = async (data) => {
	try{
		const refreshToken = crypto.randomBytes(40).toString('hex');
		console.log ( "refreshtoken called", data,  refreshToken)
		await createOne({ 
			user: data, 
			role: data.role,
			token: refreshToken,
			expires: new Date(Date.now() + 30*24*60*60*1000),
		})
		return refreshToken;
	} catch(e) {
		throw e;
	}
}

module.exports = token;
 
