import aspect from '../aspect'
import element from '../element'
import project from '../project'
import requirement from '../requirement'
import rankings from '../rankings'
import tools from '../tools'

import utils from '../../utils'

export default (app) => {
  app.use('/verifyToken', utils.verifyToken)
  app.use('/aspect', aspect)
  app.use('/element', element)
  app.use('/project', project)
  app.use('/requirement', requirement)
  app.use('/rankings', rankings)
  app.use('/tools', tools)
}