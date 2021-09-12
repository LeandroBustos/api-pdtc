//FUNCION QUE DEVUELVE UNA PROMESA QUE MANEJA EL ASINCRONISMO DE MYSQL
const {request} = require('../db/mysql')

module.exports.getAllImages = async () => {
    const images = await request("SELECT * FROM images")
    return {
        isData: (images && images.length) ? true : false,
        cantBooks: images ? images.length : 0,
        data: images ? [...images] : []
    }
}

module.exports.getImageById = async (id) => {
    const image = await request(`
        SELECT * FROM images
        WHERE id = ${id}
    `)

    return image
}

module.exports.createImage = async (path) => {
    const image = await request(`
        INSERT INTO images(path, upload_date)
        VALUES('${path}', NOW())
    `)
    return {
        "id": image.insertId,
    }
}