const jwt = require('jsonwebtoken')

module.exports.requireAuth = (req, res, next) => {
    const {session} = req.cookies

    if(session) {
        jwt.verify(session, 'la contraseña mas segura del mundo', (error, decoded) =>{
            if(error){
                console.log(error.message)
                res.cookie('session', '', {maxAge: 1})
                return res.redirect("/login")
            } else {
                req.user = decoded.id
                next()
            }
        })
    } else {
        return res.redirect("/login")
    }
}
