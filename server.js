const express = require('express');
const path = require('path');
const connectDB = require('./config/db');  // Import the connectDB function
const bodyParser = require('body-parser');
const hbs = require('hbs');

// Initialize the Express application
const app = express();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const partialsPath = path.join(__dirname, 'views', 'partials');

// Register the partials
hbs.registerPartials(partialsPath);  // Register partials

// Set the view engine to Handlebars
app.set('view engine', 'hbs');

// Set the path for views and partials
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB();  // Establish connection with the database

// Routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const policyRoutes = require('./routes/policies');
const claimRoutes = require('./routes/claims');

// Use routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/policies', policyRoutes);
app.use('/claims', claimRoutes);

app.use((req, res) => {
  res.status(404).render('404', { currentYear: new Date().getFullYear() });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
