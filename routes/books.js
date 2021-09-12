//MODULES
const express = require('express')

//CONTROLLERS
const {
    getAllBooksController, 
    renderBooksOfUserControlle,
    getBookByIdController, 
    createBookController, 
    modifyBookController,
    deleteBookController,
    renderBooksController
} = require('../controllers/books')

const { requireAuth } = require('../middlewares/auth')

const router = express.Router()

router.use(requireAuth)

//OBTENEMOS TODOS LOS LIBROS DESDE LA BASE DE DATOS
router.get('/', getAllBooksController)

//OBTENEMOS TODOS LOS LIBROS DESDE LA BASE DE DATOS
router.get('/render_books', renderBooksController)

router.get('/render_books_user', renderBooksOfUserControlle)

//OBTENEMOS SOLO UN LIBRO DESDE LA BASE DE DATOS
router.get('/:id', getBookByIdController)

//CREAMOS UN LIBRO EN LA BASE DE DATOS
router.post('/', createBookController)


//ACTUALIZAMOS UN LIBRO EN LA BASE DE DATOS
router.put('/:id', modifyBookController)

//BORRAMOS UN LIBRO EN LA BASE DE DATOS
router.delete('/:id', deleteBookController)

module.exports = router
