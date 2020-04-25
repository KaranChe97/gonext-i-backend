const bcrypt = require("bcrypt");

const pwHash = {};

pwHash.generateHash = async (data) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(data.toString(), salt);

		return hash;
	} catch (e) {
		throw e;
	}
};

pwHash.compareData = async (userPassword, hashedPassword) => {
	try {
		const isMatch = bcrypt.compare(userPassword, hashedPassword);

		return isMatch;
	} catch (e) {
		throw e;
	}
};


module.exports = pwHash;