const mongoose = require('mongoose')

const Schema = mongoose.Schema
// const ObjectId = Schema.ObjectId

const SchemaSubtitle = new Schema({
  id: { type: String, index: true },
  name: { type: String, default: 'hahaha' },
  downloads: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  author: { type: String },
  date: { type: Date, default: Date.now },
  language: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('subtitle', SchemaSubtitle)