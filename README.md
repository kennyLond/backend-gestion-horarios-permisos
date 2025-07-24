
## AUTOR  
**Kenny Orlando Londoño Torrado** – Desarrollador Backend Jr.  
[@kennyLond](https://github.com/kennyLond)  

# API REST – Sistema de Asistencias y Permisos (Backend)

Este proyecto es la parte backend del sistema **TEMPO**, encargado de gestionar registros de asistencia, permisos, usuarios y personas. Desarrollado con **Node.js**, **Express** y **MySQL**, proporciona una API robusta y escalable que permite realizar operaciones CRUD seguras y eficientes.

Este proyecto fue creado como parte del módulo productivo para el SENA, y se integra con un frontend Angular desarrollado previamente.

---

## OBJETIVO

Implementar una **API RESTful** para registrar, consultar y actualizar los datos de asistencia y permisos de empleados, integrando una base de datos MySQL, buenas prácticas de seguridad con Helmet y CORS, y almacenamiento de archivos con Multer.

---

## FUNCIONALIDADES PRINCIPALES

- Consultar asistencias por persona o general.
- Registrar entrada y salida con validación de duplicados por día.
- Registro y consulta de permisos de los empleados.
- Gestión CRUD de usuarios y personas.
- Manejo de archivos subidos (ej. fotos o documentos).
- Servidor Express modularizado y seguro.

---

## TECNOLOGÍAS UTILIZADAS

- **Node.js** – Entorno de ejecución JavaScript.
- **Express** – Framework web para Node.js.
- **MySQL** – Sistema de gestión de base de datos relacional.
- **TypeScript** – Tipado estático sobre JavaScript.
- **Multer** – Manejo de archivos subidos.
- **Helmet** – Seguridad HTTP.
- **CORS** – Control de acceso de orígenes cruzados.
- **Dotenv** – Variables de entorno.

---

## ESTRUCTURA DEL PROYECTO

```
src/
├── controllers/          # Lógica de negocio (asistencias, personas, usuarios, permisos)
├── db/                   # Conexión con MySQL (pool)
├── models/               # Clase Server
├── routes/               # Rutas agrupadas por recurso
├── utils/                # Configuración de Multer
├── uploads/              # Archivos subidos (sirve estáticamente)
├── index.ts              # Punto de entrada principal
```

---

## REQUISITOS DEL SISTEMA

- Node.js ≥ 18  
- NPM ≥ 9  
- MySQL 8.x  
- Postman o cliente HTTP para pruebas  
- (Opcional) Docker para despliegue  

---

## INSTALACIÓN Y USO

### 1. Clonar el repositorio

```bash
git clone https://github.com/kennyLond/backend-tempo.git
cd backend-tempo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear archivo `.env`

```bash
PORT=3000
```

(Se pueden agregar más variables si decides migrar a autenticación con JWT o entorno productivo.)

### 4. Configurar conexión a base de datos

Editar el archivo `src/routes/keys.ts` con tu configuración local de MySQL:

```ts
const database = {
  host: "localhost",
  user: "root",
  password: "",
  database: "supermercado"
}
```

### 5. Iniciar servidor

```bash
npm run dev
```

Servidor disponible en `http://localhost:3000`.

---

## ENDPOINTS DISPONIBLES

### Asistencias

- `GET /api/asistencias` → Lista todas las asistencias
- `GET /api/asistencias?persona_id=1` → Filtra asistencias por persona
- `POST /api/asistencias/entrada` → Registra hora de entrada
- `POST /api/asistencias/salida` → Registra hora de salida

### Personas

- `GET /api/personas` → Registra empleados
- `POST /api/personas` → Registra empelados
- `PUT /api/personas/:id` → Actualiza información de empleados
- `DELETE /api/personas/:id` → Eliminado empleados

### Usuarios

- `POST /api/users/register` → Registro de usuario
- `POST /api/users/login` → Inicio de sesión

### Permisos

- `GET /api/permisos` → Lista los permisos
- `POST /api/permisos` → Registra los permisos
- `PUT /api/permisos/:id` → Actualiza Informacion de permisos
- `DELETE /api/permisos/:id` → Elimina los permisos

---

## COMANDOS ÚTILES

### Ejecutar en desarrollo con recarga automática

```bash
npm run dev
```

### Compilar TypeScript

```bash
tsc
```

---

## SEGURIDAD Y MEJORAS FUTURAS

- Implementación de autenticación con JWT.
- Pruebas automatizadas con Jest o Supertest.
- Manejo de carpetas `uploads/` con validaciones de tipo de archivo.
- Despliegue en servicios como Vercel o Render.

---

## LICENCIA

Este proyecto se desarrolló con fines académicos y puede reutilizarse bajo fines personales o educativos.

---

## CONTACTO

Si deseas comunicarte conmigo para propuestas, sugerencias o feedback:

📧 **kennylondono@gmail.com**  
🔗 [LinkedIn](https://www.linkedin.com/in/kennylondoño)
