import mongoose from 'mongoose'

const Schema = mongoose.Schema

const roleSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    accessLevel: { type: Number, required: true },
    // Add additional fields for specific permissions if needed
  },
  { timestamps: true }
)

module.exports = mongoose.model('Role', roleSchema)
