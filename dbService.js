const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});
//^^^^ VALORES DE CONEXION .ENV

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    if ((connection.state)=="connected")
     {console.log('db esta: on ❣◕ ‿ ◕ ❣');}
     else{ console.log('db esta: muerta ლ(ಠ_ಠლ)')}
});
//errores y estado

class DbService {



    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }


    async getAllData() 
    {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            //console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
        connection.end(function(err) {
            // The connection is terminated now
          });
    }

    //Insert
    async insertNewName(name) 
    {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, date_added) VALUES (?,?);";

                connection.query(query, [name, dateAdded] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                id : insertId,
                name : name,
                dateAdded : dateAdded
            };
        } catch (error) {
            console.log(error);
        }
        connection.end(function(err) {
            // The connection is terminated now
          });
    }

    async deleteRowById(id) 
    {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM names WHERE id = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }

        connection.end(function(err) {
            // The connection is terminated now
          });
    }

    async updateNameById(id, name) 
    {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE names SET name = ? WHERE id = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }

        connection.end(function(err) {
            // The connection is terminated now
          });
    }

    async searchByName(name)
     {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM names WHERE name = ?;";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(" ERROR (✖╭╮✖) : ")
            console.log(error);
        }
        connection.end(function(err) {
            // The connection is terminated now
          });
    }


    async shutdown(){connection.end(function(err) {});}

    async pruebaInsertar (name, last_name, titulo_princ)
    {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO names (name, last_name, titulo_princ)=  VALUES (?,?,?;)";

                connection.query(query, [name,last_name,titulo_princ], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) 
        {
            console.log(" ERROR (✖╭╮✖) : ")
            console.log(error);
        };
    }
}




//share 
module.exports = DbService;