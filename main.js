// importaciones
require('dotenv').config();
const express = require('express');
const mogoose = require('mongoose');
const session = require('express-session');
const { default: mongoose } = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;


// conexion a la base de datos
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log(("Connenected to DataBase")))

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'claveSecreta',
    saveUninitialized: true,
    resave: false,
}))

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// establecer plantillas del motor
app.set('view engine', 'ejs');

app.use("/auth", require("./middlewares/auth"));


app.use("/routes/auth", require('./routes/routes'));



// prefijo de ruta

//app.use("",require('./routes/routes'))
// app.get('/', (req,res)=>{
//     res.send('Hello World')
// })

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})