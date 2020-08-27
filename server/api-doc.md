# API DOCUMENTATION

## **USER**

### POST /register

#### request
- body
```
{
  "email":"abdullah@mail.com,
  "password":"12345"
}
```
#### response 201


- json
```
{
  "msg":" anda berhasil register"
}
```
#### response 500
- json
```

{
  "msg":"internal server error"
}
```
### POST /login

#### request

- body  

```
{
  "email":"abdullah@mail.com,
  "password":"12345"
}
```
#### response 200
- json
```
{
  "msg":" anda berhasil login",
  access_token: token
}
```
#### response 400

```json
{
  "msg":"email or password incorrect"
}
```
#### response 500
- json
```json

{
  "msg":"internal server error"
}
```