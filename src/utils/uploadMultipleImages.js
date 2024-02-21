const multer = require("multer");
const path = require("path");

const uploadImages = {};

uploadImages.multiple = (fileKey, location, name) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, location);
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      const fileName = `${name}_${Date.now()}${extension}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extName) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPEG, JPG, and PNG files are allowed."
        )
      );
    }
  };

  const upload = multer({
    storage,
    limits: {
      fileSize: 2 * 1024 * 1024, // 2 MB
    },
    fileFilter,
  });

  return (req, res, next) => {
    upload.array(fileKey)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          status: false,
          msg: "Only JPEG, JPG, and PNG files are allowed, and each file should be less than 2MB",
          data: err,
        });
      }
      const fileNames = req.files.map((file) => file.filename);
      req.body.profilePictures = fileNames;

      next();
    });
  };
};

module.exports = uploadImages;
