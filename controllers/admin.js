const Product = require('../models/product'); //Model import for Product Class

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        path: '/add-product', 
        formsCSS: true, 
        productCSS: true, 
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    //products.push({title: req.body.title, price: req.body.price, description: req.body.description});
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const product = new Product(title, price, description, imageUrl);
    product.save();
    res.redirect('/');
    return res.end();
};

exports.getRemoveProduct = (req, res, next) => {
    res.render('remove-product', {
        pageTitle: 'Remove Product',
        path: '/remove-product',
        prods: products
    });
};

exports.postRemoveProduct = (req, res, next) => {
    let remProduct = req.body.remProduct;
    const index = products.findIndex(product => product.title === remProduct);
    if (index !== -1){
        products.splice(index, 1);
    }
    console.log(products);
    res.redirect('/');
    //products = products.filter(product => product!== title);
    //console.log(req.body.title);
    
};

exports.getProducts = (req, res, next) => {
    Product.fetchALL(products => {
        res.render('admin/admin-products', {
                prods: products, 
                pageTitle: 'Admin Products', 
                path: '/admin-products'
        });
    });
};
