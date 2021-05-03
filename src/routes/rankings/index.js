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

router.post('/add', async(req, res) => {

    const { projectId, get_pkm_producto } = req.body

    const insert = []

    get_pkm_producto.forEach(async(item, key) => {
        let { requirement_id, requirement_name, r: score } = item

        if (!score) score = null

        const query = `
      INSERT INTO Rankings (
        score,
        ProjectId,
        RequirementId
      )

      VALUES (
        ${score},
        ${projectId},
        ${requirement_id}
      )

      ON DUPLICATE KEY UPDATE score=${score}, ProjectId=${projectId}, RequirementId=${requirement_id}
    `

        await sequelize.query(query)
    })

    res.json(true)

})

export default router