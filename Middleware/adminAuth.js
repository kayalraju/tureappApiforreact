const jwt = require('jsonwebtoken')
exports.jwtAdminAuth = (req, res, next) => {
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken, process.env.JWT_SECRET, (err, data) => {
            req.admin = data
            next()
        })
    } else {
        next()
    }
}