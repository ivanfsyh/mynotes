require('dotenv').config();
const express = require('express');
const session = require('express-session');

const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const MongoStore = require('connect-mongo');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const connectDB = require('./utils/db');

const app = express();

// Connect to MongoDB
connectDB();

// Set view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/main'); // default layout

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 20 * 60 * 1000 }, // 20 menit
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'sessions',
        }),
    })
);
app.use(flash());

// aktifkan csrf protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // kirim token ke view
    next();
});

// Route
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

app.use(authRoutes);
app.use(noteRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});