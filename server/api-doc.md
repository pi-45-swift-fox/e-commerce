# E-Commerce-cms


List of available endpoints:
​
- `POST /login`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`


### POST /login

Request:

- data:

```json
{
  "email": "admin@mail.com",
  "password": "1234"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5NzgxMTM1Nn0.5sgqvhWpctOV6q2NK7dxBA5RCS8BF2aH4-TEgGQikbI"
}
```

- status 400

```json
{
    "message": [
        "Invalid password or email"
    ]
}
```

### GET /products

Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5NzgxMTM1Nn0.5sgqvhWpctOV6q2NK7dxBA5RCS8BF2aH4-TEgGQikbI"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "products": [
        {
            "id": 1,
            "name": "Tas Chanel Classic 25 Lambskin SHW Semi Premium AL1112",
            "image_url": "https://cf.shopee.co.id/file/eceb3abc88b0b819cf8d6fa57d107469",
            "price": 395200,
            "stock": 5,
            "UserId": 1,
            "createdAt": "2020-08-19T04:44:04.035Z",
            "updatedAt": "2020-08-19T04:44:04.035Z"
        },
        ...
    ]
}
```

- status: 401

```json
{
    "message": [
        "Invalid password or email"
    ]
}
```

### GET /products/:id

Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5NzgxMTM1Nn0.5sgqvhWpctOV6q2NK7dxBA5RCS8BF2aH4-TEgGQikbI"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "product": {
        "id": 2,
        "name": "Tas Chanel Classic 25 Lambskin SHW Semi Premium AL1112",
        "image_url": "https://cf.shopee.co.id/file/eceb3abc88b0b819cf8d6fa57d107469",
        "price": 395200,
        "stock": 5,
        "UserId": 1,
        "createdAt": "2020-08-19T14:19:25.913Z",
        "updatedAt": "2020-08-19T14:19:25.913Z"
    }
}
```

- status: 401

```json
{
    "message": [
        "Invalid password or email"
    ]
}
```

### POST /products

Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5NzgxMTM1Nn0.5sgqvhWpctOV6q2NK7dxBA5RCS8BF2aH4-TEgGQikbI"
}
```

- body:

```json
{
    "name": "Tas Chanel Classic 25 Lambskin SHW Semi Premium AL1112",
    "image_url": "https://cf.shopee.co.id/file/eceb3abc88b0b819cf8d6fa57d107469",
    "price": 395200,
    "stock": 5
}
```

Response:

- status: 201
- body:
  ​

```json
{
    "id": 1,
    "name": "Tas Chanel Classic 25 Lambskin SHW Semi Premium AL1112",
    "price": 395200,
    "stock": 5
}
```

- status: 400

```json
{
    "message": [
        "Please input name of product",
        "Please input image link of product",
        "Please input price of product",
        "Please input number only",
        "Please input stock of product",
        "Please input number only"
    ]
}
```

- status: 401

```json
{
    "message": [
        "Invalid password or email"
    ]
}
```

### PUT /products/:id

Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5NzgxMTM1Nn0.5sgqvhWpctOV6q2NK7dxBA5RCS8BF2aH4-TEgGQikbI"
}
```

- body:

```json
{
    "name": "Daster Arab Laura by Syeema",
    "image_url": "https://cf.shopee.co.id/file/a8db602e1d47f50f047cdf5ba87222aa",
    "price": 11000,
    "stock" : 10
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "message": [
        "Successfully update"
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
        "Please input name of product",
        "Please input image link of product",
        "Please input price of product",
        "Please input number only",
        "Please input stock of product",
        "Please input number only"
    ]
}
```

- status: 401

```json
{
    "message": [
        "Invalid password or email"
    ]
}
```

### DELETE /products/:id

Request:

- headers:

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5NzgxMTM1Nn0.5sgqvhWpctOV6q2NK7dxBA5RCS8BF2aH4-TEgGQikbI"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "message": [
        "Successfully deleted"
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

- status: 401

```json
{
    "message": [
        "Invalid password or email"
    ]
}
```