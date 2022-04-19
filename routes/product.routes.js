const controller = require('./../controllers/product.controller');
module.exports = (app)=>{
    app.post('api/v1/product', controller.product);
    app.get('api/v1/product', controller.getProduct);
    app.put('api/v1/product/:productId', controller.updateProduct);
    app.delete('api/v1/product/:productId', controller.deleteProduct);
}