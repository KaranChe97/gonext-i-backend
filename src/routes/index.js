const router = require("express").Router();

const auth = require("../middleware/auth");
const assert = require("assert");

const { upload, deleteFile } = require("../common/s3Upload");

const admin = require("./admin");
const service = require("./service");
const inventory = require("./inventory");
const myUsers = require("./myUsers");
const transaction = require("./transaction");

router.use("/admin", admin);
router.use("/service", service);
router.use("/inventory", inventory);
router.use("/myusers", auth, myUsers);
router.use("/transaction", auth, transaction);

router.post("/upload", async(req, res, next) => {
    try{ 
        var response = await upload(req, res);
        
        res.status(200).json({
            status : 1,
            message : "success",
            data : response.length > 0 && response[0].location ? response[0].location : ""
        });
    }catch(e){
    next(e);
    }
});

router.post("/deleteFile", async(req, res, next) => {
    try{
        assert(req.body.file,"file is required");
        var response = await deleteFile(req.body.file.substring(54));
        res.status(200).json({
            status : true,
            message : "success"
        });
    }catch(e){
    next(e);
    }
});

module.exports = router;