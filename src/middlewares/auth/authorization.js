const { APIResponse } = require('../../helper/');

module.exports = (role) => {
  return (req, res, next) => {
    try {
      if((req.user.role?.toString().toLowerCase()==="admin" || req.user.role=="supperAdmin")){
        return next();
      } 
      else {
        for(let i = 0;i<role.length;i++){
          if (req.user.role == role[i]) {
           return next();
          }
        }
        return APIResponse("Un-Authorized Access", null, res, false, 401);
      }
    } catch (error) {
      return APIResponse(error.message, null, res, false, 500);
    }
  };
};
