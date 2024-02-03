const path = require('path')
const fetchImageControl = {}
fetchImageControl.getImage = async (name)=>{
    const imagePath =  path.join(__dirname ,"../../../../uploads/email", name);
    console.log("name=====>", imagePath)
   return imagePath
}
fetchImageControl.getEmailImage = async (req,res)=>{
    try {
        const imagePath = await fetchImageControl.getImage(req.params.id);
        console.log(`${req.protocol}://${req.get('host')}/api/v1/image/email/clock.png`)
        res.sendFile(imagePath);
    } catch (error) {
        console.log("error.message", error.message)
        res.status(404).json({ status: false, msg: 'Image not found', data: null });
    }
}

module.exports = fetchImageControl