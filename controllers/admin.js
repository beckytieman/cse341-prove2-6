const Product = require('../models/product'); //Model import for Product Class

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product', 
        path: '/add-product', 
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    //products.push({title: req.body.title, price: req.body.price, description: req.body.description});
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const product = new Product(null, title, price, description, imageUrl);
    product.save();
    res.redirect('/');
    return res.end();
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/edit-product', 
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    const updatedProduct = new Product(
        prodId, 
        updatedTitle, 
        updatedPrice,
        updatedDesc, 
        updatedImageUrl
        
    );
    updatedProduct.save();
    res.redirect('/admin-products');
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

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/products');
    
};
