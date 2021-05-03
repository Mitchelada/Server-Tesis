import Router from 'express'
import Elements from '../../sequelize/models/Elements'

const router = new Router()

router.get('/:aspectId', async (req, res) => {

  const allElements = await Elements.findAll({ where: { AspectId: req.params.aspectId }, include: 'Aspect' })
  res.json({ allElements })

})

router.post('/add/:aspectId', async (req, res) => {

  const { name, priority } = req.body

  console.log('params ', req.params)
  console.log('body ', req.body)

  const element = await Elements.create({
    name,
    priority,
    AspectId: req.params.aspectId
  })

  res.json({ element })

})

router.delete('/delete/:elementId', async (req, res) => {

  const { elementId } = req.params
  const deleteElement = await Elements.destroy({
    where: { id: elementId }
  })

  console.log('delete ', deleteElement)

  res.json(true)

})

export default router