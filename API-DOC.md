
# ecommerce-cms
Membuat website untuk management content ecommerce ( dipakai oleh admin)

ecommerce-cms is an application to management content ecommerce. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response
* Technology Includes : 
    - Express Js(Node Js Framework)
    - Object-relation-mapping : Sequelize
    - Database: Postgres
    - Token Signing/verification: Json Web Token
    - Password Encryption: Bcrypt

## RESTful endpoints
### POST /register
### POST /login
### POST /products
### GET /products
### GET /products/:id
### PUT /products/:id
### DELETE /products/:id
### POST /carts
### GET /carts
### GET /carts/:id
### PUT /carts/:id
### DELETE /carts/:id
### POST /banners
### GET /banners
### PUT /banners/:id
### DELETE /banners/:id

Global endpoints

response(500 - Server Internal Error)
``` json 
{
    "message" : "Invalid Server"
}
```

response(403 - Authentication and Authorization)
``` json 
{
    "message" : "Not Authorized"
}
```
### POST /register
> Register User

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "email": "<admin email to get insert into>",
  "password": "<admin password to get insert into>"
}
```

Response :

Success: 

status : 201
``` json
{
  "message" : "User with email <email to get insert into> registered"
}

Failed :

status : 500
{
  "message": "Invalid Server"
}
```

### POST /login
> Login User

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "email": "<admin email to get insert into>",
  "password": "<admin password to get insert into>"
}
```

Response :

Success: 

status : 200
``` json
{
  "acces_token" : "jwttoken"
}

Failed :

status : 404
{
  "message": "Invalid Request"
}
```
### POST /products

> Create new products

_Request Header_
``` json
{
  "access_token" : "jwttoken"
}

_Request Body_
``` json
{
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock":"<stock to get insert into>",
  "category":"<category to get insert into>"
}
```

Response :

Success: 

status : 201
``` json

{
  "id": "<given id by system>",
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock":"<stock to get insert into>",
  "category":"<category to get insert into>",
  "createdAt": "<date>",
  "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```

### GET /products
> Get all products

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "not needed"
}
```

Response :

Success: 

status : 200
``` json
[
  {
    "id": "<given id by system>",
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock":"<stock to get insert into>",
    "category":"<category to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
  }, 
  ....
]

Failed :

status : 400 
``` json
{
  "message": "Invalid Request"
}
```
### GET /products/:id
> Get one product

_Request Params_
``` json
{
  "id" : "<selected id by params>"
}
```

_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```

_Request Body_
``` json
{
  "not needed"
}
```

Response :

Success: 

status : 200
``` json
{
  "id": "<given id by system>",
  "name": "<name to get insert into>",
  "image_url": "<image_url to get insert into>",
  "price": "<price to get insert into>",
  "stock":"<stock to get insert into>",
  "category":"<category to get insert into>",
  "createdAt": "<date>",
  "updatedAt": "<date>",
}

Failed :

status : 500 
``` json
{
  "message": "Invalid Server"
}
```

### PUT /products/:id

> Update or replace a product by id

_Request Params_
``` json
{
  "id" : "<selected id by params>"
}
```

