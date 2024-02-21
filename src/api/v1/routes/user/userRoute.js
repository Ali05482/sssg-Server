const router = require("express").Router();
const user = require("../../controllers/users/user");
const middlewares = require("../../../../middlewares");
const validation = require('../../../../common/validations/')
 
router.get("/view/:type",
  // middlewares.authToken, 
  // middlewares.authorization(['admin', 'doctor']),
  user.fetchAllUsers
); 
router.get("/view/specific/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin', 'doctor', 'patient']),
  user.getById
); 
router.get("/view/specific/unique/:id",
  middlewares.authToken, 
  // middlewares.authorization(['admin', 'doctor', 'patient']),
  user.getByIdUnique
); 
router.post("/add/",
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  validation.userModule.add,
  user.add
); 
router.put("/edit/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']), 
  // validation.userModule.edit,
  user.edit
); 

router.post("/clinic/add/",
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  validation.userModule.add,
  user.addAttendants
); 
router.put("/clinic/edit/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']), 
  // validation.userModule.edit,
  user.editAttendants
); 
router.get("/attendant/getAll/",
  middlewares.authToken, 
  middlewares.authorization(['admin','supperAdmin', 'doctor','patient', 'compodar', 'schedulingTeam']),
  user.getAllAttendants
);



module.exports = router;
