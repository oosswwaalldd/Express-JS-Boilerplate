// Libs
import { createServer } from 'http'
import * as dotenv from 'dotenv'
import config from './config'
import httpServer from './express'

// Database
import mongodb from './db'

// Models
import TestCollection from './models/test'

// Read .env
dotenv.config();

const banner = `
*********************************************************************************************
*
* @Environment ${process.env.NODE_ENV}
* @Name ${process.env.npm_package_description}
* @Version ${process.env.npm_package_version}
* @Author ${process.env.npm_package_author_name}
*
*********************************************************************************************`

console.log(banner)


const runServer = async () => {
  try {
    // Connect to database
    await mongodb()

    console.log('Database connected.')

    // Initialize express
    const app = httpServer.init()
    const serverInstance = createServer(app)
    serverInstance.listen(process.env.PORT, async () => {
      console.log(
        `${process.env.npm_package_description} listening at http://${process.env.HOST}:${process.env.PORT}`,
      )

      // test database access
      const testData = await TestCollection.find({})
      console.log(testData)
    })
  } catch (error) {
    console.log('Error trying to create webserver', error)
    process.exit(1)
  }
}

runServer()
