import mongoose from 'mongoose'

const Schema = mongoose.Schema

const scanSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    // Add additional fields for specific permissions if needed
  },
  { timestamps: true }
)

module.exports = mongoose.models.Scan || mongoose.model('Scan', scanSchema)
