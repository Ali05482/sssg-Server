const platformControl = {}
const models = require("../../../../models");

platformControl.addNewPlatForm = async(req,res)=>{
    try {
        const checkifAlredy = await models.platform.findOne({name:req.body?.name});
        if(checkifAlredy){
            return res.json({status:false, msg:"Platform with this name already exists", data:null})
        }
        const newPlatfrom = await models.platform.create(req.body);
        if(newPlatfrom){
            return res.json({status:true, msg:"Platform added successfully"});
        }
        return res.json({status:false, msg:"Something Went Wrong, Try again", data:null})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({status:false, msg:"Something Went Wrong, Contact admin", data:null})
    }
}
platformControl.editPlatFrom = async(req,res)=>{
    try {
        const newPlatfrom = await models.platform.findByIdAndUpdate(req.params?.id, req.body);
        if(newPlatfrom){
            return res.json({status:true, msg:"Platform Updateed successfully", data:newPlatfrom});
        }
        return res.json({status:false, msg:"Something Went Wrong, Try again", data:null})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({status:false, msg:"Something Went Wrong, Contact admin", data:null})
    }
}
platformControl.getAll = async(req,res)=>{
    try {
        const newPlatfrom = await models.platform.find();
         return res.json({status:true, msg:"Platform Updateed successfully", data:newPlatfrom});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({status:false, msg:"Something Went Wrong, Contact admin", data:null})
    }
}
module.exports = platformControl








module.exports = platformControl