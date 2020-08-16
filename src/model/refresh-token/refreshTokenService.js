const refreshTokens = require("./refresh-token-model");

const refreshTokenService = {}; 

refreshTokenService.createOne = (data) => refreshTokens.create(data);

refreshTokenService.getOne = (token) => refreshTokens.findOne({ token });

refreshTokenService.edit = (id, data) => refreshTokens.findByIdAndUpdate({ _id: id}, data);

module.exports = refreshTokenService;     