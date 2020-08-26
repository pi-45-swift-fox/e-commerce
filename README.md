# e-commerce
Membuat platform untuk e-commerce

## RESTful endpoints
List of available endpoint:

  - `POST /products`
  - `GET /products`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `POST /login`


### POST /products
_Request headers_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```json
  {
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer"
  }

```

_Response (201 - Created)_
```json
  {
    "id": "integer",
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "name is empty"
  },
  {
    "message": "image_url is empty"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### GET /products
_Request headers_
```json
{
  "access_token": "<access_token>"
}
```

_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "name": "sepatu",
    "image_url": "unplash.com",
    "price": 6,
    "stock": 1
  },
  {
    "id": 2,
    "name": "kaos",
    "image_url": "pexels.com",
    "price": 5,
    "stock": 2
  },
  {
    "id": 3,
    "name": "kaos kaki",
    "image_url": "google.com",
    "price": 10,
    "stock": 1
  }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---
### PUT /products/:id
_Request headers_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```json
  {
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer"
  }

```

_Response (200 - OK)_
```json
  {
    "id": "integer",
    "name": "string",
    "image_url": "integer",
    "price": "integer",
    "stock": 1,
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "name is empty"
  },
  {
    "message": "image_url is empty"
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### DELETE /products/:id
_Request headers_
```json
{
  "access_token": "<access_token>"
}
```

_Response (200 - OK)_
```json
  {
    "id": "integer",
    "name": "string",
    "image_url": "string",
    "price": "integer",
    "stock": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (404 - Not Found)_
```
{
  "message": "error Not Found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
---
### POST /login

_Request Body_
```json
  {
    "email": "string",
    "password": "string"
  }

```

_Response (200 - OK)_
```json
  {
    "access_token": "<access_token>"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "You don't put any password"
  },
  {
    "message": "You don't put any email"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal Server Error"
}
```
