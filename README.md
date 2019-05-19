# copyundpasta

> My little foodblog

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## pm2
pm2 start npm --name "cup" -- start

## Database
```bash
docker run --name mariadb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=haimich -e MYSQL_USER=haimich -e MYSQL_PASSWORD=haimich -p 3306:3306 mariadb:10.3
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
