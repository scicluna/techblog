//IMPORTS
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require("path")
const sequelize = require('./config/connection');
require('dotenv').config();
//IMPORTS and initializes our storage
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//boilerplate
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});

//creating our session and storing it as a cookie
const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    expiration: 1 * 60 * 60 * 1000 //1 hour expiration on sessions
  })
};

//boilerplate
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//using our routes import from controllers/index.js
app.use(routes);

//starting our server and syncing it with our sql server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT}`));
});

//test