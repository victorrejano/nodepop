## Nodepop
Nodepop API - Venta de artículos de segunda mano.

## Configuración

- Script de instalación para db de pruebas
  ```
  npm run installDB
  ```
- Credenciales de prueba
  ```
  user: admin@admin.com
  pass: root
  ```
- Iniciar aplicación en modo desarrollo
  ```
  npm run dev
  ```
- Iniciar aplicación
  ```
  npm start
  ```
- Variables de entorno .env
  ```
  JWT_KEY: Clave de encriptación para generar token identificativos de usuario
  JWT_EXPIRATION: Tiempo de expiración de token
  ```

## Peticiones API
  - Listado de anuncios ```GET /api/v1/ads```
  - Listado de tags ```GET /api/v1/ads/tags```
  - Registro de usuario ```POST /api/v1/users```
  - Login de usuario ```POST /api/v1/users/login```

### Listado de anuncios ```GET /api/v1/ads```

- Ejemplo: https://nodepop.vrmapps.com/api/v1/ads

| Parámetros de filtrado (*Obligatorio)| Tipo           | Uso            |
| ---------------------------| -------------- | -------------- |
| name                       | String         | Nombre de artículo a filtrar               | 
| forSale                    | Boolean        | Artículo en venta o se busca ```true / false```|
| price                      | Number         | Rango de precio ```1-10 / 1- / -50 / 25``` |
| tags                       | String         | Tags de anuncio. Permite múltiples valores separados por espacios |
| sort                       | String         | Índice sobre el que ordenar el resultado|                 
| start                      | Int            | Índice del primer resultado obtenido|
| limit                      | Int            | Máximo número de resultados obtenidos|
| jwttoken*                  | String         | Token de validación de usuario. Se espera en ```header ('x-access-jwttoken'), body o query```|

- Respuesta:

```json
{
   "success":true,
   "data":[
      {
         "tags":[
            "lifestyle",
            "mobile"
         ],
         "_id":"5c1eb80e0cdb6d37a1a105a8",
         "name":"iPhone 3GS",
         "forSale":false,
         "price":50,
         "image":"/images/ads/iphone.jpg"
      },
      {
         "tags":[
            "lifestyle",
            "mobile"
         ],
         "_id":"5c1eb8280cdb6d37a1a105a9",
         "name":"Samsung Galaxy S7",
         "forSale":false,
         "price":200,
         "image":"/images/ads/iphone.jpg"
      },
      {
         "tags":[
            "lifestyle",
            "motor"
         ],
         "_id":"5c1eb7e60cdb6d37a1a105a7",
         "name":"Bicicleta",
         "forSale":true,
         "price":231.15,
         "image":"/images/ads/bici.jpg"
      },
      {
         "tags":[
            "lifestyle",
            "work"
         ],
         "_id":"5c1eb8590cdb6d37a1a105aa",
         "name":"Macbook Pro",
         "forSale":true,
         "price":1200,
         "image":"/images/ads/mac.jpg"
      }
   ]
}
```

### Listado de tags ```GET /api/v1/ads/tags```

- Ejemplo: https://nodepop.vrmapps.com/api/v1/ads/tags

| Parámetro (*Obligatorio)   | Tipo           | Uso            |
| ---------------------------| -------------- | -------------- |
| jwttoken*                  | String         | Token de validación de usuario. Se espera en ```header ('x-access-jwttoken'), body o query```|

- Respuesta:

```json
{
  "success": true,
  "data": [
    "mobile",
    "work",
    "lifestyle",
    "motor"
  ]
}
```

### Registro de usuario ```POST /api/v1/users```

- Ejemplo: https://nodepop.vrmapps.com/api/v1/users

| Parámetro (*Obligatorio)   | Tipo           | Uso            |
| ---------------------------| -------------- | -------------- |
| name*                      | String         | Nombre de usuario |
| email*                     | String         | Email de registro |
| password*                  | String         | Contraseña de registro |


- Respuesta:

```json
{
  "success": true,
  "data": {
    "_id": "5c1fb82cfa78dd95aa6416b8",
    "email": "example@example.com",
    "name": "example",
    "password": "$2b$10$XEbTWltdb5.w7SJm4CHkY.h.uBFWXFMMTP92LhcYLGxnr./huuUoW",
    "__v": 0
  }
}
```

### Login de usuario ```POST /api/v1/users/login```

- Ejemplo: https://nodepop.vrmapps.com/api/v1/users/login

| Parámetro (*Obligatorio)   | Tipo           | Uso            |
| ---------------------------| -------------- | -------------- |
| email*                     | String         | Email de usuario|
| password*                  | String         | Contraseña de usuario|


- Respuesta:

```json
{
  "success": true,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWMxZjViM2E1N2Q0MTk4MzQ3OTAyOGEzIiwiaWF0IjoxNTQ1NTYxMTY3LCJleHAiOjE1NDU2NDc1Njd9.mdV5s5fhkWHR7sULip5jhJ0vbFnDPkLLHL9STJtYm-4"
}
```
## Indicaciones sobre despliegue

- Dominio para servicio API
  ```
  https://nodepop.vrmapps.com/
  ```
- IP pública 
  ```
  63.34.79.211
  ```
- Ficheros estáticos 
  ```
  https://nodepop.vrmapps.com/images/ads/mac.jpg
  https://nodepop.vrmapps.com/images/ads/bici.jpg
  ```
