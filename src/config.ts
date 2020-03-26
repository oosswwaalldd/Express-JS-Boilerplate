import * as path from 'path'

const dev = process.env.NODE_ENV === 'development'
const config = {
  dev,
  debug: true,
  client: {
    staticPath: path.join(path.normalize(`${__dirname}/../public/`)),
  },
}

export default config
