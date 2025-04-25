const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const User = require('../models/User');

// Middleware cek login
function isAuthenticated(req, res, next) {
    res.locals.userId = req.session.userId;
    if (res.locals.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Halaman home
router.get('/home', isAuthenticated, async(req, res) => {
    const user = await User.findOne({ _id: req.session.userId });
    const notes = await Note.find({ user_id: req.session.userId });

    res.render('notes/index', {
        title: 'Home',
        userId: req.session.userId,
        user,
        notes,
        msg: req.flash('msg'),
    });
});

// Halaman form tambah catatan
router.get('/add', isAuthenticated, async(req, res) => {
    const user = await User.findOne({ _id: req.session.userId });
    const today = new Date();

    res.render('notes/add', {
        title: 'Tambah Catatan',
        user,
        today,
    });
});

// proses tambah catatan
router.post('/add', async(req, res) => {
    const newNote = new Note(req.body);
    await newNote.save();

    req.flash('msg', 'Catatan berhasil ditambahkan!');
    res.redirect('/home');
});

// Halaman form detail dan ubah catatan
router.get('/edit/:id', isAuthenticated, async(req, res) => {
    const note = await Note.findOne({ _id: req.params.id });

    const today = new Date();

    res.render('notes/edit', {
        title: 'Ubah Catatan',
        note,
        today,
    });
});

// proses ubah catatan
router.post('/edit', (req, res) => {
    Note.updateOne({ _id: req.body.id }, {
        $set: {
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
        },
    }).then((result) => {
        req.flash('msg', 'Data catatan berhasil diubah!');
        res.redirect('/home');
    });
});

// hapus catatan
router.delete('/delete/:id', isAuthenticated, async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('msg', 'Data catatan berhasil dihapus!');
    res.redirect('/home');
});

module.exports = router;