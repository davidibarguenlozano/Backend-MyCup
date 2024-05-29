
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const localtunnel = require('localtunnel');

// Importar tus módulos personalizados
const { getAllUsers, register, getUserByEmail } = require('../modules/modules');

const app = express();
const PORT = process.env.PORT || 3000; // Define el puerto en el que se ejecutará el servidor

app.use(cors());
app.use(bodyParser.json());

app.get('/api/controller', async (req, res) => {
  const resp = await getAllUsers()
  res.send(resp)
});


app.get('/api/login/:email', async (req, res) => {
  const resp = await getUserByEmail(req.params.email)
  if(!resp){
    res.status(404).send(false)
    return
  }
  res.json({message: "Usuario encontrado", data: true})
});

app.post('/api/controller', (req, res) => {
  const data = req.body;
  console.log('Data received:', data);
  res.status(200).json({ message: 'Data received successfully', receivedData: data });

  register(data.name, data.email, data.gender, data.age, data.password, data.id_rol)
});


app.post('/api/login', async (req, res) => {

  const data = req.body;
  console.log('Data received:', data);
 
  try {
    const usuario = await getUserByEmail(data.email);
    console.log('Usuario:', usuario);
    console.log(data.password,usuario.password)
    const isMatch =await bcrypt.compare(data.password, usuario.password);
    if (!isMatch) {
      console.log("credenciales incorrectas");
    }
    else {
      const token = jwt.sign(usuario, "contreaseña", { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token: token });
    }
    
  } catch (error) {
    console.error('Error:', error);
    
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);

  // Inicia Localtunnel después de que el servidor esté corriendo
  (async () => {
    try {
      const tunnel = await localtunnel({ port: PORT, subdomain: 'YOUR_SUBDOMAIN' });
      console.log(`Tunnel is running at ${tunnel.url}`);

      tunnel.on('close', () => {
        console.log('Tunnel closed');
      });
    } catch (error) {
      console.error('Error starting the tunnel:', error);
    }
  })();
});