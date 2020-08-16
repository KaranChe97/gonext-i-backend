const assert = require("assert");
const moment  = require('moment');

const { getOne, createOne, edit } = require("../../model/refresh-token");
const { getByID } = require("../../model/admin");
const { generateToken, generateRefreshToken } = require("../../common/token");

const refreshToken = {};

refreshToken.refresh = async (req, res, next) => {
    try {
        const {  refreshToken } = req.params;
        const oldToken = await getOne(refreshToken);
        const { user, role, _id } = oldToken;
        if (!oldToken || !oldToken.isActive) {
            res.status(200).json({
                status: 2,
                message: 'Invalid token'
            })    
        } else {
            if(role && role === "admin"){
                const data = await getByID(user);  
                const newRefreshToken = await generateRefreshToken(data);
                oldToken.revoked = Date.now();
                oldToken.replacedByToken = newRefreshToken;
                await edit(_id, oldToken);
                const token = await generateToken(data._doc);
                console.log(oldToken);
                res.status(200).json({
                    status : 1,
                    message : "success",
                    data : {
                        user : data,
                        token,
                        refreshToken: newRefreshToken
                    }
                });
            }
            else if( role && role === "user") {
                // TODO chekc for user id
            }
        }

    } catch(e){
        next(e); 
    }
}


module.exports = refreshToken;