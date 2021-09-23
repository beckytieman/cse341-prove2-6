
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000; 


const app = express();


//Routes
const productRoutes = require('./routes/add-product');
const shopRoutes = require('./routes/shop');

//template engine
app
  .use(express.static(path.join(__dirname, 'public'))) //css
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser.urlencoded({extended: false}))
  .use(productRoutes.routes)
//   .get('/',(req, res, next) => {
    
//     //console.log(adminData.products);
//     //res.sendFile(path.join(rootDir, 'week02-views', 'shop.html'));
//     res.render('shop', {
//         prods: products, 
//         pageTitle: 'E-Commerce Shop', 
//         path: '/', hasProducts: 
//         products.length > 0,
//         activeShop: true,
//         productCSS: true
//         });
//     })
    .use(shopRoutes)
   
   
app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found!'});
    })
.listen(PORT, () => console.log(`Listening on ${PORT}`));