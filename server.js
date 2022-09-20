const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const express = require('express');
const session = require('express-session');
const app = express();
// enviroment compatibility with heroku
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// session object
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});