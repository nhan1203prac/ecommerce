const cloudinary  = require('cloudinary');
const router = require('express').Router()
// require('dotenv').config()

cloudinary.config({
    cloud_name:"dqmlemao7",
    api_key:"348952394411685",
    api_secret:"GbliuaAqkd179iZZXTbQD7PHl8g"
})

router.delete('/:public_id',async(req,res)=>{
    const {public_id} = req.params
    try {
        await cloudinary.uploader.destroy(public_id);
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error.message)
    }
})
module.exports = router