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
        "token": "<token>"
    }
```
​
- Response 400
```json
    {
        "message": "invalid email or password"
    }
```
​
- Response 500
```json
    {
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
        "message": "internal server error"
    }
```

### GET /products
- Request Header
    Not required.
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
        "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/service/id/images/mens-fashion/price/8604/8604189/MF_HOT_SALE_Kemeja_arlan_navi_atasan_pria_hem_cwo_kemeja_lengan_panjang_1.jpg",
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

```
​
- Response 500
```json
    {
        "message": "internal server error"
    }
```

