const router = require("express").Router();
const platformControl = require("../../controllers/platform/mainController");
const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post(
    "/add",
    middlewares.authToken,
    middlewares.authorization(['supperAdmin']),
    platformControl.addNewPlatForm
  ); 
router.put(
    "/edit/:id",
    middlewares.authToken,
    middlewares.authorization(['supperAdmin']),
    platformControl.editPlatFrom
  ); 
router.get(
    "/getAll",
    middlewares.authToken,
    middlewares.authorization(['supperAdmin']),
    platformControl.getAll
  ); 

module.exports = router;
