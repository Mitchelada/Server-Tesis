import Router from 'express'
import Rankings from '../../sequelize/models/Rankings'

const router = new Router()

router.get('/', async(req, res) => {

    const allRankings = await Rankings.findAll({ include: ['Project', 'Requirement'] })
    console.log('allRankings ', allRankings)
    console.log('allRankings ', allRankings[0].Project)
    console.log('allRankings ', allRankings[0].Requirement)
    res.json({ msj: allRankings })
})

router.post('/add/:projectId', async(req, res) => {

    const { elementId, requirementId } = req.body

    const response = await sequelize.query(`
    INSERT INTO ElementsHasRequirements (ElementId, RequirementId, createdAt, updatedAt)
    VALUES (${elementId}, ${requirementId}, NOW(), NOW())
  `)

    res.json({ response: response[0] })

})

router.post('/delete/:elementId', async(req, res) => {

    const { elementId } = req.params

    const response = await sequelize.query(`
    DELETE FROM ElementsHasRequirements WHERE ElementId = ${elementId}
  `)

    res.json({ response: response[0] })

})

export default router