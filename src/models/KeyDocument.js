import mongoose from 'mongoose'

const Schema = mongoose.Schema

const KeyDocumentSchema = new Schema({
  cid: String,
  remanufacturing_events: {
    privatekey: String,
    publickey: String,
  },
  shipping: {
    privatekey: String,
    publickey: String,
  },
  makes: {
    privatekey: String,
    publickey: String,
  },
  made_from: {
    privatekey: String,
    publickey: String,
  },
})

module.exports =
  mongoose.models.KeyDocumentSchema ||
  mongoose.model('KeyDocument', KeyDocumentSchema)
