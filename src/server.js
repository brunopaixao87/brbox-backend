const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());


const serve = require('http').Server(app);
const io = require('socket.io')(serve);

io.on('connection', socket => {
   socket.on('connectRoom', box =>{
       socket.join(box);
   })
});

mongoose.connect('mongodb+srv://brbox:brboxcusoOminustack@cluster0-xrnis.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true,
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));

serve.listen(process.env.PORT || 3333);