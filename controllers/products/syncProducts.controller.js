const { default: axios } = require("axios");
const convert = require("xml-js");
const url = require("../../constants/url");
const Products = require("../../models/products.model");
const Joi = require("joi");

const controller = server => {
	server.route({
		method: "GET",
		path: "/product/sync/{page}",
		options: {
			handler,
			description: "Sync products",
			notes: "Sync products from api to db",
			tags: ["api"],
			validate: {
				params: Joi.object({
					page: Joi.number(),
				}),
			},
		},
	});
};

const handler = async (req, res) => {
	const { page } = req.params;

	const products = await getProductFromAPI(page);
	const data = convert.xml2js(products.data, { compact: true });

	if (!data.Products.product) {
		return {
			msg: `Products not found`,
		};
	}

	const syncData = formatting(data.Products.product);

	let total = 0;
	for (let sync of syncData) {
		sync = await Products.sync(sync);
		if (sync) {
			total++;
		}
	}

	return {
		msg: `Success sync ${total} products to db`,
	};
};

const getProductFromAPI = async page => {
	return await axios.get(`${url.api_elevania}/product/listing`, {
		headers: {
			openapikey: process.env.ELEVANIA_API,
		},
		params: {
			page,
		},
	});
};

const formatting = products => {
	const formats = [];

	for (let product of products) {
		let detail = {
			sku: "",
			name: "",
			image: "",
			price: 0,
			description: "",
			qty: 0,
		};

		detail.sku = product.sellerPrdCd._text;
		detail.name = product.prdNm._text;
		detail.price = parseInt(product.selPrc._text);
		detail.qty = parseInt(product.prdSelQty._text);
		detail.description = [
			product.dispCtgrNm._text,
			product.dispCtgrNmMid._text,
			product.dispCtgrNmRoot._text,
		].join(" ");

		formats.push(detail);
	}

	return formats;
};

module.exports = controller;
