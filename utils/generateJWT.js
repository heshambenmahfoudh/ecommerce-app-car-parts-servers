import jwt from 'jsonwebtoken'
const generateJWT = async (data) => {
  return await jwt.sign(data, process.env.JWT, { expiresIn: '1d' })
}

export default generateJWT
