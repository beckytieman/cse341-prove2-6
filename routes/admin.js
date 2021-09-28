const express = require('express');
const { route } = require('./shop');

const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/remove-product',adminController.getRemoveProduct);

router.post('/remove-product',adminController.postRemoveProduct);

router.get('/add-product', adminController.getAddProduct);

router.get('/admin-products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

module.exports = router;
