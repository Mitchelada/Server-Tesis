import Router from 'express'
import Requirements from '../../sequelize/models/Requirements'

const router = new Router()

router.get('/', async(req, res) => {
    const allRequirements = await Requirements.findAll({
        order: [
            ['weight', 'DESC']
        ]
    }, {
        include: 'Project'
    })
    res.json({ msj: allRequirements })
})

router.get('/:projectId', async(req, res) => {

    const allRequirements = await Requirements.findAll({
        where: { ProjectId: req.params.projectId },
        order: [
            ['weight', 'ASC']
        ]
    })
    res.json({ allRequirements })

})

router.post('/add', async(req, res) => {
    const addRequirement = await Requirements.create({
        name: req.body.name,
        weight: req.body.weight,
        ProjectId: req.body.projectId
    })

    res.json(addRequirement)
})

router.post('/update/:projectId/:requirementId', async(req, res) => {

    const { projectId, requirementId } = req.params
    const { name, weight } = req.body

    console.log('body ', req.body)

    const updateRequirement = await Requirements.update({
        name,
        weight,
    }, {
        where: {
            id: requirementId,
            ProjectId: projectId
        }
    })

    res.json(updateRequirement)

})

router.delete('/delete/:requirementId', async(req, res) => {

    const { requirementId } = req.params
    await sequelize
        .query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
        .then(() => {
            return sequelize.query(`
        DELETE FROM Requirements WHERE id = ${requirementId}
      `)
        })
        .then(() => {
            return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, { raw: true })
        })

    res.json(true)

})

export default router