const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,next) => {
        next(null, 'public/images/avatars')
    },
    filename: (req,file,next) => {
        next(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage });

module.exports = { upload };