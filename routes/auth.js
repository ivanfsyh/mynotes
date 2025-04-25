const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        msg: req.flash('msg'),
        success: req.flash('success'),
    });
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        req.session.userId = user._id;
        // res.send('Login sukses!');
        res.redirect('home');
    } else {
        // res.send('Username atau password salah.');
        req.flash('msg', 'Username atau password salah.');
        res.redirect('/login');
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register', {
        title: 'Login',
    });
});

router.post('/register', async(req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.send('Username sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // res.send('Registrasi berhasil!');
    req.flash('success', 'Registrasi berhasil!');
    res.redirect('/login');
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Gagal logout:', err);
            return res.send('Gagal logout.');
        }
        res.redirect('/login');
    });
});

module.exports = router;