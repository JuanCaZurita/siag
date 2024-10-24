const express = require('express');
const sequelize = require('./config/database');
const cag_usuario = require('./models/ag_usuario');
const app = express();
const PORT = 2999;

app.use(express.json()); // Para parsear las peticiones con JSON

// Sincronizar sequelize con la base de datos
// sequelize.sync().then(() => {
//    console.log('Base de datos y tablas creadas')
// });

//Ruta para obtener todos los usuarios
// app.get('/api/usuarios', async (req, res) => {
//     try {
//         const usuarios = await cag_usuario.findAll();
//         res.json(usuarios);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({error: 'Error al obtener los usuarios'});
//     }
// });


// Obtener usuarios por condición (por ejemplo, estado como VARCHAR)
app.get('/api/usuarios', async (req, res) => {
    try {
      console.log(req.query); // Verifica lo que llega en la consulta

      // Lee la condición desde los parámetros de consulta (query params)
      const { usuario, estado } = req.query; // Espera recibir el usuario y el estado en la URL
  
      // Construir la consulta condicional con Sequelize
      const whereCondition = {};
  
      // Si se proporciona el estado en la consulta, agrégalo como condición
      if (usuario) {
        whereCondition.usuario = usuario;  // Comparar el campo usuario como string
      }

      // Si se proporciona el estado en la consulta, agrégalo como condición
      if (estado) {
        whereCondition.estado = estado;  // Comparar el campo estado como string
      }
        
      console.log('Condición de búsqueda:', whereCondition); // Verifica qué condición se aplica

      // Realizar la consulta con la condición
      const usuarios = await cag_usuario.findAll({ where: whereCondition });
  
      // Si no se encuentran usuarios, envía un mensaje
      if (usuarios.length === 0) {
        return res.status(404).json({ message: 'No se encontraron usuarios que coincidan con la condición' });
      }
  
      // Devolver la lista de usuarios que cumplan con la condición
      res.status(200).json(usuarios);
    } catch (err) {
      console.error('Error al recuperar usuarios:', err);
      res.status(500).json({ error: 'Error al recuperar los usuarios' });
    }
  });

// Ruta para crear un nuevo usuario
app.post('/api/usuarios', async (req, res) => {
    try {
        const {usuario, nombres, clave, estado} =req.body;
        const newUser = await cag_usuario.create({usuario, nombres, clave, estado}); // Crea un nuevo usuario

        // Envia la respuesta al servidor
        res.status(201).json(newUser); // Codigo 201 para creado
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al crear un usuario'});
    }
});

// Ruta para modificar campos de un registro del usuario
app.patch('/api/usuarios/:usuario', async (req, res) => {
    try {
        const {usuario} = req.params;
        const {nombres, clave, estado} = req.body;

        // Buscar y actualizar el usuario
        const [updated] = await cag_usuario.update(
            {nombres, clave, estado}, // Los campos a actualizar
            {where: {usuario} }         // Condicion para encontrar el usuario
        );

    // Si no se encuentra el usuario, envía un mensaje de error
    if (updated === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Respuesta de éxito si el usuario fue actualizado
      res.status(200).json({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }    
});

// Eliminar un usuario por su `usuario`
app.delete('/api/usuarios/:usuario', async (req, res) => {
    try {
      const { usuario } = req.params;
  
      // Busca y elimina el usuario por el campo `usuario`
      const result = await cag_usuario.destroy({ where: { usuario } });
  
      // Si no se encuentra el usuario, envía un mensaje de error
      if (result === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Respuesta de éxito si el usuario fue eliminado
      res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
  });

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});