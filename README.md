# TEST API

This test api is made by Nodejs and HapiJs.

## Installation

Use the package manager [yarn](https://yarnpkg.com/) or [npm](started)  to install package in test api.

```bash
yarn install
```
```bash
npm install
```

## Usage

Create a file .env in the root of project.

```.env
ELEVANIA_API=xxxxxxxxxxxxxxx
PG_CONNECTION=postgres://postgres:password@localhost:5432/db_test
```
Import db_test.sql db to your postgres db

To run application

```terminal
yarn start
```
```terminal
npm run start
```

You can read the swagger in [http://localhost:7000/documentation](http://localhost:7000/documentation)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
