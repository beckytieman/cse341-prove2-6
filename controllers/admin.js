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
    const product = new Product(title, price, description, imageUrl);
    product
    .save()
    .then(result => {
        console.log('Created Product');
        res.redirect('products');
    })
    .catch(err => {
        console.log(err);
    });
    // const product = new Product(null, title, price, description, imageUrl);
    // product.save();
    // res.redirect('/');
    // return res.end();
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product', 
            path: '/edit-product', 
            editing: editMode,
            product: product
        });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    const product = new Product(
        updatedTitle, 
        updatedPrice,
        updatedDesc, 
        updatedImageUrl,
        prodId
    );
    product
    .save()
    .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin-products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.fetchALL()
    .then(products => {
        res.render('admin/admin-products', {
                prods: products, 
                pageTitle: 'Admin Products', 
                path: '/admin-products'
        });
    })
    .catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId)
    .then(() => {
        console.log('DELETED PRODUCT');
        res.redirect('/products');
    })
    .catch(err => console.log(err));
};
