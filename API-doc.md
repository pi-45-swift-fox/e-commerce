# E-COOMERCE

​
List of available endpoints:
​
- `POST /login`
- `POST /register`
- `GET /products`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /carts`
- `PATCH /carts/:id/qtyInc`
- `PATCH /carts/:id/qtyDec`
- `DELETE /carts/:id/:ProductId`

### POST /login​
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
- Response 200
```json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5ODUxMjQ2Nn0.723EFAd_xp6iFJ5BcLWobrbvAYgDZ_DZbB-BIaIjAyE"
    }
```
​
- Response 404
```json
    {
        "errorCode": "NOT_FOUND",
        "message": "invalid email or password"
    }
```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```

### POST /register
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
- Response 201
```json
    {
        "id": "1",
        "email": "admin@mail.com"
    }
```

```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```

### GET /products
- Request Header
`Not required`
​
- Response 200
```json
    [
        {
            "id": 6,
            "name": "sneakers puma scuderia",
            "image_url": "https://ncrsport.com/img/storage/large/306241%2002-1.jpg",
            "price": 1400000,
            "stock": 2,
            "createdAt": "2020-08-22T23:01:04.492Z",
            "updatedAt": "2020-08-22T23:01:04.492Z"
        },
        {
            "id": 3,
            "name": "kemeja pria",
            "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/service/id/images/mens-fashion/price/11051/11051191/MF_Redcliff_Kemeja_Pria_Lengan_Pendek_6B0168U_1.jpg",
            "price": 66000,
            "stock": 12,
            "createdAt": "2020-08-22T23:01:04.492Z",
            "updatedAt": "2020-08-22T23:01:04.492Z"
        },
        {
            "id": 4,
            "name": "kemeja navi",
            "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/service/id/images/mens-fashion/price/8604/8604189MF_HOT_SALE_Kemeja_arlan_navi_atasan_pria_hem_cwo_kemeja_lengan_panjang_1.jpg",
            "price": 65000,
            "stock": 3,
            "createdAt": "2020-08-22T23:01:04.492Z",
            "updatedAt": "2020-08-22T23:01:04.492Z"
        },
        {
            "id": 2,
            "name": "rey jaket touring",
            "image_url": "https://id-test-11.slatic.net/p/300ef6d577e35ae82e2c16b917aa418c.jpg_340x340q80.jpg_.webp",
            "price": 120000,
            "stock": 5,
            "createdAt": "2020-08-22T23:01:04.492Z",
            "updatedAt": "2020-08-22T23:01:04.492Z"
        }
    ]
```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```

### POST /products
- Request Header: "admin" role authorization
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5ODUxMjQ2Nn0.723EFAd_xp6iFJ5BcLWobrbvAYgDZ_DZbB-BIaIjAyE"
}
```
​
- Request Body
```json
    {
        "name": "rey jaket touring",
        "image_url": "https://id-test-11.slatic.net/p/300ef6d577e35ae82e2c16b917aa418c.jpg_340x340q80.jpg_.webp",
        "price": 120000,
        "stock": 5
    }
```
​
- Response 201
```json
    {
        "id": 2,
        "name": "rey jaket touring",
        "image_url": "https://id-test-11.slatic.net/p/300ef6d577e35ae82e2c16b917aa418c.jpg_340x340q80.jpg_.webp",
        "price": 120000,
        "stock": 5,
        "createdAt": "2020-08-22T23:01:04.492Z",
        "updatedAt": "2020-08-22T23:01:04.492Z"
    }
```

- Response 401
```json
    {
        "errorCode": "FORBIDDEN",
        "message": "authentication or authorization failed"
    }
```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```


### PUT /products/:id
- Request Header: "admin" role authorization
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5ODUxMjQ2Nn0.723EFAd_xp6iFJ5BcLWobrbvAYgDZ_DZbB-BIaIjAyE"
}
```

- Request Params
`:id = product.id`
​
- Request Body
```json
    {
        "name": "rey jaket touring",
        "image_url": "https://id-test-11.slatic.net/p/300ef6d577e35ae82e2c16b917aa418c.jpg_340x340q80.jpg_.webp",
        "price": 120000,
        "stock": 5
    }
```
​
- Response 201
```json
    {
        "id": 2,
        "name": "rey jaket touring",
        "image_url": "https://id-test-11.slatic.net/p/300ef6d577e35ae82e2c16b917aa418c.jpg_340x340q80.jpg_.webp",
        "price": 120000,
        "stock": 5,
        "createdAt": "2020-08-22T23:01:04.492Z",
        "updatedAt": "2020-08-22T23:01:04.492Z"
    }
```

- Response 401
```json
    {
        "errorCode": "FORBIDDEN",
        "message": "authentication or authorization failed"
    }
```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```

### DELETE /products/:id
- Request Header: "admin" role authorization
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5ODUxMjQ2Nn0.723EFAd_xp6iFJ5BcLWobrbvAYgDZ_DZbB-BIaIjAyE"
}
```

