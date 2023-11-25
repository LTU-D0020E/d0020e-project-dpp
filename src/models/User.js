import mongoose from 'mongoose'
const bcrypt = require('bcryptjs')

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

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

module.exports = mongoose.model('User', userSchema)
