# E-Commerce-cms
List of available endpoints:
- `POST /login`
- `POST /loginUser`
- `POST /register`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /cart`
- `PUT /cart`
- `POST /cart/product/:id`
- `DELETE /cart/:id`
- `PATCH /cart/:id/quantity`
- `PATCH /cart/:id/status`


### POST /login (for Admin)
Request:

- data:

```json
{
  "email": "admin@hot.id",
  "password": "1234"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 1,
    "email": "admin@hot.id",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBob3QuaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTg1ODY5MDR9.elYjBLsmI-UkmnBJKI5GMgD4G5QHOJN7ivg0yxy6e38"
}
```

- status 401

```json
{
    "message": [
        "Incorrect Username or Password"
    ]
}
```

### POST /loginUser (for User)
Request:
- data:

```json
{
  "email": "grace@hot.id",
  "password": "123"
}
```

Response:
- status: 200
- body:

```json
{
    "id": 2,
    "email": "grace@hot.id",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJncmFjZUBob3QuaWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTU5ODU4Njk2NX0.CAkULBH3lzffLQIv9YW4xka-xY-QlDsZo0h7p4F7jl4"
}
```

- status 400

```json
{
    "message": [
        "Incorrect Username or Password"
    ]
}
```

### POST /register
Request:
- data:

```json
{
  "email": "user@mail.com",
  "password": "1234"
}
```

Response:

- status: 201
- body:
```json
{
    "email": "firaz@hot.id",
    "message": "Success Register"
}
```

- status 400

```json
{
    "message": [
        "Email already registered"
    ]
}
```

### GET /products
Request:

- headers:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJncmFjZUBob3QuaWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTU5ODUzNTkwNn0.7x_-RPAB06ulj-LwlgVwukxobMlpdpypvYwOEhA6vgY"
}
```

Response:

- status: 200
- body:

```json
{
    "products": [
        {
            "id": 1,
            "name": "Burger",
            "image_url": "https://img5.goodfon.com/wallpaper/nbig/1/3e/gamburger-burger-mcdonald-s-perets.jpg",
            "price": 10000,
            "stock": 5,
            "createdAt": "2020-08-28T04:05:58.044Z",
            "updatedAt": "2020-08-28T04:05:58.044Z"
            },
        ...
    ]
}

```

### POST /products
Request:
- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBob3QuaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTg1ODc3ODd9.nFRPX3KL0DmSkBOZyrFttsrVmc3isSHgZJHOwg9wEd4"
}
```

- body:

```json
{
    "name": "ARCTIS PRO WIRELESS",
    "image_url": "https://media.steelseriescdn.com/thumbs/filer_public/27/06/27063048-18a7-4f3d-b203-1bbb6f0b4d49/buyimg-arctispro-wireless_white_001.jpg__1850x800_q100_crop-scale_optimize_subsampling-2.jpg",
    "price": 10000,
    "stock": 5
}
```

Response:

- status: 201
- body:

```json
{
    "newData": {
        "id": 12,
        "name": "ARCTIS PRO WIRELESS",
        "image_url": "https://media.steelseriescdn.com/thumbs/filer_public/27/06/27063048-18a7-4f3d-b203-1bbb6f0b4d49/buyimg-arctispro-wireless_white_001.jpg__1850x800_q100_crop-scale_optimize_subsampling-2.jpg",
        "price": 1216000,
        "stock": 123,
        "updatedAt": "2020-08-28T04:13:33.247Z",
        "createdAt": "2020-08-28T04:13:33.247Z"
    }
}
```

- status: 400

```json
{
    "message": [
        "Product.name cannot be null",
        "Product.image_url cannot be null",
        "Product.price cannot be null",
        "Product.stock cannot be null"
    ]
}

```
- status: 401
```json
{
    "message": [
        "Incorrect Username or Password"
    ]
}
```
### PUT /products/:id
Request:
- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBob3QuaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTg1ODc3ODd9.nFRPX3KL0DmSkBOZyrFttsrVmc3isSHgZJHOwg9wEd4"
}

```

- body:

```json
{
    "name": "ARCTIS PRO WIRELESS",
    "image_url": "https://media.steelseriescdn.com/thumbs/filer_public/27/06/27063048-18a7-4f3d-b203-1bbb6f0b4d49/buyimg-arctispro-wireless_white_001.jpg__1850x800_q100_crop-scale_optimize_subsampling-2.jpg",
    "price": 10000,
    "stock": 5
}
```

