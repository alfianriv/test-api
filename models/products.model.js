const db = require("../db/knex");

const sync = async data => {
	return db
		.transaction(trx => {
			db.insert(
				{
					sku: data.sku,
					name: data.name,
					price: data.price,
					description: data.description,
				},
				"id"
			)
				.into("tb_products")
				.transacting(trx)
				.then(ids => {
					return db
						.insert({
							product_id: ids[0],
							type: "IN",
							qty: data.qty,
						})
						.into("tb_transactions")
						.transacting(trx);
				})
				.then(trx.commit)
				.catch(trx.rollback);
		})
		.then(inserts => {
			return true;
		})
		.catch(err => {
			return false;
		});
};

const getAll = async (limit = 10, page = 1) => {
	try {
		const count = await db.count("id").from("tb_products").limit(1);
		let query = db
			.select("tb_products.*")
			.select(
				db.raw(
					`CAST((SUM(CASE WHEN tb_transactions.type = 'IN' THEN tb_transactions.qty ELSE 0 END) - SUM(CASE WHEN tb_transactions.type = 'OUT' THEN tb_transactions.qty ELSE 0 END)) AS INTEGER) as qty`
				)
			)
			.from("tb_products")
			.leftJoin(
				"tb_transactions",
				"tb_products.id",
				"tb_transactions.product_id"
			)
			.orderBy("tb_products.id")
			.groupBy("tb_products.id")
			.limit(limit)
			.offset((page - 1) * limit);

		return {
			pages: Math.ceil(parseInt(count[0].count) / limit),
			current_page: parseInt(page),
			limit: parseInt(limit),
			data: await query,
		};
	} catch (error) {
		console.log(error);
		return false;
	}
};

const get = async id => {
	try {
		let query = db
			.select("tb_products.*")
			.select(
				db.raw(
					`CAST((SUM(CASE WHEN tb_transactions.type = 'IN' THEN tb_transactions.qty ELSE 0 END) - SUM(CASE WHEN tb_transactions.type = 'OUT' THEN tb_transactions.qty ELSE 0 END)) AS INTEGER) as qty`
				)
			)
			.from("tb_products")
			.leftJoin(
				"tb_transactions",
				"tb_products.id",
				"tb_transactions.product_id"
			)
			.where("tb_products.id", id)
			.groupBy("tb_products.id");

		return await query;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const create = async data => {
	try {
		const product = await db.insert(data, ["*"]).into("tb_products");
		if (!product) {
			return false;
		}

		return product;
	} catch (error) {
		return false;
	}
};

const update = async (id, data) => {
	try {
		const product = await db("tb_products")
			.update(data, ["*"])
			.where("id", id);
		if (!product) {
			return false;
		}

		return product;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const deleteProduct = async id => {
	try {
		return db
			.transaction(trx => {
				db("tb_products")
					.del(["*"])
					.where("id", id)
					.transacting(trx)
					.then(ids => {
						return db("tb_transactions")
							.del()
							.where("product_id", id)
							.transacting(trx);
					})
					.then(trx.commit)
					.catch(trx.rollback);
			})
			.then(del => {
				return true;
			})
			.catch(err => {
				console.log(err);
				return false;
			});
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = {
	sync,
	getAll,
	get,
	create,
	update,
	deleteProduct,
};
