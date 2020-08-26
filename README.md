# e-commerce
Membuat platform untuk e-commerce

# Guide
## Endpoints V1 (CMS)
### POST `/login`
##### Mendapatkan akses (token) user dalam database

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    "email": "Input email user",
    "password": "Input password user"
>

#### Response (200)
>
    "token": "Token User untuk access ke server"
 >
 
#### Response (401)
>
    "msg": "Incorrect email/password"
>

### GET `/products`
##### Mendapatkan seluruh products dalam database

#### Request Headers
>
    _Tidak diperlukan_
>

#### Request Body
>
    _Tidak diperlukan_
>

#### Response (200)
>
    "products": "{[ name, image_url, price, stock ]}"
 >
 
#### Response (500)
>
    "msg": "Internal server error"
>

### POST `/products`
##### Menambahkan product baru ke database (access level: admin)

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "name": "Product title",
    "image_url": "Product image",
    "price": "Product price",
    "stock": "Product stock"
>

#### Response (201)
>
    "id": "Task serialized ID",
    "name": "Product title",
    "image_url": "Product image",
    "price": "Product price",
    "stock": "Product stock",
    "createdAt": "Current Date",
    "updatedAt": "Current Date"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (403)
>
    "msg": "Access denied"
>

### PUT `/products/id`
##### Mengedit product di database

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "name": "Product title",
    "image_url": "Product image",
    "price": "Product price",
    "stock": "Product stock"
>

#### Response (201)
>
    "msg": "OK"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (403)
>
    "msg": "Access denied"
>

#### Response (404)
>
    "msg": "Product tidak ditemukan"
>

### DELETE `/products/id`
##### Menghapus product di database

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    _Tidak Perlu_
>

#### Response (200)
>
    "msg": "OK"
>

#### Response (403)
>
    "msg": "Access denied"
>

## Endpoint V2 (Cart)

### GET `/cart`
##### Mendapatkan cart user dalam database

#### Request Headers
>
    "access_token": "User token from client"
>

#### Request Body
>
    _Tidak diperlukan_
>

#### Response (200)
>
    "cart": "{[ UserId, ProductId, quantity, status, Product ]}"
>

#### Response (403)
>
    "msg": "access denied"
>
#### Response (500)
>
    "msg": "Internal server error"
>

### POST `/cart/id`
##### Menambahkan cart baru ke database

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "quantity": "Banyak Product yang ingin dibeli",
>

#### Response (201)
>
    "msg": "ok"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (403)
>
    "msg": "Access denied"
>

### PATCH `/cart/id`
##### Mengedit cart di database

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    "quantity": "Banyak produk yang ingin dibeli"
>

#### Response (201)
>
    "msg": "OK"
>

#### Response (400)
>
    "msg": "Terjadi kesalahan input"
>

#### Response (403)
>
    "msg": "Access denied"
>

#### Response (404)
>
    "msg": "Cart tidak ditemukan"
>

### DELETE `/cart/id`
##### Menghapus product di database

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Request Body
>
    _Tidak Perlu_
>

#### Response (200)
>
    "msg": "OK"
>

#### Response (403)
>
    "msg": "Access denied"
>

### GET `/cart/buy`
##### Membeli seluruh produk seseuai isi keranjang user

#### Request Headers
>
    "access_token": "Token provided dari client"
>

#### Response (200)
>
    "msg": "OK"
>

#### Response (400)
>
    "msg": "error quantity ammount"
>

#### Response (403)
>
    "msg": "Access denied"
>