- Request Params
`:id = product.id`
​
- Response 200
```json
    {
        "message": "resource deleted successfully"
    }
```

- Response 401
```json
    {
        "errorCode": "FORBIDDEN",
        "message": "authentication or authorization failed"
    }
```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```

### POST /carts
- Request Header
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5ODUxMjQ2Nn0.723EFAd_xp6iFJ5BcLWobrbvAYgDZ_DZbB-BIaIjAyE"
}
```
​
- Request Body
```json
    {
        "ProductId": 1
    }
```
​
- Response 201
```json
    {
        "message": "successfully added to cart"
    }
```

- Response 401
```json
    {
        "errorCode": "FORBIDDEN",
        "message": "authentication or authorization failed"
    }
```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```

### GET /carts
- Request Header
```json
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5ODUxMjQ2Nn0.723EFAd_xp6iFJ5BcLWobrbvAYgDZ_DZbB-BIaIjAyE"
    }
```
​
- Response 200
```json
    [
        {
            "id": 34,
            "ProductId": 4,
            "UserId": 4,
            "quantity": 1,
            "status": false,
            "createdAt": "2020-08-27T05:12:49.941Z",
            "updatedAt": "2020-08-27T07:36:01.930Z",
            "User": {
                "id": 4,
                "email": "ismat@mail.com",
                "password": "$2a$10$bTSiotjmmFZ1Qv5NLyZp9.QYQVRbCJa64nkTI.VDRS./9.0a7Y2lu",
                "role": "user",
                "createdAt": "2020-08-26T05:29:27.670Z",
                "updatedAt": "2020-08-26T05:29:27.670Z"
            },
            "Product": {
                "id": 4,
                "name": "kemeja navi",
                "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/service/id/images/mens-fashion/price/8604/8604189/MF_HOT_SALE_Kemeja_arlan_navi_atasan_pria_hem_cwo_kemeja_lengan_panjang_1.jpg",
                "price": 65000,
                "stock": 3,
                "createdAt": "2020-08-22T23:01:04.492Z",
                "updatedAt": "2020-08-22T23:01:04.492Z"
            }
        },
        {
            "id": 29,
            "ProductId": 3,
            "UserId": 4,
            "quantity": 1,
            "status": false,
            "createdAt": "2020-08-27T05:08:08.506Z",
            "updatedAt": "2020-08-27T07:35:43.891Z",
            "User": {
                "id": 4,
                "email": "ismat@mail.com",
                "password": "$2a$10$bTSiotjmmFZ1Qv5NLyZp9.QYQVRbCJa64nkTI.VDRS./9.0a7Y2lu",
                "role": "user",
                "createdAt": "2020-08-26T05:29:27.670Z",
                "updatedAt": "2020-08-26T05:29:27.670Z"
            },
            "Product": {
                "id": 3,
                "name": "kemeja pria",
                "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/service/id/images/mens-fashion/price/11051/11051191/MF_Redcliff_Kemeja_Pria_Lengan_Pendek_6B0168U_1.jpg",
                "price": 66000,
                "stock": 12,
                "createdAt": "2020-08-22T23:01:04.492Z",
                "updatedAt": "2020-08-22T23:01:04.492Z"
            }
        }
    ]
```

​- Response 401
```json
    {
        "errorCode": "FORBIDDEN",
        "message": "authentication or authorization failed"
    }
```

- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```

### PATCH /carts/:id/qtyInc
- Request Header
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5ODUxMjQ2Nn0.723EFAd_xp6iFJ5BcLWobrbvAYgDZ_DZbB-BIaIjAyE"
}
```

- Request Params
`:id = cart.id`
​
- Request Body
```json
    {
        "ProductId": 1
    }
```

- Response 201
```json
    {
        "message": "successfully updated"
    }
```

- Response 401
```json
    {
        "errorCode": "FORBIDDEN",
        "message": "authentication or authorization failed"
    }
```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```

### PATCH /carts/:id/qtyDec
- Request Header
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5ODUxMjQ2Nn0.723EFAd_xp6iFJ5BcLWobrbvAYgDZ_DZbB-BIaIjAyE"
}
```

- Request Params
`:id = cart.id`
​
- Request Body
```json
    {
        "ProductId": 1
    }
```

- Response 201
```json
    {
        "message": "successfully updated"
    }
```

- Response 401
```json
    {
        "errorCode": "FORBIDDEN",
        "message": "authentication or authorization failed"
    }
```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```

### DELETE /carts/:id/:ProductId
- Request Header
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTU5ODUxMjQ2Nn0.723EFAd_xp6iFJ5BcLWobrbvAYgDZ_DZbB-BIaIjAyE"
}
```

- Request Params
`:id = cart.id`
`:ProductId = product.id`
​
- Response 200
```json
    {
        "message": "deleted succesfully"
    }
```

- Response 401
```json
    {
        "errorCode": "FORBIDDEN",
        "message": "authentication or authorization failed"
    }
```
​
- Response 500
```json
    {
        "errorCode": "INTERNAL_SERVER_ERROR",
        "message": "internal server error"
    }
```
