const express = require('express')
const bcrypt = require('bcryptjs');
const app = express()
const port = 3001
const mongoose = require('mongoose');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use(async function (req, res, next) {
    //await mongoose.connect('mongodb://127.0.0.1:27017/userdb');
    await mongoose.connect('mongodb+srv://admin:energiesparen22@cluster0.kzvc9tg.mongodb.net/userdb?retryWrites=true&w=majority');
    next();
});

const userSchema = new mongoose.Schema({
    id: String,
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    user_name: {
        type: String,
        unique: true
    },
    password: String,
    url: String,
    message: String
});

const commentSchema = new mongoose.Schema({
    id: String,
    userId: String,
    date: String,
    text: String
});
const postSchema = new mongoose.Schema({
    id: String,
    userId: String,
    date: String,
    title: String,
    text: String,
    link: String,
    //picture: String,
    likes: [String],
    comments:
        [commentSchema],

});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);



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
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send({ status: 'error', error: 'Invalid email or password' });
        return;
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);


    if (validPassword) {
        const accessToken = jwt.sign(
            {
                email: user.email,
                id: user.id,
                user_name: user.user_name,
                url: user.url,
                message: user.message,
            },
            process.env.EXPRESS_APP_ACCESS_JWT_KEY,
            {
                expiresIn: '5m',
            }
        );
        const refreshToken = jwt.sign({
            email: user.email,
        }, process.env.EXPRESS_APP_REFRESH_TOKEN_SECRET, { expiresIn: '45m' });

        // Assigning refresh token in http-only cookie 
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            // maxAge: 24 * 60 * 60 * 1000 // 1 day
            maxAge: 60 * 60 * 1000
        });

        // return res.json({ accessToken });
        res.status(200).send({ status: 'ok', message: 'User logged in', access: accessToken });
        return;
    }
    res.status(400).send({ status: 'error', error: 'Invalid email or password' });
});


// REFRESH TOKEN REQUEST
app.post('/refreshtoken', async (req, res) => {
    console.log("\n \n refresh token request")

    console.log("req.body", req.body)
    let user = await User.findOne({ email: req.body.user });
    console.log("USER:", user)
    console.log("\n req.cookie:", req.cookies.jwt)
    // const refreshToken = req.headers.cookie.slice(4);
    const refreshToken = req.cookies.jwt;

    console.log(refreshToken)
    if (refreshToken) {
            const decode = jwt.verify(refreshToken, process.env.EXPRESS_APP_REFRESH_TOKEN_SECRET, err => {

                // console.log(jwt.verify(refreshToken, process.env.EXPRESS_APP_REFRESH_TOKEN_SECRET))
                
                if (err) {
                    return res.status(406).json({ message: 'Unauthorized' })
                }
                else {
                    console.log("neuer access token")
                    const accessToken = jwt.sign({
                        email: user.email,
                        id: user.id,
                        user_name: user.user_name,
                        url: user.url,
                        message: user.message,
                    },
                        process.env.EXPRESS_APP_ACCESS_JWT_KEY,
                        {
                            expiresIn: '5m',
                        });
                    return res.status(200).send({ status: 'ok', message: 'Unauthorized', access: accessToken});
                }
            });
            return;
    }
})


// Delete cookie
app.get('/clear-cookie',  (req, res) => {
    res.clearCookie('jwt').send();
});


// Post a post
app.post('/post', async (req, res) => {
    try {
        const result = await Post.create({
            id: req.body.id,
            userId: req.body.userId,
            date: req.body.date,
            title: req.body.title,
            text: req.body.text,
            link: req.body.link,
            //picture: req.body.picture,
            likes: req.body.likes,
            comments: req.body.comments,
        });
        res.status(200).send({ message: 'Post created', result });
    } catch (error) {
        res.status(400).send({ message: 'Error creating post', error });
    }
});

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const result = await Post.find();
        res.status(200).send({ message: 'Posts found', result });
    } catch (error) {
        res.status(400).send({ message: 'Error finding posts', error });
    }
});


// Add a like
app.post('/addlike', async (req, res) => {
    try {
        let response = await Post.findOneAndUpdate({ id: req.body.id }, { $push: { likes: req.body.userId } }, { done: true })
        res.status(200).send({ message: 'Like added' })
    }
    catch (error) {
        res.status(400).send({ message: 'Error updating the likes', error })
    }
})

// Remove a like
app.post('/removelike', async (req, res) => {
    try {
        console.log(req.body.id)
        console.log(req.body.userId)
        let response = await Post.findOneAndUpdate({ id: req.body.id }, { $pull: { likes: req.body.userId } }, { new: true })
        res.status(200).send({ message: 'Like removed' })
    }
    catch (error) {
        res.status(400).send({ message: 'Error updating the likes', error })
    }
})

// Add a new comment
app.post('/addcomment', async (req, res) => {
    try {
        let response = await Post.findOneAndUpdate({ id: req.body.id }, { $push: { comments: req.body.comment } }, { new: true })
        res.status(200).send({ message: 'comment added', response })
    }
    catch (error) {
        res.status(400).send({ message: 'Error updating comments', error })
    }
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});


