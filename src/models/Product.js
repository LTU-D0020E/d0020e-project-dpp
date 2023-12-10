import mongoose from 'mongoose'

const Schema = mongoose.Schema

// Define a generic schema for nested objects
const genericSchema = new Schema(
  {
    id: String,
    dpp_class: String,
    privacy: String,
  },
  { _id: false, strict: false }
)

// Define a schema for individual events
const eventSchema = new Schema(
  {
    id: String,
    dpp_class: String,
    creation_time: Date,
  },
  { _id: false }
)

// Define the main product schema
const productSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    id: String,
    name: String,
    dpp_class: String,
    manufactured_by: genericSchema, // Using generic schema
    created_at: {
      creation_time: Date,
      privacy: String,
    },
    has_carbon_footprint: genericSchema, // Using generic schema
    has_crm: genericSchema, // Using generic schema for has_crm
    has_event_trail: {
      privacy: String,
      events: [eventSchema], // Array of events
    },
  },
  { strict: false }
)

module.exports =
  mongoose.models.Product || mongoose.model('product', productSchema)
