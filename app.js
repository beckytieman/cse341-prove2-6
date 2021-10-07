
const path = require('path');
const express = require('express');
const cors = require('cors') // Place this with other requires (like 'path' and 'express')

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000; 



const corsOptions = {
    origin: "https://cse341-tieman-project.herokuapp.com/",
    optionsSuccessStatus: 200
};

// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   family: 4
// };



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
    User.findOne()
    .then(user => {
      req.user = user;
      next();
    })
    .catch(er => console.log(err));
    
  })
  .use(adminRoutes)
  .use(shopRoutes)
   
   
app.use(errorController.get404)

app.use(cors(corsOptions));
// mongoConnect(() => {
//   app.listen(PORT);
// });

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://tieman-user_OG:Sti8WMGOLgxW5AyD@cluster0.k9l5x.mongodb.net/shop?retryWrites=true&w=majorit";
//"mongodb+srv://tieman-user_OG:Sti8WMGOLgxW5AyD@cse341cluster-3dwlw.mongodb.net/shop?retryWrites=true&w=majority";

mongoose
.connect(
  MONGODB_URL)
  //'mongodb+srv://tieman-user_OG:Sti8WMGOLgxW5AyD@cluster0.k9l5x.mongodb.net/shop?retryWrites=true&w=majority')
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