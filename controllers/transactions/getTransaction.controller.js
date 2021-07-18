const Transactions = require("../../models/transactions.model");
const Joi = require("joi");

const controller = server => {
	server.route({
		method: "GET",
		path: "/transaction/{id}",
		options: {
			handler,
			description: "Get transaction",
			notes: "Get transaction by id",
			tags: ["api"],
			validate: {
				params: Joi.object({
					id: Joi.number().required(),
				}),
			},
		}
	});
};

const handler = async (req, res) => {
	const transaction = await Transactions.get(req.params.id);
	if (!transaction) {
		return {
			msg: "Transaction not found",
		};
	}
	return {
		transaction: transaction[0],
	};
}

module.exports = controller;
