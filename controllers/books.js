//MODELS
const {getAllBooks, getAllBooksOfuser, getBookById, createBook, modifyBook, deleteBook} = require('../models/books')

module.exports.renderBooksOfUserControlle = async(req, res) => {
    const {user} = req

    try{
        const libros = await getAllBooksOfuser(user)
        return res.render("books", {layout: "index", libros:libros.data, shouldRenderLogout:true})
    }catch(err){
        console.log(err)
        return res.status(500).render("error", {layout: "index"})
    }
}
module.exports.renderBooksController = async (req, res) => {
    const {session} = req.cookies

    try{
        const libros = await getAllBooks()
        return res.render("books", {layout: "index", libros: libros.data, shouldRenderLogout:session ? true : false})
    }catch(err){
        return res.status(500).render("error", {layout: "index"})
    }
}

module.exports.getAllBooksController = async (req, res) => {
    try{
        const libros = await getAllBooks()
        return res.status(200).send(libros)
    }catch(err){
        return res.status(500).send("Se produjo un error al traer los libros.")
    }
}

module.exports.getBookByIdController = async (req, res) => {
    try{
        console.log(req)
        const {id} = req.params
        const libro = await getBookById(id)

        return res.status(200).send(libro)
    }catch(err){
        return res.status(500).send("Se produjo un error al traer el libro.")
    }
}

module.exports.createBookController = async (req, res) => {
    const {name, publish_date, disponible} = req.body
    try{
        const libro = await createBook({name, publish_date, disponible})
        return res.send(libro)
    }catch(err){
        return res.status(500).send("Se produjo un error al crear los libros")
    }
}

module.exports.modifyBookController = async (req, res) => {
    const {id} = req.params
    const {name, publish_date, disponible} = req.body

    try{
        const libro = await modifyBook({id, name, publish_date, disponible})
        return res.status(200).send(libro)
    }catch(err){
        return res.status(500).send("Se produjo un error al actualizar el libro.")
    }
}

module.exports.deleteBookController = async (req, res) => {
    const {id} = req.params

    try{
        const libro = await deleteBook(id)
        return res.status(200).send(libro)
    }catch(err){
        return res.status(500).send("Se produjo un eror al borrar el libro.")
    }
}