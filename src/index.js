import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import './sequelize/config/database'
import './sequelize/models/EstablishRelations'
import routes from './routes'

const app = express()

const port = process.env.PORT || 8001
app.set('port', port)

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

routes.applyMiddleware(app)
routes.initRoutes(app)

app.listen(app.get('port'), async () => {
  await sequelize.sync({ force: false, logging: false })
  console.log(`Server listening on port ${app.get('port')}`)
})