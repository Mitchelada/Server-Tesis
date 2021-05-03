import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Router } from 'express'

dotenv.config()

// export default async (req, res, next) => {

// }

const router = new Router()

router.get('/', async (req, res, next) => {

  // Get SECRET from .env
  const { SECRET } = process.env

  // Get password from req body
  const { authorization: token } = req.headers

  // Verify token
  if(token === undefined) next()
  else {
    jwt.verify(token, SECRET, (err, user) => {
      if(err) return res.json({ response: err })
      console.log('user ', user)
  
      next()
    })
  }
  
})

export default router