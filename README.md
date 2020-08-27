## E-Commerce
E-Commerce CMS is an server-side / admin-side application to manage E-Commerce client-side. This app has:

RESTful endpoint for Product CRUD Operation
Used Technology :
    *Express Js,
    *Sequelize,
    *Postgres,
    *Jest (JS Testing Framework)
    *Json Web Token,
    *Bcrypt
    *JSON Formated Response

## RESTful endpoints

### Global Response
_Response (500 - Error)_
```
{
  "message": "Internal Server Error"
}
```
Response (401 - Unauthorized)
```
    {
        "message": "Not authroized to do the actions"
    }
```
### GET /products
_Request Header_
```
{
  "<not_neeeded>"
}
```

_Request Body_
```
    "<not_neeeded>"
```
_Response (200)_
```
[
  {
    "id": 1,
    "name": "<product name>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<product name>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }, ...
]
```
_Response (400)_
```
{
  "message": "Bad Request"
}
```

### GET /products/:id
_Request Header_
```
{
  "<not_neeeded>"
}
```

_Request Body_
```
    "<not_neeeded>" 
```
_Response (200)_
```
  {
    "id": 1,
    "name": "<product name>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```
_Response (404 - Not Found)_
```
    {
        "message": "product not found"
    }
```
### POST /products

_Request Header_
```
{
  "token": "<admin access token>"
}
```

_Request Body_
```
    {
        "name": "<product name to get insert into>",
        "description": "<product_description to get insert into>",
        "image_url": "<product_url_img to get insert into>",
        "price": "<product price to get insert into>",
        "stock": "<product stock to get insert into>"
    }
```
_Response (201 - Created)_
```
    {
        "id": <given id by system>,
        "name": "<posted product name>",
        "description": "<posted product description>",
        "image_url": "<posted url_img>",
        "price": "<posted product price>",
        "stock": "<posted product stock>",
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
    }
```
_Response (400 - Bad Request)_
```
{
  "message": "name cannot be empty!" || image_url cannot be empty! || price cannot be empty! || stock cannot be empty!
}
```

### PUT /products/:id

_Request Header_
```
{
  "token": "<admin access token>"
}
```
_Request Body_
```
    {
        "name": "<product name to get insert into>",
        "description": "<product description to get insert into>",
        "image_url": "<product_url_img to get insert into>",
        "price": "<product price to get insert into>",
        "stock": "<product stock to get insert into>"
    }
```

_Response (200)_
```
    {
        "name": "<posted name to get insert into>",
        "description": "<posted description to get insert into>",
        "image_url": "<posted_url_img to get insert into>",
        "price": "<posted price to get insert into>",
        "stock": "<posted stock to get insert into>"
    }
```
_Response (400 - Bad Request)_
```
    {
        "message": "name cannot be empty!" || image_url cannot be empty! || price cannot be empty! || stock cannot be empty!
    }
```
_Response (404 - Not Found)_
```
    {
        "message": "product not found"
    }
```
### PUT /products/buy/:id

_Request Header_
```
{
  "token": "<user access token>"
}
```
_Request Body_
```
    {
        "name": "<product name to get insert into>",
        "description": "<product description to get insert into>",
        "image_url": "<product_url_img to get insert into>",
        "price": "<product price to get insert into>",
        "stock": "<product stock to get insert into>"
    }
```

_Response (200)_
```
    {
        "message": "purchasing completed!"
    }
```
_Response (400 - Bad Request)_
```
    {
        "message": "name cannot be empty!" || image_url cannot be empty! || price cannot be empty! || stock cannot be empty!
    }
```


### DELETE /products/:id

_Request Header_
```
{
  "token": "<admin access token>"
}
```
_Request Body_
```
    "<not_neeeded>"
```
_Response (200 - DELETED)_
```
   {
        "id": 1,
        "name": "<deleted product name>",
        "description": "<deleted product description>",
        "image_url": "<deleted url_img>",
        "price": "<deleted product price>",
        "stock": "<deleted product stock>"
    } 
```


_Response (404 - Not Found)_
```
    {
        "message": "product not found"
    }
```

### POST /login
_Request Header_
```
    Not needed
```
_Request Body_
```
    "email": "<user@admin.com>",
    "password": "<admin>"
```
_Response (200)_
```
    "<access_token>": "hashed token"
```
_Response (404)_
```
    {
        "message": "email cannot be empty" || "password cannot be empty"
    }
```


### POST /register
_Request Header_
```
    Not needed
```
_Request Body_
```
    "email": "<user@mail.com>",
    "username": "<john>"
    "password": "<user123>"
    "balance": "10000000000"
```
_Response (201)_
```
    {
        "id": "<id given by system>",
        "email": "user@admin.com",
        "username": "john",
        "balance": "1000000000",
        "updatedAt": "<contain updatedAt result register>",
        "createdAt": "<contain createdAt result register>"
    }
```
_Response (404)_
```
    {
        "message": "data not found"
    }
```

### GET /carts
_Request Header_
```
{
  "access_token": "<user access_token hashed>"
}
```

_Request Body_
```
    "<not_neeeded>"
```
_Response (200)_
```
[
  {
    "id": 1,
    "name": "<product name>",
    "description": "<product description>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<product name>",
    "description": "<product description>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }, ...
]
```
_Response (400)_
```
{
  "message": "Bad Request"
}
```

### GET /carts/:id
_Request Header_
```
{
  "access_token": "<user access_token hashed>"
}
```

_Request Body_
```
    "ProductId": req.body.ProductId,
    "UserId": req.body.UserId
```
_Response (200)_
```
  {
    "id": 1,
    "name": "<product name>",
    "description": "<product description>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }

```
_Response (400)_
```
{
  "message": "Bad Request"
}
```

### POST /carts
_Request Header_
```
{
  "access_token": "<user access_token hashed>"
}
```

_Request Body_
```
    "ProductId": req.body.ProductId,
    "UserId": req.body.UserId
```
_Response (200)_
```
  {
    "id": 1,
    "name": "<product name>",
    "description": "<product description>",
    "image_url": "<url_img>",
    "price": "<product price>",
    "stock": "<product stock>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }

```
_Response (400)_
```
{
  "message": "Bad Request"
}
```
### delete /carts/:id
_Request Header_
```
{
  "access_token": "<user access_token hashed>"
}
```

_Request Body_
```
    "id": req.params.id
```
_Response (200)_
```
  {
    "message": "Cart deleted with UserId 1"
  }

```
_Response (400)_
```
{
  "message": "Bad Request"
}
```