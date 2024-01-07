import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventSchema = new Schema(
  {
    id: Number,
    dpp_class: String,
    creation_time: Date, // Assuming this should be a Date type
  },
  { _id: false }
)

const productSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    id: Number,
    name: String,
    dpp_class: String,
    manufactured_by: {
      owner_id: Number,
      owner_name: String,
      privacy: String,
    },
    created_at: {
      creation_time: Date, // Assuming this should be a Date type
      privacy: String,
    },
    has_carbon_footprint: {
      id: Number,
      dpp_class: String,
      privacy: String,
    },
    main_component: {
      id: Number,
      dpp_class: String,
      privacy: String,
    },
    has_event_trail: {
      privacy: String,
      events: [eventSchema], // Define a separate schema for events
    },
  },
  { strict: false }
)

module.exports =
  mongoose.models.Product || mongoose.model('Product', productSchema)
