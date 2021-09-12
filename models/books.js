//FUNCION QUE DEVUELVE UNA PROMESA QUE MANEJA EL ASINCRONISMO DE MYSQL
const {request} = require('../db/mysql')

module.exports.getAllBooks = async () => {
    let libros = await request("SELECT * FROM books")
    return {
        isData: libros.length ? true : false,
        cantBooks: libros.length,
        data: [...libros]
    }
}

module.exports.getAllBooksOfuser = async (idUser) => {
    let libros = await request(
        `
            SELECT 
                books.name AS name,
                books.id AS id
            FROM books_users
            INNER JOIN books
            ON books.id = books_users.book_id
            WHERE books_users.user_id = ${idUser}
        `
    )

    console.log(libros)
    return {
        isData: libros.length ? true : false,
        cantBooks: libros.length,
        data: [...libros]
    }
}

module.exports.getBookById = async (id) => {
    const libro = await request(`SELECT * FROM books WHERE id = ${id}`)
    return {
        isData: libro ? true : false,
        data: libro ? [libro] : [] 
    }
}

module.exports.createBook = async ({name, publish_date, disponible}) => {
    const libro = await request(`
        INSERT INTO books(name, publish_date, disponible)
        VALUES('${name}', '${publish_date}', ${disponible});
    `)
    return {
        "id": libro.insertId,
        name
    }
}

module.exports.modifyBook = async ({id, name, publish_date, disponible}) => {
    const libro = await request(`
        UPDATE books
        SET name = '${name}',
            publish_date = '${publish_date}',
            disponible = ${disponible}
        WHERE id = ${id}
    `)
    return {
        id,
        name,
        publish_date,
        disponible,
        updated: libro.affectedRows ? true : false
    }
}

module.exports.deleteBook = async (id) => {
    const libro = await request(`
        DELETE FROM books
        WHERE id = ${id}
    `)
    return {
        id,
        deleted: libro.affectedRows ? true : false
    }
}