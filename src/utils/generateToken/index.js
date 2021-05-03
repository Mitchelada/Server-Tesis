import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default async (password) => {

  // Get SECRET from .env
  const { SECRET } = process.env

  // Generate Token with secret env key
  return jwt.sign(password, SECRET)

}