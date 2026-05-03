import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  priceAtPurchase: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  orderItems: [orderItemSchema],
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
