
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000; 

const errorController = require('./controllers/error');

const User = require('./models/user');

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
  .use((req, res, next) => {
    User.findById("615dee974f891a5ba0b5891f")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(er => console.log(err));
    
  })
  .use(adminRoutes)
  .use(shopRoutes)
   
   
app.use(errorController.get404)

// mongoConnect(() => {
//   app.listen(PORT);
// });

mongoose
.connect(
  'mongodb+srv://tieman-user_OG:Sti8WMGOLgxW5AyD@cluster0.k9l5x.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'User',
        email: 'user@test.com',
        cart: {
          items: []
        }
      });
      user.save(); 
    }
  });
  app.listen(PORT);
})
.catch(err => {
  console.log(err);
});