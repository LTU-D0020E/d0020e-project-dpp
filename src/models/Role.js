import mongoose from 'mongoose'

const Schema = mongoose.Schema

const roleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    decryption_key: { type: String, required: true, unique: true },
    // Add additional fields for specific permissions if needed
  },
  { timestamps: true }
)

module.exports = mongoose.models.Role || mongoose.model('Role', roleSchema)
