const Transactions = require("../../models/transactions.model");
const Joi = require("joi");

const controller = server => {
	server.route({
		method: "GET",
		path: "/transaction",
		options: {
			handler,
			description: "Get transactions",
			notes: "Get transactions",
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
	const transactions = await Transactions.getAll(
		req.query.limit,
		req.query.page
	);

	if (!transactions) {
		return {
			msg: "Transactions not found",
		};
	}
	return {
		transactions,
	};
};

module.exports = controller;
