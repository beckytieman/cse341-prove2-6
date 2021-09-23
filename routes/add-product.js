const express = require('express');
const { route } = require('./shop');

const router = express.Router();

const products = [];



router.post('/add-product',(req, res, next) => {
    //console.log(req.body);
    
    //let newProduct = {title: req.body.title, description: req.body.description}; //multiple entries
    //products.push(newProduct);
    products.push({title: req.body.title, price: req.body.price, description: req.body.description});
    // console.log(products);
    
    res.redirect('/');
    return res.end();
});
router.get('/remove-product',(req, res, next) => {
    
    res.render('remove-product', {
        pageTitle: 'Remove Product',
        path: '/remove-product',
        prods: products
    });
  });
router.post('/remove-product',(req, res, next) => {
    let remProduct = req.body.remProduct;
    const index = products.findIndex(product => product.title === remProduct);
    if (index !== -1){
        products.splice(index, 1);
    }
    console.log(products);
    res.redirect('/');
    //products = products.filter(product => product!== title);
    //console.log(req.body.title);
    
  });
router.get('/add-product',(req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/add-product', 
        formsCSS: true, 
        productCSS: true, 
        activeAddProduct: true
    });
});

exports.routes = router;
exports.products = products;
