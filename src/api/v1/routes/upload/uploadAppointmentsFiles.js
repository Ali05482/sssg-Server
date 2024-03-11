
const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const models = require("../../../../models");

const uploadDir = path.join(__dirname, '../../../../', 'uploads', 'questionnaires');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/appointment/:id', upload?.array('files'), async (req, res) => {
  try {
    console.log("req.files", req.files);
    if (req?.files?.length < 1) {
      return res.json({ status: false, msg: "No file uploaded" })
    }
    const checkFiles = await models.appointmentFiles.findOne({ appointment: req?.params?.id });
    if (checkFiles) {
      const existingFiles = checkFiles?.files;
      const files = [...existingFiles, ...req?.files?.map(file => file?.filename)];
      await models.appointmentFiles.updateOne({ appointment: req?.params?.id }, { files: files });
    } else {
      await models.appointmentFiles.create({ appointment: req?.params?.id, files: req?.files?.map(file => file?.filename) });
    }
    return res.json({ status: true, msg: "Files uploaded successfully", data: files })
  } catch (error) {
    console.log("error?.message", error?.message)
    res.status(500).json({ message: 'Error uploading files', error: error?.message });
  }
});

module.exports = router;
