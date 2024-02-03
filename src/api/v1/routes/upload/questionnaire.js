
const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname,'../../../../' ,'uploads', 'questionnaires');

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

router.post('/questionnaire', upload?.array('files'), (req, res) => {
  try {
    console.log("req.files", req.files);
    if(req?.files?.length < 1) return res.json({status:false,msg:"No file uploaded"})
    return res.json({status:true,msg:"", data:req?.files?.map(file=>file?.filename)})
  } catch (error) {
    console.log("error?.message", error?.message)
    res.status(500).json({ message: 'Error uploading files', error: error?.message });
  }
});

router.get('/questionnaire/:filename', (req, res) => {
  try {
    const { filename } = req?.params;
    const filepath = path.join(uploadDir, filename);
    return res.download(filepath, filename);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading file', error: error?.message });
  }
}
);

module.exports = router;
