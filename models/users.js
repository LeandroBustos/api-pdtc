//FUNCION QUE DEVUELVE UNA PROMESA QUE MANEJA EL ASINCRONISMO DE MYSQL
const {request} = require('../db/mysql')

const {hashPassword, comparePassword} = require('../utils/password')

module.exports.signup = async (email, password) => {
    const hashedPassword = hashPassword(password)
    const user = await request(`
        INSERT INTO users(email, password, isEmploye)
        VALUES('${email}', '${hashedPassword}', 1)
    `)
    return {
        id: user.insertId
    }
}
module.exports.login = async (email, password) => {
    const user = await request(`
        SELECT * FROM users
        WHERE email = '${email}'
    `)

    if(user && comparePassword(password, user.password)){
        delete user.password
        return {
            isUser: user ? true : false,
            ...user
        }
    } else {
        return {
            isUser: false,
        }
    }

}