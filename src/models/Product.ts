import mongoose, { Document, Schema } from 'mongoose';

export interface ProductInterface extends Document {
  code?: number;
  barcode?: string;
  status?: 'draft' | 'published' | 'trash';
  imported_t?: Date;
  url?: string;
  product_name?: string;
  quantity?: string;
  categories?: string;
  packaging?: string;
  brands?: string;
  image_url?: string;
}

const ProductSchema: Schema = new Schema({
  code: Number,
  barcode: String,
  status: {
    type: String,
    enum: ['draft', 'published', 'trash'],
    default: 'published',
  },
  imported_t: Date,
  url: String,
  product_name: String,
  quantity: String,
  categories: String,
  packaging: String,
  brands: String,
  image_url: String,
});

const Product = mongoose.model<ProductInterface>('Product', ProductSchema);

export default Product;
