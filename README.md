# e-commerce
Membuat platform untuk e-commerce

## RESTful endpoints
List of available endpoint:

  - `POST /products`
  - `GET /products`
  - `PUT /products/:id`
  - `DELETE /products/:id`
  - `POST /login`
  - `POST /register`
  - `POST /cart`
  - `GET /cart`
  - `PUT /cart/:id`
  - `DELETE /cart/:id`


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
### POST /cart
_Request headers_
```json
{
  "access_token": "<access_token>"
}
```

_Request Body_
```json
  {
    "quantity": "integer",
    "status": "boolean",
    "UserId": "integer",
    "ProductId": "integer"
  }

```

_Response (201 - Created)_
```json
  {
    "id": "integer",
    "quantity": "integer",
    "status": "boolean",
    "UserId": "integer",
    "ProductId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "quantity is empty"
  },
  {
    "message": "status is empty"
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
### GET /cart
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
    "quantity": 1,
    "status": true,
    "UserId": 1,
    "ProductId": 2,
    "Product": "Product"
  },
  {
    "id": 2,
    "quantity": 5,
    "status": true,
    "UserId": 1,
    "ProductId": 2,
    "Product": "Product"
  },
  {
    "id": 3,
    "quantity": 1,
    "status": true,
    "UserId": 1,
    "ProductId": 2,
    "Product": "Product"
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
    "quantity": "integer",
    "status": "boolean",
    "UserId": "integer",
    "ProductId": "integer"
  }

```

_Response (200 - OK)_
```json
  {
    "id": "integer",
    "quantity": "integer",
    "status": "boolean",
    "UserId": "integer",
    "ProductId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
  }
```

_Response (400 - Bad Request)_
```json
[
  {
    "message": "quantity is empty"
  },
  {
    "message": "status is empty"
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
    "quantity": "integer",
    "status": "boolean",
    "UserId": "integer",
    "ProductId": "integer",
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
### POST /register

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
    "id": "integer",
    "email": "string",
    "role": "user"
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
