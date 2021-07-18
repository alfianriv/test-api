const Products = require("../../models/products.model");
const Joi = require("joi");

const controller = server => {
	server.route({
		method: "GET",
		path: "/product/{id}",
		options: {
			handler,
			description: "Get product by",
			notes: "Return product by id",
			tags: ["api"],
			validate: {
				params: Joi.object({
					id: Joi.number().required(),
				}),
			},
		},
	});
};

const handler = async (req, res) => {
	const product = await Products.get(req.params.id);
	if (!product) {
		return {
			msg: "Product not found",
		};
	}
	return {
		product: {
			...product[0],
			image: image ? req.server.info.uri + "/uploads/" + image : null,
		},
	};
};

module.exports = controller;
