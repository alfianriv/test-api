const Products = require("../../models/products.model");
const Joi = require("joi");
const fs = require("fs");
const uuid = require("uuid");

const controller = server => {
	server.route({
		method: "PUT",
		path: "/product/{id}",
		options: {
			handler,
			description: "Update product",
			notes: "Update product by id",
			tags: ["api"],
			payload: {
				output: "stream",
				parse: true,
				allow: "multipart/form-data",
				multipart: true,
			},
			validate: {
				params: Joi.object({
					id: Joi.number().required(),
				}),
				payload: Joi.object({
					sku: Joi.string().required(),
					name: Joi.string().required(),
					price: Joi.number().required(),
					image: Joi.any(),
					description: Joi.string().required(),
				}),
			},
		},
	});
};

const handler = async (req, res) => {
	let image = null;
	if (req.payload.image) {
		if (
			!["image/png", "image/jpg", "image/jpeg"].includes(
				req.payload.image.hapi.headers["content-type"]
			)
		) {
			return {
				msg: "Image not supported",
			};
		}
		const name = uuid.v4() + ".jpg";
		const path = __dirname + "/../../uploads-image/" + name;
		const file = fs.createWriteStream(path);
		image = name;
		file.on("error", err => (image = null));
		req.payload.image.pipe(file);
		req.payload.image.on("end", function (err) {
			return true;
		});
	}
	const products = await Products.update(req.params.id, {
		...req.payload,
		image,
		updated_at: new Date(),
	});
	if (!products) {
		return {
			msg: "Cannot update product",
		};
	}
	return {
		products: products.map(val => {
			if (val.image) {
				val.image = req.server.info.uri + "/uploads/" + val.image;
			}
			return val;
		}),
	};
};

module.exports = controller;
