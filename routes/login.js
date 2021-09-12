const expres = require('express')

//CONTROLLERS
const {renderLoginController, loginController} = require('../controllers/users')

const router = expres.Router()

router.get('/', renderLoginController)

router.post('/', loginController)

module.exports = router