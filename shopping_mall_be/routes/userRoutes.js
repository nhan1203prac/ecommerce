const router = require('express').Router();
const User = require('../model/User')
const bcrypt = require('bcrypt');
router.post('/signup',async(req,res)=>{
    // const {name,email,password} = req.body
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body,password:hash})
        const savedUser = await newUser.save()
        res.json(savedUser)
    } catch (error) {
        if(error.code===11000) return res.status(400).send('Email already exists')
        res.status(400).send(e.message)
    }
})
router.post('/login', async (req, res) => {
    // const { email, password } = req.body;
    try {
        // const user = await User.findOne({ email, password });
        const user = await User.findOne({email:req.body.email})
       if(!user) throw new Error("User not found")
       const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
       if(isPasswordCorrect){
        const {password,...userData} = user.toObject();
        console.log(userData)
        res.json(userData)
       }
       else
       throw new Error('Wrong username or password!');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/',async(req,res)=>{
    try {
        const users =await User.find({isAdmin:false})
        res.json(users)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:id/orders',async(req,res)=>{
    const {id} =req.params
    try {
        const user = await User.findById(id).populate('orders')
        res.json(user.orders)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.get('/:id',async(req,res)=>{
    const {id} = req.params
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (error) {
        
    }
})

router.post('/:id/updateNotifications', async(req, res)=> {
    const {id} = req.params;
    try {
      const user = await User.findById(id);
      user.notifications.forEach((notif) => {
        notif.status = "read"
      });
      user.markModified('notifications');
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e.message)
    }
  })
module.exports = router