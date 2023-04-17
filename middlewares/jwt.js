import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

export function generateAccessToken(hash) {
    dotenv.config()
    return jwt.sign(hash, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

export function securedWithToken(req, res, next) {
    dotenv.config()
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send(JSON.stringify({ msg: "you are not authorized" }))

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send(JSON.stringify({ msg: "error in token" }))
        req.user = user
        next()
    })
}

export const securedWithAdminToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send(JSON.stringify({ message: "no token in headers" }))

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send(JSON.stringify({ message: "error in token" }))
        if (user.role !== "admin") return res.status(403).send(JSON.stringify({ message: "You are not alowed to do that!" }))
        req.user = user
        next()
    })
}



