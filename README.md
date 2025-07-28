# Capacitacion_Backend_Reto

# Dependencias
├── axios@1.11.0
├── express@5.1.0
├── firebase-admin@13.4.0
├── sequelize@6.37.7
└── sqlite3@5.1.7

npm install axios@1.11.0 express@5.1.0 firebase-admin@13.4.0 sequelize@6.37.7 sqlite3@5.1.7

# Levantar el backend
node app.js

# Lista de endpoints

Obtener todos los usuarios
[GET]  http://localhost:3000/api/usuarios

Crear usuario con rol
[POST] http://localhost:3000/api/auth/registrar

Body JSON
{
  "correo": "correo51@correo.com",
  "contrasena": "123456",           (+6 caracteres)
  "rol": "admin",                   (admin o usuario)
  "nombre": "pepito"
}

Logear un usuario para obtener token de firebase para control de permisos
[POST] http://localhost:3000/api/auth/login

Body JSON
{
  "correo": "correo50@correo.com",
  "contrasena": "123456"
}

Editar nombre usuario
[PUT]  http://localhost:3000/api/usuarios/:IdUsuario
Body JSON
{
  "nombre": "menganito"
}

Borrar usuario en Firebase y base de datos sqlite con token para control de permisos de admin
[DELETE] http://localhost:3000/api/usuarios/:IdUsuario
Header Authorization Bearer Token   (sin " " te lo da el login de un usuario y tiene que tener rol admin)

Obtener todas las asignaturas
[GET]   http://localhost:3000/api/asignatura

Crear asignatura
[POST]  http://localhost:3000/api/asignatura
Body JSON
{
    "nombre": "programacion",
    "descripcion": "algoritmos y estructura de datos"
}

Obtener los usuarios inscriptos a la asignatura
[GET]  http://localhost:3000/api/asignatura/:IdAsignatura


Inscribir un usuario a una asignatura
[POST] http://localhost:3000/api/asignatura/inscribir/:IdAsignatura/:IdUsuario

Obtener las asignaturas de un usuario
[GET]  http://localhost:3000/api/asignatura/usuario/:IdUsuario

Borrar un usuario de una asignatura
[DELETE] http://localhost:3000/api/asignatura/borrar/:IdAsignatura/IdUsuario       
