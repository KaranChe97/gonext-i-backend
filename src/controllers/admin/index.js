const assert = require("assert");
const { getAll, getOne, getByID, createOne, edit, deleteOne, checkCompanyId } = require("../../model/admin");
const { createPurchaseId } = require("../../model/purchaseId");
const { createCompanyId, findAndIncrement, isCollectionExist } = require("../../model/companyId");
const { generateToken, generateRefreshToken } = require("../../common/token");
const { compareData, generateHash } = require("../../common/hash");
const { COMPANYIDFORMAT } = require('../../common/constants');
const admin = {};


// async function revokeToken({ token, ipAddress }) {
//     const refreshToken = await getRefreshToken(token);

//     // revoke token and save
//     refreshToken.revoked = Date.now();
//     refreshToken.revokedByIp = ipAddress;
//     await refreshToken.save();
// }


// async function getRefreshTokens(userId) {
//     // check that user exists
//     await getUser(userId);

//     // return refresh tokens for user
//     const refreshTokens = await db.RefreshToken.find({ user: userId });
//     return refreshTokens;
// }

// async function getRefreshToken(token) {
//     const refreshToken = await db.RefreshToken.findOne({ token }).populate('user');
//     if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
//     return refreshToken;
// }


admin.getAll = async (req, res, next) => {
    try{
        const data = await getAll();
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    } 
}; 

admin.login = async (req, res, next) => {
    try{
        assert(req.body.phonenumber, "phonenumber is required");
        assert(req.body.password, "password is required");

        const data = await getOne(req.body.phonenumber);

        if(data)
        {
            const isPasswordSame = await compareData(req.body.password, data.password);
            if(isPasswordSame){
                const token = await generateToken(data._doc); 
                const refreshToken = await generateRefreshToken(data); 
                res.status(200).json({
                    status : 1,
                    message : "success",
                    data : {
                        user : data,
                        token,
                        refreshToken
                    }
                });
            } else {
                res.status(200).json({
                    status: 0,
                    message : 'Incorrect Password',
                })
            }            
        } else {
            res.status(200).json({
                status: 2,
                message: 'Account not exist. Please signup.'
            })
        }
    } catch(e){
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
};

admin.getOne = async (req, res, next) => {
    try{
        const data = await getByID(req.body.gonextId);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        next(e); 
    } 
};

admin.create = async (req, res, next) => { 
    try{ 
        console.log('create api', req.body)
        assert(req.body.phonenumber, "phonenumber is required");
        assert(req.body.password, "password is required");
        assert(req.body.role, "role is required");
        assert(req.body.name, "Name is required");
        assert(req.body.address, "Address is required");
        const isExist = await getOne(req.body.phonenumber);
        console.log("phone exist", isExist)
        if(isExist) {
            res.status(200).json({
                status: 0,
                message: 'Phone number already exist.'
            }) 
        } else {

            let isCompanyIdExists = await isCollectionExist(COMPANYIDFORMAT);

            let companyInit = "";

            if(!isCompanyIdExists) {
                companyInit = await createCompanyId();
            } else {
                companyInit = await findAndIncrement(COMPANYIDFORMAT);
            }

            req.body.companyId =  `${companyInit._id}${companyInit.sequence}`;
            await createPurchaseId({ _id: req.body.companyId, sequence: 0 });
            const data = await createOne(req.body);
            const token = await generateToken(data._doc);
            const refreshToken = await generateRefreshToken(data); 
            res.status(200).json({
                status : 1, 
                message : "success",
                token,
                refreshToken,
                data
            });
        }       
    } catch(e) {
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        if(e.message === 'Phone number already exist.') {
            e.errCode = 2;
        }
        next(e);
    }
};

admin.edit = async (req, res, next) => {
    try{
        assert(req.body.phonenumber, "phonenumber is required");
        assert(req.body.name, "name is required");
        assert(req.body.address, "address is required");
        const data = await edit(req.body.gonextId, req.body);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
};
 
admin.deleteOne = async (req, res, next) => {
    try{ 
        const data = await deleteOne(req.body.gonextId);
        res.status(200).json({
            status : 1,
            message : "success",
            data
        });
    }catch(e){
        next(e);
    }
};

admin.deleteAdmin = async (req, res, next) => {
    try{
        assert(req.body.phonenumber, "phonenumber is required");
        console.log(req.body.phonenumber);
        const data = await getOne(req.body.phonenumber);
        if(data) {
            const deleted = await deleteOne(data._id);            
            res.status(200).json({
                status : 1,
                message : "successfully deleted",
                deleted
            });
        } else {
            res.status(200).json({
                status: 2,
                message: 'account not found'
            })
        }
    }catch(e){
        next(e);
    }
};

admin.changePassword = async (req, res, next) => {
    try {
        assert(req.body.password, "current password is required");
        assert(req.body.newPassword, "New Password is required");
        const data = await getByID(req.body.gonextId); 
        if(data){
        const {password, newPassword} = req.body;
        let validPassword = await compareData(password, data.password);
        if(validPassword) {
            data.password = await generateHash(newPassword);
            var saveData =  await edit(req.body.gonextId, data);
            if(saveData) {
                res.status(200).json({
                    status: 1,
                    message: 'Password changed successfully',
                    data: data
                })
            }
        } else {
            res.status(200).json({ 
                status: 0,
                message: "Incorrect password"  
            })
        }
    } else {
        res.status(200).json({
            status: 0,
            message: 'Account not found'
        })
    }
    } catch(e) {
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
}

admin.forgetPassword = async (req, res, next) => {
    try {
        assert(req.body.phonenumber, "Phone number is required");
        assert(req.body.password, "Password is required");
        const data = await getOne(req.body.phonenumber);
        if(data) {
            data.password = await generateHash(req.body.password);
            var saveData =  await edit(data._id, data);

            if(saveData) {
                res.status(200).json({
                    status: 1,
                    message: 'Password changed successfully. Login to continue',
                    data: data
                })
            }
        } else {
            res.status(200).json({
                status: 0,
                message: 'Phone number is not found. Please sign up.'
            })
        }
    } catch (e) {
        if(e.code === 'ERR_ASSERTION') {
            e.status = 200;
        }
        next(e);
    }
}

module.exports = admin;