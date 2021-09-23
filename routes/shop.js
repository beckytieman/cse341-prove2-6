const express = require('express');

//connect to product route
const productRoutes = require('./add-product');
const router = express.Router();

router.get('/',(req, res, next) => {
    const products = productRoutes.products;
    //console.log(adminData.products);
    //res.sendFile(path.join(rootDir, 'week02-views', 'shop.html'));
    res.render('shop', {
        prods: products, 
        pageTitle: 'E-Commerce Shop', 
        path: '/', hasProducts: 
        products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

module.exports = router;

