import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { email, festivalId, tickets } = req.body.order;

  try {
    const order = await Order.create({
      email,
      festivalId,
      tickets,
    });
    if (order.id) {
      res.status(200).json({ success: true, order });
    } else {
      res.status(400).json({ success: false, msg: 'Order cannot be created' });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};
