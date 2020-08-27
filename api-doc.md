# E-COOMERCE-CMS APPS

​
List of available endpoints:
​
- `POST /login`
- `POST /products`
- `GET /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /:UserId`
- `GET /:UserId`
- `PUT /:UserId/:ProductId`
- `DELETE /:UserId/:ProductId`


### POST /login
​
- Request Header
    Not required.
​
- Request Body
```json
    {
        "email": "admin@mail.com",
        "password": "1234"
    }
```
​
- Response 200: OK
```json
    {
        "token": "<token>"
    }
```
​
- Response 400: Bad Request
```json
    {
        "msg": "email or password is incorrect!"
    }
```
​
- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```
​
​
### POST /products
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
```json
    {
        "name": "allmight",
        "image_url": "https://www.actionfigurezone.id/wp-content/uploads/2019/06/My-Hero-Academia-Age-of-Heroes-All-Might-2.jpg",
        "price": 20000,
        "stock": 10
    }
```
​
- Response 200: OK
```json
    {
        "id": 14,
        "name": "allmight",
        "image_url": "https://www.actionfigurezone.id/wp-content/uploads/2019/06/My-Hero-Academia-Age-of-Heroes-All-Might-2.jpg",
        "price": 20000,
        "stock": 10,
        "updatedAt": "2020-08-23T02:43:20.068Z",
        "createdAt": "2020-08-23T02:43:20.068Z"
    }
```

- Response 400: Bad Request
```json
    {
        "msg": "msg": "Name can't be empty,Price minimum 1,Stock minimum 1"
    }
```

- Response 401: Not Authorized
```json
    {
        "msg": "Not Authorized"
    }
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### GET /products
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
    no needed
​
- Response 200: OK
```json
[
    {
        "id": 14,
        "name": "allmight",
        "image_url": "https://www.actionfigurezone.id/wp-content/uploads/2019/06/My-Hero-Academia-Age-of-Heroes-All-Might-2.jpg",
        "price": 20000,
        "stock": 10,
        "createdAt": "2020-08-23T02:43:20.068Z",
        "updatedAt": "2020-08-23T02:43:20.068Z"
    }
]
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### PUT /products/:id
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
```json
    {
        "name": "wonderwoman",
        "image_url": "https://www.actionfigurezone.id/wp-content/uploads/2019/06/My-Hero-Academia-Age-of-Heroes-All-Might-2.jpg",
        "price": 20000,
        "stock": 10
    }
```
​
- Response 200: OK
```json
    {
        "msg": "product update"
    }
```

- Response 400: Bad Request
```json
    {
        "msg": "msg": "Name can't be empty,Price minimum 1,Stock minimum 1"
    }
```

- Response 401: Not Authorized
```json
    {
        "msg": "Not Authorized"
    }
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### DELETE /products/:id
​
- Request Header
```json
    {
        "accesstoken":"<access token>"
    }
```
- Request Body
    no needed
​
- Response 200: OK
```json
    {
        "msg": "product delete"
    }
```

- Response 401: Not Authorized
```json
    {
        "msg": "Not Authorized"
    }
```

- Response 500: Internal server error
```json
    {
        type: "Internal Server Error", <show error>
    }
```

### POST /registerCust
> Register new account

_Request Body_
```json
{
    "email": "<your email>",
    "password": "<your password>",
}
```
- Response 200: OK
```
{
    "token": "<token>"
    "UserId": "<userid>"
}
```

### POST /:UserId

_Request Header_
```json
{
    "accesstoken": "<your token>"
}
```
_Request Body_
```json
{
    "quantity": "7",
    "ProductId": "2",
}
```
_Response (201 - Created)_
```json
{
    "ProductId": 1,
    "UserId": 2,
    "quantity": 4,
    "status": false,
    "createdAt": "2020-08-26T11:08:49.001Z",
    "updatedAt": "2020-08-26T11:08:49.001Z",
    "Product": {
        "id": 1,
        "name": "Ghost Rider",
        "image_url": "https://www.actionfigurezone.id/wp-content/uploads/2018/03/COSBABY-GHOST-RIDER-WITH-HELLFIRE-CHAIN-510x747.jpeg",
        "price": 20000,
        "stock": 10,
        "createdAt": "2020-08-22T16:09:35.604Z",
        "updatedAt": "2020-08-23T00:00:27.594Z"
    }
}
```

---
### GET /:UserId
> Show all product in cart based on Customer Id

_Request Header_
```json
{
    "access": "<your token>"
}
```
_Response (200 - Ok)_
```json
[
    {
        "ProductId": 1,
        "UserId": 2,
        "quantity": 4,
        "status": false,
        "createdAt": "2020-08-26T11:08:49.001Z",
        "updatedAt": "2020-08-26T11:08:49.001Z",
        "Product": {
            "id": 1,
            "name": "Ghost Rider",
            "image_url": "https://www.actionfigurezone.id/wp-content/uploads/2018/03/COSBABY-GHOST-RIDER-WITH-HELLFIRE-CHAIN-510x747.jpeg",
            "price": 20000,
            "stock": 10,
            "createdAt": "2020-08-22T16:09:35.604Z",
            "updatedAt": "2020-08-23T00:00:27.594Z"
        }
    }
]
```
---
### PUT /:UserId/:ProductId
> Edit product in cart based on ID

_Request Header_
```json
{
    "accesstoken": "<your token>"
}
```
_Request Body_
```json
{
    "quantity": "2"
}
```
_Response 200_
```json
{
    "ProductId": 1,
    "UserId": 2,
    "quantity": 4,
    "status": false,
    "createdAt": "2020-08-26T11:08:49.001Z",
    "updatedAt": "2020-08-26T11:08:49.001Z",
    "Product": {
        "id": 1,
        "name": "Ghost Rider",
        "image_url": "https://www.actionfigurezone.id/wp-content/uploads/2018/03/COSBABY-GHOST-RIDER-WITH-HELLFIRE-CHAIN-510x747.jpeg",
        "price": 20000,
        "stock": 10,
        "createdAt": "2020-08-22T16:09:35.604Z",
        "updatedAt": "2020-08-23T00:00:27.594Z"
    }
}

---

### PUT /:UserId/:ProductId
> Delete product in cart based on ID

_Request Header_
```json
{
    "accesstoken": "<your token>"
}
```
_Response (200 - oK)_
```json
{
    "message": "product successfully deleted"
}
```