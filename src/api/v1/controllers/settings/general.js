const models = require("../../../../models");

const general = {};

general.toggle = async (req,res)=>{
  try {
    const toggleUser = models.settings.findOne({user:req.body.user});
    if(!toggleUser){
        return res.json({status:false, msg:"Settings not found", data:null})
    }
    const keys  = Object.keys(req.body);
    keys.forEach(key=>(toggleUser[key]=req.body[key]));
    await toggleUser.save();
  } catch (error) {
    return res.status(500).json({status:false, msg:"Something Went Wrong", data:null})
  }
}

const myKey = "name"
const myvalue = "Azan"

const  a = {
  name:"ALi",
  email:"a@gmail.com"
}

a[myKey] = "Azan"
a.name = "Azan"
module.exports = general;
