const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: "AKIAZYQSBSGQ6DKW4ZJ2",
    secretAccessKey: "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",
    region: "ap-southeast-1",
});

const s3 = new aws.S3();

const maxCount = 100;

const upload = async (req, res) => {
    const uploadFile = multer({
        storage: multerS3({
            s3,
            bucket: "boringcodecompany",
            acl: 'public-read',
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata(req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key(req, file, cb) {
                const extension = `${Date.now()}_${file.originalname}`;
                cb(null, extension);
            },

        }),
    }).array('file', maxCount);

    return new Promise(((resolve, reject) => {
        try {
            console.log('inside');
            uploadFile(req, res, ((error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(req.files);
                }
            }));
        } catch (e) {
            reject(e);
        }
    }));
};

const deleteFile = async (key) => new Promise(((resolve, reject) => {
    s3.deleteObject({
        Bucket: "boringcodecompany",
        Key: key,
    }, (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    });
}));

module.exports = {
    upload,
    deleteFile,
};