const router = require("express").Router();

const auth = require("../middleware/auth");
const assert = require("assert");

const { upload, deleteFile } = require("../common/s3Upload");

const admin = require("./admin");
const pipeline = require("./pipeline");
const operationalMetric = require("./operationalMetric");
const basicMeasure = require("./basicMeasure");
const competitiveAdvantage = require("./competitiveAdvantage");
const valueChain = require("./valueChain");
const resourceAndExpense = require("./resourceAndExpense");
const boardEffectiveness = require("./boardEffectiveness");
const boardMemberReview = require("./boardMemberReview");
const audit = require("./audit");
const finance = require("./finance");
const strategicKPI = require("./strategicKPI");
const brainTrust = require("./brainTrust");
const idea = require("./idea");
const profile = require("./profile");
const service = require("./service");

router.use("/admin", admin);
router.use("/pipeline", auth , pipeline);
router.use("/operationalMetric", auth, operationalMetric);
router.use("/basicMeasure", auth, basicMeasure);
router.use("/competitiveAdvantage", competitiveAdvantage);
router.use("/valueChain", valueChain);
router.use("/resourceAndExpense", resourceAndExpense);
router.use("/boardEffectiveness", boardEffectiveness);
router.use("/boardMemberReview", boardMemberReview);
router.use("/audit", audit);
router.use("/finance", finance);
router.use("/strategicKPI", strategicKPI);
router.use("/brainTrust", brainTrust);
router.use("/idea", idea);
router.use("/profile", profile);
router.use("/service", service);

router.post("/upload", async(req, res, next) => {
    try{
        var response = await upload(req, res);
        res.status(200).json({
            status : true,
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