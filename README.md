# Prueba tecnica

Este proyecto de ejemplo está configurado con Vite y a continuación se incluyen las instrucciones para iniciar y ejecutar el proyecto. Además, incluye varias funcionalidades importantes para interactuar con los datos y administrar la aplicación.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas:

- **Node.js** (v14 o superior): [Descargar Node.js](https://nodejs.org/)
- **PNPM**: [Instrucciones de instalación](https://pnpm.io/installation)

## Inicialización del proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### 1. Clonar el repositorio

```bash
git clone <URL del repositorio>
cd <nombre del repositorio>
```

### 2. Inicializar el proyecto

```bash
pnpm i
pnpm dev
```

## Funcionalidades

### 1. Peticiones a la API

Se hace uso de una API externa (como la API de Rick and Morty) para obtener información sobre los personajes. La función `fetchCharacters` obtiene los personajes y los guarda en el estado global.

#### Ejemplo de uso:

- Los personajes se cargan automáticamente en la aplicación cuando se inicia.
- La lista de personajes se muestra en el frontend.

### 2. Agregar personajes

El proyecto permite agregar nuevos personajes a través de un formulario. Los datos ingresados en el formulario se envían al estado global y se actualizan en la interfaz.

#### Funcionalidad:

- Se utiliza el formulario para ingresar el nombre, estado, especie, género e imagen del personaje.
- Los personajes se agregan a través de la función `addCharacters` en el store de Zustand.

### 3. Editar personajes

Puedes editar un personaje seleccionándolo de la lista y abriendo el formulario de edición. Los datos de dicho personaje se cargan en el formulario, y al hacer clic en "Submit", se actualizan en el estado global.

#### Funcionalidad:

- Al seleccionar un personaje, sus datos se cargan en los campos del formulario.
- Los cambios se aplican con la función `updateCharacter`, que actualiza el personaje en el estado global.

### 4. Login

El proyecto tiene una funcionalidad de login que se maneja localmente. A través de un formulario de login, el usuario puede ingresar un nombre de usuario y contraseña. Los datos se gestionan en el estado local y se pueden usar para la autenticación dentro de la aplicación.

#### Funcionalidad:

- El usuario puede ingresar sus credenciales.
- La autenticación se realiza localmente (sin backend en este caso).
- Si la autenticación es exitosa, el usuario accede a la parte protegida de la aplicación.

### 5. Todo en Localhost

Todo el proyecto se ejecuta localmente, sin necesidad de servidores externos. Una vez que inicias el servidor con `pnpm dev`, puedes probar todas las funcionalidades en **http://localhost:5173**.
