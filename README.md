## Description

Base structure for nest js api with authentication.
I will update this project for more features like authorization , file upload etc.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Reference

- https://github.com/mguay22/nestjs-typeorm/tree/main/src/database
- https://www.youtube.com/watch?v=9MGKKJTwicM
- https://github.com/zenstok/nestjs-auth-refresh-token-example/tree/main

## After Installation 
- Rename .env.example to .env
- Update .env
- Go to src/Modules/admin/admin.controller.ts
- Add @Public() decorator for create() function. It will ignore authentication.
- Once you create an admin/user undo the change


## License

Nest is [MIT licensed](LICENSE).
