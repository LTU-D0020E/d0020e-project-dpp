import mongoose from 'mongoose'

const Schema = mongoose.Schema

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  id: String,
  name: String,
  dpp_class: String,
  manufacture_by: {
    owner_id: Number,
    owner_name: String,
    privacy: String,
  },
  created_at: {
    creation_time: Date,
    privacy: String,
  },
  main_component: {
    id: String,
    dpp_class: String,
    privacy: String,
  },
})

module.exports =
  mongoose.models.Booking || mongoose.model('Booking', bookingSchema)
