/** @format */

const multer = require("multer");
const path = require("path");

const upload = (storagePath) => {
    // set multer storage
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, storagePath);
        },
        filename: (req, file, cb) => {
            const fileName = Date.now() + path.extname(file.originalname);
            file.originalname = fileName;
            cb(null, fileName);
        },
    });

    //initialize multer
    return multer({ storage: storage });
};

module.exports = upload;
