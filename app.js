const express = require('express');
const mysql = require ('mysql2');
const bodyParser = ('body-parser');

const app = express();
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pertemuan5'
});

connection.connect((err) => {
if(err) {
    console.error("Terjadi kesalahan dalam koneksi ke MySQL:", err.stack);
    return;
}
console.log("koneksi MySQL berhasil dengan id" + connection.threadId)
});

app.set('view engine', 'ejs');

//ini adalah routing (Create, Read, Update, Delete)

//read
app.get('/', (req, res) => {
const query = 'SELECT * FROM users';
connection.query(query, (err,results) => {
    if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
    }
    res.render('index',{users: results});
});
});  

//create / input / insert
app.post('/add', (req, res) => {
    const {name, email, phone } = req.body;
    const query = 'INSERT INTO users (name, email, phone) VALUES (?,?,?)';
connection.query(query, [name, email, phone], (err,result) => {
if(err) throw err;
res.redirect('/');
});
});

//untuk update data
app.get('/', (req, res) => {
const query = 'SELECT * FROM users WHERE id = ?';
connection.query(query, [req.param.id], (err,results) => {
    if (err) throw err;
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
    }
    res.render('edit',{user: result[0]});
});
});  

//hapus
app.get('/delete/:id', (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [req.params.id], (err,result) => {
        if(err) throw err;
        res.render('edit',{user: result[0]});
});
});


app.post('/update/:id', (req, res) => {
        const {name, email, phone } = req.body;
        const query = 'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?node app.js
    connection.query(query, [name, email, phone, req.params.id], (err,result) => {
    if(err) throw err;
    res.redirect('/');
    });
    });
})


app.listen(3003,() => {
    console.log("Server berjalan di port 3003, buka web melalui http://localhost:3003");
});