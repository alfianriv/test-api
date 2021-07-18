const Transactions = require("../../models/transactions.model");
const Joi = require("joi");

const controller = server => {
	server.route({
		method: "PUT",
		path: "/transaction/{id}",
		options: {
			handler,
            description: "Update transaction",
			notes: "Update transaction by id",
			tags: ["api"],
			validate: {
				params: Joi.object({
					id: Joi.number().required(),
				}),
				payload: Joi.object({
					qty: Joi.string().required(),
					type: Joi.string().valid("IN", "OUT").required(),
					product_id: Joi.number().required(),
				}),
			},
		},
	});
};

const handler = async (req, res) => {
	const transactions = await Transactions.update(req.params.id, {
		...req.payload,
		updated_at: new Date(),
	});
	if (!transactions) {
		return {
			msg: "Cannot update transaction",
		};
	}
	return {
		transactions,
	};
};

module.exports = controller;
