import Router from 'express'
import Aspects from '../../sequelize/models/Aspects'

const router = new Router()

router.get('/:projectId', async(req, res) => {

    const { params: { projectId } } = req
    const allAspects = await sequelize.query(`
    SELECT DISTINCT Aspects.id,
                    Aspects.name,
                    Aspects.importance,
                    Aspects.type,
                    (SELECT COUNT(*) FROM Elements WHERE
                    AspectId = Aspects.id) AS countElements
                    
                  FROM Aspects

                  WHERE Aspects.ProjectId = ${projectId}
                  
                  ORDER BY Aspects.importance DESC
  `)

    res.json({ allAspects: allAspects[0] })

})

router.get('/countElements/:aspectId', async(req, res) => {

    const { aspectId } = req.params
    const allAspects = await sequelize.query(`
    SELECT DISTINCT Aspects.id,
                    Aspects.name,
                    Aspects.importance,
                    Aspects.type,
                    (SELECT COUNT(*) FROM Elements WHERE
                    AspectId = Aspects.id) AS countElements
                    
                  FROM Aspects INNER JOIN Elements

                  WHERE Aspects.id = ${aspectId}
  `)

    res.json({ countElements: allAspects[0] })

})

router.get('/countElements/related/:projectId', async(req, res) => {

    const { projectId } = req.params
    const allAspects = await sequelize.query(`
    SELECT 
    (
      SELECT COUNT(*) FROM Aspects
        INNER JOIN Elements ON
        Aspects.id = Elements.AspectId
        WHERE Aspects.ProjectId = ${projectId}
    ) AS elementsRelatedToAspects,
    (
      SELECT COUNT(*) FROM Aspects
      LEFT JOIN Elements ON
      Aspects.id = Elements.AspectId
      WHERE Aspects.ProjectId = ${projectId}
    ) AS totalAspects
  `)

    res.json({ countElements: allAspects[0] })

})

router.post('/add/:projectId', async(req, res) => {

    const {
        name,
        importance,
        type
    } = req.body

    const { projectId } = req.params

    const aspect = await Aspects.create({
        name,
        importance,
        type,
        ProjectId: projectId
    })

    res.json({ aspect })

})

router.put('/update/:projectId/:aspectId', async(req, res) => {

    const {
        importance
    } = req.body

    const { projectId, aspectId } = req.params

    const aspect = await Aspects.update({
        importance
    }, {
        where: {
            ProjectId: projectId,
            id: aspectId
        }
    })

    res.json({ aspect })

})

router.delete('/delete/:aspectId', async(req, res) => {

    const { aspectId } = req.params

    await sequelize.query(`
    DELETE FROM Elements WHERE AspectId = ${aspectId}
  `)
    await sequelize.query(`
    DELETE FROM Aspects WHERE id = ${aspectId}
  `)

    res.json(true)

})

export default router