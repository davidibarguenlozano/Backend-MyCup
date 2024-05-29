const connection = require("../config/config.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const createUser = async (username, email, gender,age,hashedPassword, idrol) => {
    try {

        let nuevoElementouser = { id: "0", name: username, email: email, gender: gender, age:age, password: hashedPassword };

        const Insertarinuser = `INSERT INTO users SET ?`;




        connection.query(Insertarinuser, nuevoElementouser, (error, resultados, campos) => {
            if (error) {
                JSON.stringify(resultados);
                console.error('Error al agregar un elemento a la tabla: ' + error.message);
                return;
            }
            console.log('Elemento agregado exitosamente a la tabla');
        });

        let nuevoElemntoroles = {id_user : "0" , id_role: idrol }


        const Insertarinroles = `INSERT INTO users_roles SET ?`;

        connection.query(Insertarinroles, nuevoElemntoroles, (error, resultados, campos) => {
            if (error) {
                JSON.stringify(resultados);
                console.error('Error al agregar un elemento a la tabla: ' + error.message);
                return;
            }
            console.log('Elemento agregado exitosamente a la tabla');
        });


    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        const obtener = `SELECT * FROM users where email =?`;

        // Envolver la consulta en una promesa
        return new Promise((resolve, reject) => {
            connection.query(obtener, [email], (error, results, fields) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    reject(error); // Rechazar la promesa en caso de error
                } else {
                    // Manejar los resultados de la consulta
                    let data = results[0]

                    resolve(data)
                }
            });
        });

    } catch (error) {
        console.error('Error al consultar el usuario:', error);
        throw error;
    }

}



const getAllUsers = async function () {

    try {
        const obtenertodos = `SELECT * FROM users`;
        return new Promise((resolve, reject) => {
            connection.query(obtenertodos, (error, results, camps) => {
                if (error) {
                    console.error(error);
                    reject(error);
                }

                resolve(results)

            })
        })


    } catch (error) {
        console.error('Error al consultar el usuario:', error);
        throw error;
    }
}


const register = async (username, email, gender,age,password, idrol) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    id =""
    try {
        const option = await getUserByEmail(email);

        if (option) {
            console.log("Ese man existe")
        }
        else {
            createUser(username, email, gender,age,hashedPassword,idrol)

        }


    } catch (error) {
        console.error('Error:', error);
    } finally {
        connection.end();
    }
};


const registertournament = async (username, email, gender,age,password, idrol) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    id =""
    try {
        const option = await getUserByEmail(email);

        if (option) {
            console.log("Ese man existe")
        }

        createUser(username, email, gender,age,hashedPassword,idrol)





    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
};


const verificartoken = async (token,claveSecreta)=>{
    console.log(token)
    jwt.verify(token, claveSecreta, (error, decoded) => {
        if (error) {
          console.log('Error al verificar el token:', error.message);
          return;
        }
        console.log('Token verificado:', decoded);
      });    
}


module.exports = {getAllUsers,register,getUserByEmail};


