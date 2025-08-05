<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


## Execute in development
1. Clone repo
2. Execute 
```
yarn install
```
3. Install Nest CLI
```
npm i -g @nestjs/cli
```
4. Up DB
```
docker-compose up -d
```

5. Clone file ```.env.example``` and rename to ```.env```

6. fill in the environment variables in ```.env``` file

7. run the app i dev mode:
```
yarn start:dev
```

8. Seed DB with SEED
```
http://localhost:3000/api/v2/seed
```

## Stack used
* MongoDB
* NestJS

# Production Build
1. create ```.env.prod``` file
2. fill environment prod variable
3. create new image
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```