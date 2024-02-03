const images = {}
images.getImage = async (name)=>{
    const imagePath =  path.join(__dirname ,"/src/uploads/email", name);
    console.log("name=====>", imagePath)
   return imagePath
}
images.returnImage = async (req,res)=>{
    if (!req.params.id) {
        return res.status(404).json({ status: false, msg: 'Image Id must be provided', data: null });
    }
    try {
        const imagePath = await supplier.getImage(req.params.id);
        res.sendFile(imagePath);
    } catch (error) {
        res.status(404).json({ status: false, msg: 'Image not found', data: null });
    }
}

module.exports = images