# 📝 mynotes

Aplikasi web sederhana untuk menyimpan catatan harian menggunakan Node.js, Express, MongoDB Atlas, dan TailwindCSS.

## 🚀 Fitur

- Autentikasi pengguna (Register, Login, Logout)
- Menambahkan, melihat, dan menghapus catatan
- SweetAlert untuk notifikasi
- UI responsive dengan TailwindCSS (via CDN)
- Penyimpanan data menggunakan MongoDB Atlas

## 🛠 Teknologi

- Node.js + Express.js
- MongoDB Atlas (Mongoose)
- EJS + express-ejs-layouts
- TailwindCSS (via CDN)
- dotenv, express-session, connect-flash
- SweetAlert2 (client-side alert)

## 📦 Instalasi

1. Clone repositori ini:

```bash
git clone https://github.com/username/mynotes.git
cd mynotes
```

2. Install semua dependency:

```bash
npm install
```

3. Buat file `.env` dari template:

```bash
cp .env.example .env
```

4. Isi variabel di `.env`:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.acr4etm.mongodb.net/mynotes?retryWrites=true&w=majority&appName=Cluster0a
```

5. Jalankan project:

```bash
nodemon app
```

6. Buka di browser:

```
http://localhost:3000
```

## 📁 Struktur Folder

```
mynotes/
├── app.js
├── routes/
│   ├── auth.js
│   └── notes.js
├── models/
│   ├── User.js
│   └── Note.js
├── utils/
│   └── db.js
├── views/
│   ├── auth/
│   └── notes/
├── public/
│   └── ...
├── .env.example
└── README.md
```

## 👤 Author

- [@ivanfsyh](https://github.com/ivanfsyh)
