const Hapi = require("@hapi/hapi");
require("dotenv").config();
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Routes = require("./routes");
const Pack = require('./package');
const fs = require("fs");
const path = require("path");

// create folder for upload if not exist
const UPLOAD_PATH = 'uploads-image';
if (!fs.existsSync(UPLOAD_PATH)) fs.mkdirSync(UPLOAD_PATH);

const server = new Hapi.Server({
	host: "localhost",
	port: 7000,
	state: {
		strictHeader: false,
	},
	routes: {
		files: {
			relativeTo: path.join(__dirname, UPLOAD_PATH)
		}
	}
});

const init = async () => {
	const swaggerOptions = {
		info: {
			title: "Test API Documentation",
			version: Pack.version,
		},
	};

	await server.register(require('@hapi/inert'));

	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: swaggerOptions,
		},
	]);

	server.route({
		method: "GET",
		path: "/",
		handler: (req, h) => {
			return {
				msg: "Hello world!",
			};
		},
	});

	Routes(server);

	server.start(err => {
		if (err) {
			throw err;
		}
		console.log("Server running on %s", server.info.uri);
	});
};

init();
