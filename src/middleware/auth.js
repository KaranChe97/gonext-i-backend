const jwt = require("jsonwebtoken");
const admin = require("../model/admin");
const refreshTokens = require("../model/refresh-token");

const auth = async (req, res, next) => {
	try {
		let token = req.headers["x-access-token"] || req.headers.authorization; // Express headers are auto converted to lowercase
		// console.log(token);
		if (token && token.startsWith("Bearer ")) {
			// Remove Bearer from string 
			token = token.slice(7, token.length); 
			if (token) {
				const data = jwt.verify(token, "cb$2%#nldvejrLootahHoldingngjrtui432y7ryfhneroafjslk093irosd812ewi");
				// eslint-disable-next-line no-underscore-dangle
				const cb = await admin.getByID(data._id);

				if (cb) {
					// eslint-disable-next-line no-underscore-dangle
					req.body.gonextId = cb._id; 
					req.body.gonextRole = cb.role;
					next(); 
				} else {
					throw new Error("user not found");
				}
			} else {
				throw new Error("Auth token is not supplied");
			}
		} else {
			throw new Error("Auth token is not supplied");
		}
	} catch (e) { 
		res.status(401).json({
			status : false,
			message : e.message || "NOT AUTHORIED"
		});
	}
};


module.exports = auth;