const db = require("../db/knex");

const getAll = async (limit = 10, page = 1) => {
	try {
		const count = await db.count("id").from("tb_transactions").limit(1);
		let query = db
			.select("tb_transactions.*", "tb_products.sku")
			.select(
				db.raw("(tb_transactions.qty * tb_products.price) as amount")
			)
			.from("tb_transactions")
			.leftJoin(
				"tb_products",
				"tb_transactions.product_id",
				"tb_products.id"
			)
			.orderBy("tb_transactions.id")
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
			.select("tb_transactions.*", "tb_products.sku")
			.select(
				db.raw("(tb_transactions.qty * tb_products.price) as amount")
			)
			.from("tb_transactions")
			.leftJoin(
				"tb_products",
				"tb_transactions.product_id",
				"tb_products.id"
			)
			.where("tb_transactions.id", id)
			.limit(1);

		return await query;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const create = async data => {
	try {
		return db
			.transaction(trx => {
				db.select(
					db.raw(
						`CAST((SUM(CASE WHEN type = 'IN' THEN qty ELSE 0 END) - SUM(CASE WHEN type = 'OUT' THEN qty ELSE 0 END)) AS INTEGER) as qty`
					)
				)
					.from("tb_transactions")
					.where("product_id", data.product_id)
					.transacting(trx)
					.then(result => {
						if (data.type == "OUT") {
							if (result[0].qty > 0) {
								return db
									.insert(data, ["*"])
									.into("tb_transactions")
									.transacting(trx);
							}
							return false;
						} else {
							return db
								.insert(data, ["*"])
								.into("tb_transactions")
								.transacting(trx);
						}
					})
					.then(trx.commit)
					.catch(trx.rollback);
			})
			.then(inserts => {
				return inserts;
			})
			.catch(err => {
				return false;
			});
	} catch (error) {
		console.log(error);
		return false;
	}
};

const update = async (id, data) => {
	try {
		const transaction = await db("tb_transactions")
			.update(data, ["*"])
			.where("id", id);
		if (!transaction) {
			return false;
		}

		return transaction;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const deleteTransaction = async id => {
	try {
		const transaction = await db("tb_transactions").del().where("id", id);
		if (!transaction) {
			return false;
		}

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports = {
	getAll,
	get,
	create,
	update,
	deleteTransaction,
};
