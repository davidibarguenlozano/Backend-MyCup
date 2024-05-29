const getUserByEmail = require("./modules")

const register = async (email) => {

  try {
      const option = await getUserByEmail(email);

      if (option === 2) {
          console.log("EL correo electronico ya ha sido registrado")
      }
      if (option === 1) {
        console.log("No existe")
      }



  } catch (error) {
      console.error('Error:', error);
  } finally {
      await connection.end();
  }
};

register("correoejemplo2.com")