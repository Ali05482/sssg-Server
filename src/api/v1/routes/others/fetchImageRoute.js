const router = require("express").Router();
const fetchImageControl = require("../../controllers/others/fetchImages");
const middlewares = require("../../../../middlewares");



router.get("/email/:id",
  fetchImageControl.getEmailImage
); 
 



module.exports = router;
