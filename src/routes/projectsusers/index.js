import Router from 'express'
import ProjectsUsers from '../../sequelize/models/ProjectsUsers'
import Users from '../../sequelize/models/Users'
import Projects from '../../sequelize/models/Projects'

const router = new Router()

router.get('/', async (req, res) => {
  const all = await ProjectsUsers.findAll({ include: Projects })
  console.log('all', all)
  res.json({ msj: 'working' })
})

export default router