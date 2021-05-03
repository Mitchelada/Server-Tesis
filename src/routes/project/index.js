import Router from 'express'

import Projects from '../../sequelize/models/Projects'

import utils from '../../utils'

const router = new Router()

router.get('/get/ranking/:project_id', async(req, res) => {

    const { project_id } = req.params
    console.log('[req params] ', req.params)

    const results = await sequelize.query(`
    SELECT
      Requirements.id,
      Requirements.name,
      Rankings.id AS ranking_id,
      Rankings.score
            
    FROM
      Rankings
        
    INNER JOIN Requirements ON
    Rankings.RequirementId = Requirements.id

    WHERE Rankings.ProjectId = ${project_id}

    ORDER BY Rankings.score DESC
  `)

    res.json({ ranking: results[0] })

})

router.get('/aspects/elements/:projectId', async(req, res) => {

    const { projectId } = req.params

    try {
        const allAspectsAndElementsFromProject = await sequelize.query(`
    SELECT Aspects.id AS aspect_id,
          Aspects.name AS aspect_name,
          Aspects.type AS aspect_type,
          Elements.id AS element_id,
          Elements.name AS element_name,
          Elements.AspectId AS element_aspect,
          Elements.priority AS element_priority
              
          FROM Aspects

          INNER JOIN Elements ON
          Aspects.id = Elements.AspectId

          WHERE Aspects.ProjectId = ${projectId}
    `)

        res.json({ allAspectsAndElementsFromProject: allAspectsAndElementsFromProject[0] })
    } catch (e) {
        console.log('Get all projects error ', e)
    }

})

router.get('/requirements/:projectId', async(req, res) => {

    const { projectId } = req.params

    try {
        const allRequirementsFromProject = await sequelize.query(`
    SELECT Requirements.id AS requirement_id,
           Requirements.name AS requirement_name
                
          FROM Requirements

          WHERE Requirements.ProjectId = ${projectId}

          ORDER BY Requirements.weight ASC
    `)

        console.log('[allRequirementsFromProject] ', allRequirementsFromProject[0])

        res.json({ allRequirementsFromProject: allRequirementsFromProject[0] })
    } catch (e) {
        console.log('Get all projects error ', e)
    }

})

router.post('/ehr', async(req, res) => {

    const { elements } = req.body

    let IN = ''

    elements.forEach(item => {
        IN += `${item},`
    })

    IN = IN.substr(0, IN.length - 1)

    try {
        const allEHR = await sequelize.query(`
      SELECT ElementsHasRequirements.ElementId,
             Elements.name AS element_name,
             ElementsHasRequirements.RequirementId,
             Requirements.name AS requirement_name
            
      FROM ElementsHasRequirements

      INNER JOIN Elements ON
      ElementsHasRequirements.ElementId = Elements.id

      INNER JOIN Requirements ON
      ElementsHasRequirements.RequirementId = Requirements.id

      WHERE ElementsHasRequirements.ElementId IN (${IN})
    `)

        res.json({ allEHR: allEHR[0] })
    } catch (e) {
        console.log('Get all projects error ', e)
    }

})

router.get('/all', async(req, res) => {

    try {
        const allProjects = await Projects.findAll({ where: { active: 1 } }, { include: 'User' })
        res.json({ allProjects })
    } catch (e) {
        console.log('Get all projects error ', e)
    }

})

router.get('/ranking/all', async(req, res) => {

    try {
        const allProjects = await sequelize.query(`
      SELECT DISTINCT
        Rankings.ProjectId AS project_id,
        Projects.name AS project_name

      FROM Rankings

      INNER JOIN Projects ON
      Rankings.ProjectId = Projects.id

      WHERE Projects.active = 1
    `)

        res.json({ allProjects: allProjects[0] })
    } catch (e) {
        console.log('Get all projects error ', e)
    }

})

router.post('/add', async(req, res) => {
    try {

        const {
            name
        } = req.body

        const project = await Projects.create({
            name,
            UserId: 2,
            active: true
        })

        res.json({ status: 200, response: project })

    } catch (e) {
        res.json({ status: 400, error: e })
        console.log('Add project error ', e)
    }
})

router.put('/', async(req, res) => {
    try {

        const {
            id
        } = req.body

        const project = await Projects.update({
            active: false
        }, {
            where: {
                id
            }
        })

        res.json({ status: 200, response: project })

    } catch (e) {
        res.json({ status: 400, error: e })
        console.log('Add project error ', e)
    }
})

router.post('/register/user', async(req, res) => {

    const {
        name,
        last_name,
        email,
        password
    } = req.body

    const validateEmail = await sequelize.query(`
    SELECT COUNT(*) AS countEmail FROM Users
    WHERE email = '${email}'
  `)

    console.log('validateEmail ', validateEmail[0][0].countEmail)

    if (validateEmail[0][0].countEmail > 0) {
        res.json({ registerResponse: 'email_exists' })
    } else {

        const token = await utils.generateToken(password)

        const response = await sequelize.query(`
      INSERT INTO Users (
        name,
        last_name,
        email,
        password,
        token,
        createdAt
      )
  
      VALUES(
        '${name}',
        '${last_name}',
        '${email}',
        '${password}',
        '${token}',
        NOW()
      )
    `)

        res.json({ registerUser: response[0], token })
    }


})

router.post('/login/user', async(req, res) => {

    const {
        email,
        password
    } = req.body

    const validateEmail = await sequelize.query(`
    SELECT COUNT(*) AS countEmail FROM Users
    WHERE email = '${email}' &&
          password = '${password}'
  `)

    console.log('validateEmail ', validateEmail[0][0].countEmail)

    if (validateEmail[0][0].countEmail > 0) {

        const token = await utils.generateToken(password)
        await sequelize.query(`
      UPDATE Users SET token = '${token}'
      WHERE
      email='${email}'
    `)

        res.json({ loginResponse: 'logged_in', token })
    } else {
        res.json({ loginResponse: 'invalid_credentials' })
    }


})

export default router