const Routes = (server) => {
    require('./controllers/products/getProducts.controller')(server)
    require('./controllers/products/getProduct.controller')(server)
    require('./controllers/products/createProduct.controller')(server)
    require('./controllers/products/syncProducts.controller')(server)
    require('./controllers/products/updateProduct.controller')(server)
    require('./controllers/products/deleteProduct.controller')(server)

    require('./controllers/transactions/getTransactions.controller')(server)
    require('./controllers/transactions/getTransaction.controller')(server)
    require('./controllers/transactions/createTransaction.controller')(server)
    require('./controllers/transactions/updateTransaction.controller')(server)
    require('./controllers/transactions/deleteTransaction.controller')(server)
    
    require('./controllers/uploads/showImage.controller')(server)
}

module.exports = Routes