Response:
- status: 200
- body:

```json
{
    "data": [
        {
            "id": 1,
            "name": "ARCTIS PRO WIRELESS",
            "image_url": "https://media.steelseriescdn.com/thumbs/filer_public/27/06/27063048-18a7-4f3d-b203-1bbb6f0b4d49/buyimg-arctispro-wireless_white_001.jpg__1850x800_q100_crop-scale_optimize_subsampling-2.jpg",
            "price": 1216000,
            "stock": 123,
            "createdAt": "2020-08-28T04:05:58.044Z",
            "updatedAt": "2020-08-28T04:15:21.193Z"
        }
    ]
}
```

- status: 404
```json
{
    "message": [
        "Data not Found"
    ]
}
```

- status: 400
```json
{
    "message": [
        "Product name must be filled",
        "Image URL must be filled",
        "Price must be filled",
        "Input price must be a number",
        "Stock must be filled",
        "Input stock must be a number"
    ]
}
```

- status: 401

```json
{
    "message": [
        "Incorrect Username or Password"
    ]
}
```

### DELETE /products/:id
Request:
- headers:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBob3QuaWQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTg1ODc3ODd9.nFRPX3KL0DmSkBOZyrFttsrVmc3isSHgZJHOwg9wEd4"
}
```

Response:
- status: 200
- body:

```json
{
    "Message": "Data has been destroyed"
}
```

- status: 404
```json
{
    "message": [
        "Data not Found"
    ]
}
```

- status: 401

```json
{
    "message": [
        "Incorrect Username or Password"
    ]
}
```

### GET /cart
Request:
- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmaXJhekBob3QuaWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTU5ODU4ODM2Mn0.k77rWdF5NTDsYyu-Jxin1AESJBpXP2lEHKya-_XaQiw"
}
```

Response:
- status: 200
- body:

```json
[
    {
        "id": 1,
        "ProductId": 12,
        "UserId": 3,
        "quantity": 5,
        "status": "Wishlist",
        "createdAt": "2020-08-28T04:21:44.295Z",
        "updatedAt": "2020-08-28T04:21:44.295Z",
        "User": {
            "id": 3,
            "email": "firaz@hot.id",
            "password": "$2b$05$PX0r00aJVFsCEWZCEcOMaO4HE0MVJsjZH.ANe5GN5amAC/PofkDZe",
            "role": "user",
            "createdAt": "2020-08-28T04:05:58.057Z",
            "updatedAt": "2020-08-28T04:05:58.057Z"
        },
        "Product": {
            "id": 12,
            "name": "ARCTIS PRO WIRELESS",
            "image_url": "https://media.steelseriescdn.com/thumbs/filer_public/27/06/27063048-18a7-4f3d-b203-1bbb6f0b4d49/buyimg-arctispro-wireless_white_001.jpg__1850x800_q100_crop-scale_optimize_subsampling-2.jpg",
            "price": 1216000,
            "stock": 123,
            "createdAt": "2020-08-28T04:13:33.247Z",
            "updatedAt": "2020-08-28T04:13:33.247Z"
        }
    }...
]
```

- status: 401

```json
{
    "message": [
        "Incorrect Username or Password"
    ]
}
```
### PUT /cart
Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmaXJhekBob3QuaWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTU5ODU4ODM2Mn0.k77rWdF5NTDsYyu-Jxin1AESJBpXP2lEHKya-_XaQiw"
}
```

Response:

- status: 200
- body:

```json
{
    "message": "Succesfully update cart"
}
```

- status: 401
```json
{
    "message": [
        "Incorrect Username or Password"
    ]
}
```

### POST /cart
Request:
- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmaXJhekBob3QuaWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTU5ODU4ODc4M30.c2g4OpT0gNy-3Y3PmK0P75UTyGFAt_ZogXOuIM4BLzY"
}
```

Response:
- status: 201
- body:

```json
{
    "id": 6,
    "UserId": 3,
    "ProductId": 5,
    "status": "Wishlist",
    "quantity": 1,
    "updatedAt": "2020-08-28T04:35:21.339Z",
    "createdAt": "2020-08-28T04:35:21.339Z"
}
```

### DELETE /cart/:id
Request:
- headers:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJmaXJhekBob3QuaWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTU5ODU4ODc4M30.c2g4OpT0gNy-3Y3PmK0P75UTyGFAt_ZogXOuIM4BLzY"
}
```

Response:
- status: 200
- body:
```json
{
    "Message": "Success delete data"
}
```