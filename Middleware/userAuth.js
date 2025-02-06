const jwt = require('jsonwebtoken')
exports.jwtAuth = (req, res, next) => {
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken, process.env.JWT_SECRET, (err, data) => {
            req.user = data
            next()
        })
    } else {
        next()
    }
}