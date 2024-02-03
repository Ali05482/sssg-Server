const router = require("express").Router();
const clinicControl = require("../../controllers/clinic/mainController");
const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post("/add",
  validations.clinicModule.add, 
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  clinicControl.add
); 
router.put("/edit/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  clinicControl.edit
); 
router.get("/getById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  clinicControl.getById
); 
router.get("/getAll/",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  clinicControl.getAll
); 
router.delete("/delete/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']),
  clinicControl.deleteById
); 


module.exports = router;
