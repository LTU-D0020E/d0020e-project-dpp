import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, ref: 'Role' },
    admin: Boolean, // Reference to the Role model
  },
  { timestamps: true }
)

module.exports = mongoose.models.User || mongoose.model('User', userSchema)


