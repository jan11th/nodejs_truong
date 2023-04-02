const path = require('path');
const express = require('express');
const morgan = require('morgan');
var methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routes');
const db = require('./config/db');

//connect to db
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//custom middlewares
app.use(SortMiddleware);

//  http logger
//  app.use(morgan('combined'));

//template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
          default:'fa fa-sort',
          asc: 'fa fa-sort-up',
          desc: 'fa fa-sort-down',
        };
        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };

        const icon = icons[sortType];
        const type = types[sortType];
        return`  
        <a href="?_sort&column=${field}&type=${type}"><span><i class="${icon}"></i></span></a>`;
      }
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
