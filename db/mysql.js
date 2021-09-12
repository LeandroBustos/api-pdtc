const mysql = require('mysql')

module.exports.request = (query) => new Promise((res, rej) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'lbustos',
        password: 'kishin22',
        database: 'pdtc'
    })
    connection.query(query, (error, data, fields) => {
        console.log(query)
        if(error) rej(error)
    
        // console.log("DATA", data)
        // console.log("FIELDS", fields)
        console.log("Se realiza la query")
    
        connection.end((err) => {
            if(err) rej(err)
            if(data.length <= 1){
                res(data[0])
            } else {
                res(data)
            }
            console.log("Se finaliza la query")
        })
    })
})