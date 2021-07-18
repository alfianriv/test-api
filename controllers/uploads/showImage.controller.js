const Joi = require("joi");

const controller = server => {
	server.route({
		method: "GET",
		path: "/uploads/{name}",
		options: {
			handler: {
                file: function (request) {
                    return `${__dirname}/../../uploads-image/${request.params.name}`;
                }
            },
			description: "Get image by name",
			notes: "Return image by name",
			tags: ["api"],
			validate: {
				params: Joi.object({
					name: Joi.string().required(),
				}),
			},
		},
	});
};

module.exports = controller;
