const multer = require('multer');
const path = require('path');

const uploadeImage = {};

uploadeImage.single = (file, location, name) => {
    var fileName;
    console.log(file)
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, location);
      },
      filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        fileName = `${name}_${Date.now()}${extension}`;
        cb(null, fileName);
      }
    });
    
   
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG, and PNG files are allowed.'));
    }
  };

  const upload = multer({
    storage,
    limits: {
      fileSize: 2 * 1024 * 1024 // 2 MB
    },
    fileFilter
  });

  return (req, res, next) => {
    console.log(upload)
      upload.single(file)(req, res, (err) => {
          if (err) {
              return res.status(400).json({ status: false, msg: 'It should be jpg, png, jpeg file only, and size should be less than 2MB', data:err });
            }
            req.body.profilePicture = fileName
           
      next();
    });
  };
};

module.exports = uploadeImage;
