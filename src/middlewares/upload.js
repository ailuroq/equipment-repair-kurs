const multer = require('multer');
const pool = require('../database/pool');
const path = require('path');
const util = require('util');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: async (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname;
        console.log(filename, req.params.id)
        req.filename = filename;
        cb(null, filename);
    }
});

let uploadFile = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024}, //1MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            const err = new Error('Extension');
            return cb(err);
        }
        cb(null, true);
    }
}).single('file');

let uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
