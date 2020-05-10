const jwt = require("jsonwebtoken");

const token = {};

token.generateToken = (data) => { 
	try {
        console.log(data);
		const userToken = jwt.sign(data, "cb$2%#nldvejrLootahHoldingngjrtui432y7ryfhneroafjslk093irosd812ewi", { expiresIn : "30d" });

		return userToken;
	} catch (e) {
		throw e;
	}
};

module.exports = token;
