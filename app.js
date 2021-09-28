
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000; 

const errorController = require('./controllers/error');

const app = express();


//Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//template engine
app
  .use(express.static(path.join(__dirname, 'public'))) //css
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(bodyParser.urlencoded({extended: false}))
  .use(adminRoutes)
  .use(shopRoutes)
   
   
app.use(errorController.get404)
app.listen(PORT);