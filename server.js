//MODULOS
const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const {getAllImages, getImageById, createImage} = require('./models/images')

//ROUTES
const signupRoutes = require('./routes/signup')
const loginRoutes = require('./routes/login')
const booksRoutes = require('./routes/books')

//MIDDLEWARES
// const {authMiddleware} = require('./middlewares/auth')

const app = express()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/mnt/c/Users/leandro/Desktop/clases/uploaded')
    },

    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

app.set('view engine', 'hbs')

app.engine('hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    extname: 'hbs'
}))

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => res.send("Te contectaste a mi proyecto"))
app.use('/signup', signupRoutes)
app.use('/login', loginRoutes)
app.use('/books', booksRoutes)

app.get('/logout', (req, res) => {
    res.cookie('session', '', {maxAge: 1})

    return res.redirect("/login")
})

app.get('/images/upload', (req, res) => {

    return res.render("upload", {layout:"index"})
})

app.get('/images/render', async (req, res) => {
    try{
        let images = await getAllImages()

        images = images.data.map(image => {
            const imageB64 = fs.readFileSync(image.path, {encoding:"base64"})
            image.image = `data:image/jpg;base64,${imageB64}`

            return image
        })

        return res.render("images", {layout:"index", images:images})
    }catch(err){
        return res.send("Se produjo un error al obtener las imagenes.")
    }
})

app.get('/images/:id', async (req, res) => {
    const {id} = req.params

    try{
        const image = await getImageById(id)
        if(image){
            const imageB64 = fs.readFileSync(image.path, {encoding:"base64"})
        
            const html = `<img src="data:image/jpg;base64,${imageB64}" alt="imagen" />`
            return res.send(html)
        } else {
            return res.send(`No existe la imagen con el id: ${id}`)
        }
        
    }catch(err){
        return res.send("Se produjo un error al traer la imagen")
    }
})

app.post('/images/upload', upload.single('pdtc'), async (req, res) => {
    try{
        const {path} = req.file
        await createImage(path)
        const imageB64 = fs.readFileSync(path, {encoding:"base64"})
    
        const html = `<h2>Usted Subio la siguiente imagen:</h2> <br>
        <img src="data:image/jpg;base64,${imageB64}" alt="imagen" />`
        return res.status(200).send(html)
    }catch(err){
        return res.send("no se pudo subir la imagen")
    }

})

app.listen(3000, () => {
    console.log("Servidor levantado.")
})