# CRUD-API

1. Git clone https://github.com/psycho0sis/CRUD-API.git
2. Switch to the branch `crud-api`

To run app in develop mode - `npm run start:dev`

To build the app - `npm run start:prod`

To run tests - `npm run test`



If you want to check how the server works use `Postman`

**API**

*GET* - `api/users` - you could get all users
*GET* - `api/users${id}` - you could get certain user
*POST* - `api/users` + body - you could post user to database
*DELETE* - `api/users${id}` - you could delete certain user from database
*PUT* - `api/users${id}` + body - you could update certain user in database