_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```

_Request Body_
``` json
{
    "id" : "<given id by selected>",
    "name": "<title to get insert into>",
    "image_url": "<category to get insert into>",
    "price": "<price to get insert into>",
    "stock":"<price to get insert into>",
}
```

Response :

Success: 

status : 201
``` json
{
    "id": "<given id by system>",
    "name": "<title to get insert into>",
    "image_url": "<category to get insert into>",
    "price": "<price to get insert into>",
    "stock":"<price to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```
### DELETE /products/:id

> Delete a product by id

_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```
_Request params_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 200
``` json
{
  "message": "Sukses Delete"
}

Failed :
status : 401
``` json 

status : 404
{
  "message": "Error Not Found"
}
```

### POST /carts

> Create new carts

_Request Header_
``` json
{
  "access_token" : "jwttoken"
}

_Request Body_
``` json
{
  "UserId": "<UserId get from user login>",
  "ProductId": "<ProductId get from id selected>",
  "quantity": "<quantity to get insert into>",
  "status":"<status to get insert into>"
}
```

Response :

Success: 

status : 201
``` json

{
  "id": "<given id by system>",
  "UserId": "<UserId get from user login>",
  "ProductId": "<ProductId get from id selected>",
  "quantity": "<quantity to get insert into>",
  "status":"<status to get insert into>",
  "createdAt": "<date>",
  "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```

### GET /carts
> Get all carts

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "not needed"
}
```

Response :

Success: 

status : 200
``` json
[
 {
    "id": "<given id by system>",
    "UserId": "<UserId get from user login>",
    "ProductId": "<integer>",
    "quantity": "<quantity to get insert into>",
    "status": "<status to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
    "Product": {
        "id": "id from relation",
        "name": "name from relation",
        "image_url": "name from relation",
        "price": "price from relation",
        "stock": "stock from relation",
        "category": "category from relation"
      }
    }, 
  ....
]

Failed :

status : 400 
``` json
{
  "message": "Invalid Request"
}
```
### GET /carts/:id
> Get one cart

_Request Params_
``` json
{
  "id" : "<selected id by params>"
}
```

_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```

_Request Body_
``` json
{
  "not needed"
}
```

Response :

Success: 

status : 200
``` json
{
  "id": "<given id by system>",
  "UserId": "<UserId get from user login>",
  "ProductId": "<integer>",
  "quantity": "<quantity to get insert into>",
  "status": "<status to get insert into>",
  "createdAt": "<date>",
  "updatedAt": "<date>",
  "Product": {
      "id": "id from relation",
      "name": "name from relation",
      "image_url": "name from relation",
      "price": "price from relation",
      "stock": "stock from relation",
      "category": "category from relation"
  }
}
Failed :

status : 500 
``` json
{
  "message": "Invalid Server"
}
```

### PUT /carts/:id

> Update or replace a cart by id

_Request Params_
``` json
{
  "id" : "<selected id by params>"
}
```

_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```

_Request Body_
``` json
{
  "UserId": "<UserId get from user login>",
  "ProductId": "<ProductId get from id selected>",
  "quantity": "<quantity to get insert into>",
  "status":"<status to get insert into>",
}
```

Response :

Success: 

status : 200
``` json
{
    "message": "berhasil update"
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```
### DELETE /carts/:id

> Delete a cart by id

_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```
_Request params_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 200
``` json
{
  "message": "Sukses Delete"
}

Failed :
status : 401
``` json 

status : 404
{
  "message": "Error Not Found"
}
```
### POST /banners

> Create new banners

_Request Header_
``` json
{
  "access_token" : "jwttoken"
}

_Request Body_
``` json
{
  "title": "<title to get insert into>",
  "image_url": "<image_url to get insert into>",
  "status": "<status to get insert into>"
}
```

Response :

Success: 

status : 201
``` json

{
  "id": "<given id by system>",
  "title": "<title to get insert into>",
  "image_url": "<image_url to get insert into>",
  "status": "<status to get insert into>",
  "createdAt": "<date>",
  "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```

### GET /banners
> Get all banners

_Request Header_
``` json
{
  "not needed"
}
```

_Request Body_
``` json
{
  "not needed"
}
```

Response :

Success: 

status : 200
``` json
[
  {
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "image_url": "<image_url to get insert into>",
    "status": "<status to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
  }, 
  ....
]

Failed :

status : 400 
``` json
{
  "message": "Invalid Request"
}
```

### PUT /banners/:id

> Update or replace a banner by id

_Request Params_
``` json
{
  "id" : "<selected id by params>"
}
```

_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```

_Request Body_
``` json
{
  "title": "<title to get insert into>",
  "image_url": "<image_url to get insert into>",
  "status": "<status to get insert into>"
}
```

Response :

Success: 

status : 201
``` json
{
    "id": "<given id by system>",
    "title": "<title to get insert into>",
    "image_url": "<image_url to get insert into>",
    "status": "<status to get insert into>",
    "createdAt": "<date>",
    "updatedAt": "<date>",
}

Failed :

status : 400 
{
  "message": "Invalid Request"
}
```
### DELETE /banners/:id

> Delete a banner by id

_Request Header_
``` json
{
  "acces_token" : "jwttoken"
}
```
_Request params_
```json
{
  "id" : "+req.params.id"
}


Response :

Success: 

status : 200
``` json
{
  "message": "Sukses Delete"
}

Failed :
status : 401
``` json 

status : 404
{
  "message": "Error Not Found"
}
```




