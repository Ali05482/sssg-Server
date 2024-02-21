const router = require("express").Router();
const meetingsControl = require("../../controllers/apointment/meetings");


const middlewares = require("../../../../middlewares");
const validations = require("../../../../common/validations");


router.post("/add",
  validations.meetingsModule.add, 
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  meetingsControl.add
); 
router.put("/update",
  validations.meetingsModule.update, 
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  meetingsControl.edit
); 
router.get("/getById/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  meetingsControl.getById
); 
router.get("/validateMeeting/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  meetingsControl.validateMeeting
); 
router.get("/getAll/",
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  meetingsControl.getAll
); 
router.delete("/delete/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  meetingsControl.deleteById
); 


module.exports = router;
