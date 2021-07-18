const Transactions = require("../../models/transactions.model");
const Joi = require("joi");

const controller = server => {
	server.route({
		method: "DELETE",
		path: "/transaction/{id}",
		options: {
			handler,
            description: "Delete transaction",
			notes: "Delete transaction by id",
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
	const transactions = await Transactions.deleteTransaction(req.params.id);
	if (!transactions) {
		return {
			msg: "Cannot delete transaction",
		};
	}
	return {
		msg: "Success delete transaction",
	};
};

module.exports = controller;
