import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  material: { type: String, required: true },
  purity: { type: String, required: true },
  weightInGrams: { type: Number, required: true },
  makingChargePercent: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
