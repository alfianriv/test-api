const Products = require("../../models/products.model");
const Joi = require("joi");

const controller = server => {
	server.route({
		method: "GET",
		path: "/product",
		options: {
			handler,
			description: "Get products",
			notes: "Return products",
			tags: ["api"],
			validate: {
				query: Joi.object({
					page: Joi.number(),
					limit: Joi.number(),
				}),
			},
		},
	});
};

const handler = async (req, res) => {
	const products = await Products.getAll(req.query.limit, req.query.page);
	if (!products) {
		return {
			msg: "Products not found",
		};
	}
	return {
		...products,
		data: products.data.map(val => {
			if (val.image) {
				val.image = req.server.info.uri + "/uploads/" + val.image;
			}
			return val;
		}),
	};
};

module.exports = controller;
