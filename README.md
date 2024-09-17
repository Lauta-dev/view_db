# SQL Table Viewer
Este es un proyecto monorepo que incluye un servidor backend construido con NestJS y un cliente frontend desarrollado con React. El objetivo principal de la aplicación es proporcionar una interfaz visual para visualizar tablas SQL, con soporte para PostgreSQL (Psql) por ahora. La aplicación permite a los usuarios ver las tablas y las columnas asociadas.

## Características

- Visualización de tablas SQL: Permite visualizar tablas desde una base de datos PostgreSQL.
- Exploración de columnas: Muestra las columnas de cada tabla.
- Backend en NestJS: Un servidor robusto y escalable.
- Frontend en React: Interfaz de usuario moderna y reactiva.
- Dockerized: Despliegue y ejecución simplificados utilizando Docker.
- Estructura del Proyecto
- El proyecto está organizado en un monorepo con las siguientes carpetas principales:

```text
.
├── packages
│   ├── server   # Servidor NestJS
│   └── client  # Cliente React
├── docker-compose.yml
└── README.md
```

### Backend (NestJS)
El servidor está desarrollado en TypeScript utilizando NestJS. Se encarga de conectarse a la base de datos PostgreSQL y proporcionar las APIs necesarias para la visualización de las tablas y columnas.

### Frontend (React)
El cliente está desarrollado en TypeScript utilizando React. Se comunica con el backend para obtener los datos de las tablas y las columnas, y presenta una interfaz de usuario para interactuar con estos datos.

## Requisitos Previos
- Docker y Docker Compose instalados.
- Node.js y npm (si deseas correr las aplicaciones fuera de Docker).

### Instalación y Ejecución

1. Clonar el repositorio:

```bash

git clone https://github.com/tu-usuario/sql-table-viewer.git
cd sql-table-viewer
```

2. Construir y ejecutar los contenedores con Docker Compose:


```bash
docker-compose up --build

```

3. Acceder a la aplicación:

- El frontend estará disponible en http://localhost:5000
- El backend estará disponible en http://localhost:3000

## Desarrollo
### Backend
Para trabajar en el backend, navega a la carpeta backend:

```bash
cd packages/backend
npm install
npm run start:dev
```

### Frontend
Para trabajar en el frontend, navega a la carpeta frontend:
```bash
cd packages/frontend
npm install
npm run dev
```

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.
