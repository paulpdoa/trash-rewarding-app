const multer = require('multer');
const path = require('path');

// This serves as a way to upload files in this server

const storage = multer.diskStorage({
    destination: (req,file,next) => {
        next(null, 'public/images') // means every upload will be uploaded to public folder
    },
    filename: (req,file,next) => {
        next(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

module.exports = { upload };