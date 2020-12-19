import mongoose, { Document, Schema } from 'mongoose';

export interface ProductImportHistoryInterface extends Document {
  filenames: string;
  imported_t: Date;
}

const ProductImportHistorySchema: Schema = new Schema(
  {
    filenames: String,
    imported_t: Date,
  },
  {
    collection: 'product_import_history',
  },
);

const ProductImportHistory = mongoose.model<ProductImportHistoryInterface>(
  'ProductImportHistory',
  ProductImportHistorySchema,
);

export default ProductImportHistory;
