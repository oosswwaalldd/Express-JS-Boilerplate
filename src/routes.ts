import { join } from 'path'
import config from './config'

class Routes {
  /**
   * Initialize routes for each module
   * @param {Object} app The express application
   */
  init(app) {
    // All undefined not listed below will be redirected to /
    app.route('/:url(api|assets)/*').get((_, res) => {
      res.redirect('/')
    })

    // All other routes should redirect to index.html
    app.route('/*').get((_, res) => {
      res.sendFile(join(config.client.staticPath, 'index.html'))
    })
  }
}

export default new Routes()
