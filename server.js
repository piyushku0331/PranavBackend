const express = require('express');
const path = require('path');
const connectDB = require('./config/db');  
const bodyParser = require('body-parser');
const hbs = require('hbs');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const partialsPath = path.join(__dirname, 'views', 'partials');


hbs.registerPartials(partialsPath);  


app.set('view engine', 'hbs');


app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));


connectDB();  


const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const policyRoutes = require('./routes/policies');
const claimRoutes = require('./routes/claims');


app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/policies', policyRoutes);
app.use('/claims', claimRoutes);

app.use((req, res) => {
  res.status(404).render('404', { currentYear: new Date().getFullYear() });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
