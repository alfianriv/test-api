const Transactions = require("../../models/transactions.model");
const Joi = require("joi");

const controller = server => {
	server.route({
		method: "POST",
		path: "/transaction",
        options: {
    		handler,
            description: "Create transaction",
			notes: "Create transaction",
			tags: ["api"],
            validate: {
				payload: Joi.object({
					qty: Joi.string().required(),
					type: Joi.string().valid('IN', 'OUT').required(),
					product_id: Joi.number().required(),
				}),
			}
        }
	});
};

const handler = async (req, res) => {
    const transactions = await Transactions.create(req.payload);
    if (!transactions) {
        return {
            msg: "Cannot add transaction",
        };
    }
    return {
        transactions,
    };
}

module.exports = controller;
