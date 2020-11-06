import jwt from 'jsonwebtoken'

export default (uid) => {
    return jwt.sign({id: uid}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}