const expres = require('express')

//CONTROLLERS
const {renderSignupController, signupController} = require('../controllers/users')
const router = expres.Router()

router.get('/', renderSignupController)

router.post('/', signupController)

module.exports = router