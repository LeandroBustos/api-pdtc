const jwt = require('jsonwebtoken')

module.exports.createToken = (data) => {
    return jwt.sign(data, 'la contraseña mas segura del mundo')
}

