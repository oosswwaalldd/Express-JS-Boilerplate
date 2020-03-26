import * as mongoose from 'mongoose'

const connection = () => new Promise((resolve, reject) => {
  try {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
    mongoose.connect(process.env.MONGO_PATH, options)

    // if the connection throws an error
    mongoose.connection.on('error', reject)

    // when the connection is open
    mongoose.connection.once('open', resolve)
  } catch (error) {
    reject(error)
  }
})

export default connection
