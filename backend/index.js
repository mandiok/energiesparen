const express = require('express')
const bcrypt = require('bcryptjs');
const app = express()
const port = 3001
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(async function (req, res, next) {
    //await mongoose.connect('mongodb://127.0.0.1:27017/userdb');
    await mongoose.connect('mongodb+srv://admin:energiesparen22@cluster0.kzvc9tg.mongodb.net/userdb?retryWrites=true&w=majority');
    next();
  });

const userSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
    email: {type: String,
        unique: true},
    user_name: {type: String,
        unique: true},
    password: String,
    url: String,
    message: String
    });

const User = mongoose.model('User', userSchema);

//Status Backend
app.get('/status', (req, res) => {
    res.status(200).send('Backend running!')
})

// REGISTER USER
app.post('/register', async (req, res) => {
    try {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        const result = await User.create({
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            email: req.body.email,
            password: encryptedPassword,
            url: req.body.url,
            message: req.body.message, 
        });
        res.status(200).send({ message: 'User created', result });
    } catch (error) {
        res.status(400).send({ message: 'Error creating user', error });
    }
});


// LOGIN USER
app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send({ status: 'error', error: 'Invalid email or password' });
        return;
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);

if (validPassword) {
    res.status(200).send({ status: 'ok', message: 'User logged in' });
    return;
}
res.status(400).send({ status: 'error', error: 'Invalid email or password' });
});



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  });
  

