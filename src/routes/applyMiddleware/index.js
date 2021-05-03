import utils from '../../utils'

export default (app) => {

  app.get('/verifyToken', utils.verifyToken)
  // app.use('/element', utils.verifyToken)
  // app.use('/project', utils.verifyToken)
  // app.use('/requirement', utils.verifyToken)
  // app.use('/rankings', utils.verifyToken)
  // app.use('/tools', utils.verifyToken)

}