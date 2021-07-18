const Products = require("../../models/products.model");
const Joi = require("joi");

const controller = server => {
	server.route({
		method: "DELETE",
		path: "/product/{id}",
		options: {
			handler,
			description: "Delete product",
			notes: "Delete product and the transactions",
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
	const products = await Products.deleteProduct(req.params.id);
	if (!products) {
		return {
			msg: "Cannot delete product",
		};
	}
	return {
		msg: "Success delete product",
	};
};

module.exports = controller;
