# e-commerce
My e-commerce App is an application to sell product with E-commerce Stores. This app has : 
* RESTful endpoint for Product's CRUD operation
* RESTful endpoint for User Login & Register Operation
* RESTful endpoint for Add Cart and Checkout Operation
* JSON formatted response
* Technology includes: 
    - Express Js (Node JS Framework), 
    - Object-relation Mapping: Sequelize, 
    - Database: Postgres, 
    - Token Signing/Verification: Json Web Token, 
    - Password Encryption: Bcrypt

&nbsp;

## RESTful endpoints

### Global Endpoints
_Response (401 - Unauthorized)_
```
{
  "message": "User not authenticated to do the actions"
}
```
_Response (500 - Error)_
```
{
  "message": "Server internal error"
}
```

---
### GET /products
> Get all products

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": <show id data>,
    "name": "<show name data>",
    "image_url": "<show image_url data>",
    "price": "<show price data>",
    "stock": "<show stock data>",
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>",
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### GET /products/:id
> Get product base on requested id.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Params_
```
{
  "id": "<integer>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": <show id by requested id>,
    "name": "<show name by requested id>",
    "image_url": "<show image_url by requested id>",
    "price": "<show price by requested id>",
    "stock": "<show stock by requested id>",
    "createdAt": "<show createdAt by requested id>",
    "updatedAt": "<show updatedAt by requested id>",
}
```

_Response (404 - Not Found)_
```
{
  "message": "product not found"
}
```

---
### POST /products
> Create new product

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
{
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "value is required"
}
```

---
### PUT /products/:id
> Get product base on requested id.

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Params_
```
{
  "id": "<integer>"
}
```

_Request Body_
```
{
    "name": "<name to get insert into>",
    "image_url": "<image_url to get insert into>",
    "price": "<price to get insert into>",
    "stock": "<stock to get insert into>",
}
```

_Response (200)_
```
{
    "id": <id to get update into>,
    "name": "<name to get update into>",
    "image_url": "<image_url to get update into>",
    "price": "<price to get update into>",
    "stock": "<stock to get update into>",
    "createdAt": "<createdAt to get update into>",
    "updatedAt": "<updatedAt to get update into>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "value is required"
}
```

_Response (404 - Bad Request)_
```
{
  "message": "Data not foud"
}
```

---
### DELETE /products/:id
> Delete product with selected id

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Request Parameter_
```
  "id": "<selected product id>"
```

_Response (200)_
```

{
    "id": <contain id that deleted>,
    "name": "<contain name that deleted>",
    "image_url": "<contain image_url that deleted>",
    "price": "<contain price that deleted>",
    "stock": "<contain stock that deleted>",
    "createdAt": "<contain createdAt that deleted>",
    "updatedAt": "<contain updatedAt that deleted>",
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

### GET /carts
> Get all product on cart 

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": "<show cart id>",
    "UserId": "<show user id>",
    "ProductId": "<show product id>",
    "checkout: "<show checkout boolean data>",
    "quantity: "<show quantity data>",
    "User": {
              "id": "<show user's id>",
              "email": "<show user's email>",
              "password": "<show user's encrypted password>",
              "role": "<show user's role>",
              "createdAt": "<show user's created date>",
              "updatedAt": "<show user's updated date>"
            },
    "Product": {
              "id": "<show product's id>",
              "name": "<show product's name>",
              "image_url": "<show product's image_url>",
              "price": "<show product's price>",
              "stock": "<show product's stock>",
              "createdAt": "<show product's createdAt>",
              "updatedAt": "<show product's updatedAtd>"
              },         
    "createdAt": "<show createdAt data>",
    "updatedAt": "<show updatedAt data>"
  }
]
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /carts
> Create new carts item,

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Body_
```
{
  "ProductId": "<ProductId to get insert into>",
  "UserId": "<UserId to get insert into, get from access_token>",
}
```

_Response (201)_
```
{
  "id": <given id by system>,
  "ProductId": "<show ProductId data>",
  "UserId": "<show UserId data>",
  "checkout: "<show checkout boolean data>",
  "quantity: "<show quantity data>",
  "createdAt": "<show createdAt data>",
  "updatedAt": "<show updatedAt data>"
}
```

_Response (400 - Bad Request)_
```
{
  "message" : "ProductId cannot be empty"
}
```


### PUT /carts
> Update carts base on user id

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Parameter_
```
not needed
```

_Request Body_
```
{
  "ProductId": "<show ProductId data>",
  "UserId": "<show UserId data>",
  "checkout: "<show checkout boolean data>",
  "quantity: "<show quantity data>",
}
```

_Response (200)_
```
[
  {
    "id": <show id by system>,
    "ProductId": "<show ProductId data>",
    "UserId": "<show UserId data>",
    "checkout: "<show checkout boolean data>",
    "quantity: "<show quantity data>",
    "createdAt": "<createdAt to get update into>",
    "updatedAt": "<updatedAt to get update into>"
  }
]
```

### DELETE /carts/:cartId
> Delete carts base on selected cart id

_Request Header_
```
{
  "access_token": "<access_token>"
}
```

_Request Parameter_
```
  "id": "<integer>"
```

_Response (200)_
```
{
  "id": <show id by system>,
  "ProductId": "<show ProductId data>",
  "UserId": "<show UserId data>",
  "checkout: "<show checkout boolean data>",
  "quantity: "<show quantity data>",
  "createdAt": "<createdAt to get update into>",
  "updatedAt": "<updatedAt to get update into>"
}
  
```

---
### POST /login
> Login Admin

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get login>",
  "password": "<password to get login>"
}
```

_Response (200)_
```
{
  "access_token": "<access_token>"
  "id": "<user id>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "value is required"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

----
### POST /loginCust
> Login Customer

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get login>",
  "password": "<password to get login>"
}
```

_Response (200)_
```
{
  "access_token": "<access_token>",
  "id": "<user id>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "value is required"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```

---
### POST /registerCust
> Register Customer

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get register>",
  "password": "<password to get register>"
}
```

_Response (201)_
```
{
  "id": "<show id auto generate from database>",
  "email": "<show email which registered>",
  "password": "<show encrypted password which registered>",
  "role": "<registered default as user>",
  "createdAt": "<show created date>",
  "updatedAt": "<show updated date>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "value is required"
}
```
