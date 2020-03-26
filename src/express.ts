import * as path from 'path'
import * as express from 'express'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as helmet from 'helmet'
import * as multer from 'multer'
import * as bodyParser from 'body-parser'
import * as methodOverride from 'method-override'
import config from './config'
import routes from './routes'

/**
 * An Express class to configure Express application.
 *
 * @class
 */
class Express {
  /**
   * Configure express application.
   *
   * @class
   */
  app: any

  constructor() {
    // Initialize Express app
    this.app = express()
  }

  /**
   * Initialize application middleware.
   *
   * @method initMiddleware
   * @private
   */
  initMiddleware() {
    // Enable logger (morgan)
    this.app.use(morgan('dev'))

    // Disable views cache
    this.app.set('view cache', false)

    // Request body parsing middleware should be above methodOverride
    this.app.use(bodyParser.urlencoded({ extended: true }))

    // Statics
    this.app.use(express.static(config.client.staticPath))
    this.app.use(bodyParser.json())
    this.app.use(methodOverride())
  }

  /**
   * Configure Helmet headers configuration.
   *
   * @method initHelmetHeaders
   * @private
   */
  initHelmetHeaders() {
    this.app.use(helmet.frameguard())
    this.app.use(helmet.xssFilter())
    this.app.use(helmet.noSniff())
    this.app.use(helmet.ieNoOpen())
    this.app.disable('x-powered-by')
  }

  /**
   * Configure CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests.
   *
   * @method initCrossDomain
   * @private
   */
  initCrossDomain() {
    // setup CORS
    this.app.use(cors())
    this.app.use((req, res, next) => {
      // Website you wish to allow to connect
      res.set('Access-Control-Allow-Origin', '*')
      // Request methods you wish to allow
      res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
      // Request headers you wish to allow
      res.set(
        'Access-Control-Allow-Headers',
        'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token',
      )
      // Pass to next layer of middleware
      next()
    })
  }

  /**
   * Initialize the Express application.
   *
   * @method init
   * @returns {Object} the express application
   */
  init() {
    // Initialize Express middleware
    this.initMiddleware()

    // Initialize Helmet security headers
    this.initHelmetHeaders()

    // Initialize CORS
    this.initCrossDomain()

    // Initialize routes
    routes.init(this.app)

    return this.app
  }
}

export default new Express()
