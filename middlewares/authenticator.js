
const jwt = require('jsonwebtoken');
function authenticator(req, res, next) {
    const token= req.headers.authorization
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
       if(err) return res.send({message: "Token not valid please login" + err, status: 0})
        if(decode) {
            req.body.user = decode.userId
            next()
        }else{
            res.send({
                message: "Invalid token",
                status: 2,
            })
        }
    })
}
module.exports = {
    authenticator,
}