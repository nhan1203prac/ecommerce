const router = require("express").Router();
const Order = require("../model/Order");
const User = require("../model/User");
const { route } = require("./productRoutes");

router.post("/", async (req, res) => {
  const { userId, cart, address, country } = req.body;
  const io = req.app.get('socketio');
  try {
      const user = await User.findById(userId);
      const order = await Order.create({ owner: user._id, products: cart, country, address });
      order.count = cart.count;
      order.total = cart.total;
      await order.save();
      user.cart = { total: 0, count: 0 };
      user.orders.push(order);
      
      // Tạo thông báo
      const notification = { status: 'unread', message: `New order from ${user.name}`, time: new Date() };
      
      // Thêm thông báo cho admin
      const admin = await User.findOne({ isAdmin: true }); // Giả định rằng bạn có trường isAdmin để xác định admin
      if (admin) {
          admin.notifications.push(notification);
          await admin.save();
      }

      // Phát sự kiện thông qua socket
      io.sockets.emit('new-order', notification);
      
      // Lưu trạng thái của đơn hàng và người dùng
      user.markModified('orders');
      await user.save();
      
      // Trả về phản hồi thành công
      res.status(200).json(user);
  } catch (error) {
      res.status(400).json(error.message);
  }
});


router.get('/', async(req, res)=> {
    try {
      const orders = await Order.find().populate('owner', ['email', 'name']);
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json(e.message)
    }
  })

router.patch("/:id/mark-shipped",async(req,res)=>{
  const {ownerId} = req.body
  const {id} = req.params
  const io = req.app.get('socketio');
  try {
    const user = await User.findById(ownerId)
    await Order.findByIdAndUpdate(id,{status:"shipped"})
    const orders = await Order.find().populate('owner',['email','name'])
    const notification = {status:'unread',message:`Order ${id} shipped with success`,time:new Date()}
    io.sockets.emit('notification',notification,ownerId)
    user.notifications.push(notification)
    await user.save()
    res.status(200).json(orders)

  } catch (error) {
    res.status(400).json(error.message)
  }
})
  module.exports = router