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
  middlewares.authorization(['admin', 'patient', 'doctor', 'user']),
  validation.userModule.add,
  user.add
); 
router.put("/edit/:id",
  middlewares.authToken, 
  middlewares.authorization(['admin']), 
  // validation.userModule.edit,
  user.edit
); 



module.exports = router;
