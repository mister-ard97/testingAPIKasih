const multer = require('multer');
const fs = require('fs');

//Convert the file size to megabytes (optional)
// var fileSizeInMegabytes = fileSizeInBytes / 1000000.0

// Return multer object

module.exports = {
    uploader(destination, fileNamePrefix){
        let defaultPath = './public';
        
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const dir = defaultPath + destination;
                if (fs.existsSync(dir)) {
                    console.log(dir, "exists")
                    cb(null, dir);
                } else {
                    fs.mkdir(dir, { recursive: true }, err => cb(err, dir));
                    console.log(dir, "make")
                }
            },
            filename: (req, file, cb) => {
                console.log(file)
                let originalname = file.originalname;
                let ext = originalname.split('.');
                let filename = fileNamePrefix + Date.now() + '.' + ext[ext.length - 1];
                cb(null, filename);
            }
        });
    
        const imageFilter = (req, file, callback) => {
            const ext = /\.(jpg|jpeg|png|gif|pdf|doc|docx|xlsx|svg|mp4|mp3)$/;
            if (!file.originalname.toLowerCase().match(ext)) {
                return callback(new Error('Only selected file type are allowed'), false);
            }
            callback(null, true);
        };

        return multer({
            storage: storage,
            fileFilter: imageFilter,
            limits : {
                fileSize :  90 * 1024 * 1024 // maximum of 90 MB File
            }
        });
    }
}