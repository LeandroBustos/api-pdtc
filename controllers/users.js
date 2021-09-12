//UTILS
const {createToken} = require('../utils/token')
const {generateTokenDurationInMs} = require('../utils/time')

//MODELS
const {login, signup} = require('../models/users')

module.exports.renderSignupController = (req, res) => {
    const {session} = req.cookies
    
    return res.status(200).render("signup", {layout: "index", shouldRenderLogout: session ? true : false})
}

module.exports.signupController =  async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await signup(email, password)
        return res.status(200).send(user)
    }catch(err){
        console.log(err)
    }
}

module.exports.renderLoginController = (req, res) => {
    const {session} = req.cookies

    if(session){
        return res.redirect("/books/render_books/render_books_user")
    } else {
        return res.status(200).render("login", {layout: "index", shouldRenderLogout: session ? true : false})
    }

}

module.exports.loginController = async (req, res) => {
    const {email, password} = req.body

    try{
        const user = await login(email, password)
        console.log(user)
        
        if(user.isUser){
            const token = createToken(user)

            res.cookie("session", token, {
                maxAge: generateTokenDurationInMs(3),
                httpOnly: true
            })
    
            return res.status(200).send(user)
        } else {
            return res.status(200).send(user)
        }
    }catch(err){
        console.log(err)
    }
}