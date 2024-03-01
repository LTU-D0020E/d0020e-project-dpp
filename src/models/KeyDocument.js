import mongoose from 'mongoose'

const Schema = mongoose.Schema

const FieldKeysSchema = new Schema({
  privateKey: { type: String, required: true },
  publicKey: { type: String, required: true },
})

const KeyDocumentSchema = new Schema({
  cid: { type: String, required: true, unique: true },
  fieldType: {
    remanufacturing_events: FieldKeysSchema,
    shipping: FieldKeysSchema,
    makes: FieldKeysSchema,
    made_from: FieldKeysSchema,
  },
})

module.exports =
  mongoose.models.KeyDocumentSchema ||
  mongoose.model('KeyDocument', KeyDocumentSchema)
