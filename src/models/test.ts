import * as mongoose from 'mongoose'

mongoose.Promise = Promise

const TestSchema = new mongoose.Schema({
  name: String,
  age: Number,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
})

TestSchema.pre('update', function (next) {
  this.update({}, { $set: { updated: new Date() } })
  next()
})

const Test = mongoose.model('Test', TestSchema, 'test-col')

export default Test
