const jwt = require('jsonwebtoken');


const authentocate = async (req,res, next)=>{
      try {
      const token = req.headers.authorization;
      if(!token){
        return res.status(404).json({status:false, msg:"Tokken is missing", data:null });
      }
      const verify = jwt.verify(token, process.env.SECRETE);
      if(!verify){
        return res.status(401).json({status:false, msg:"Un-Authorize", data:null })
      }
      req.user = verify
      next()
      } catch (error) {
        return res.status(401).json({status:false, msg:"Something Went Wrong", data:error.message })
      }
}

module.exports  = authentocate;