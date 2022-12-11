const express = require('express')
const bcrypt = require('bcryptjs');
const app = express()
const port = 3001
const mongoose = require('mongoose');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const multer = require("multer");
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const { promisify } = require('util');
const fs = require('fs');

const User = require('./models/UserModel');
const Post = require('./models/PostModel');

dotenv.config()

const MONGO_URI = process.env.MONGO_URI;

var upload = multer();

//.................

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

//.........


const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        return result.url;
    } catch (error) {
        console.error(error);
    }
};


const writeFilePromise = promisify(fs.writeFile);
const asyncSaveFile = async (filename, fileBuffer) => {
    try {
        await writeFilePromise(filename, fileBuffer);
        return "file successfully written";
    } catch (error) {
        return error;
    }
}

//................

app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use(async function (req, res, next) {
    //await mongoose.connect('mongodb://127.0.0.1:27017/userdb');
    await mongoose.connect(MONGO_URI);
    next();
});

//...................

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
                first_name: user.first_name,
                last_name: user.last_name,
                url: user.url,
                message: user.message,
            },
            process.env.EXPRESS_APP_ACCESS_JWT_KEY,
            {
                expiresIn: '10m',
            }
        );
        const refreshToken = jwt.sign(
            {
                email: user.email,
            },
            process.env.EXPRESS_APP_REFRESH_TOKEN_SECRET,
            {
                expiresIn: '24h'
            });

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
    console.log("\n \nrefresh token request")

    let user = await User.findOne({ email: req.body.user });

    const refreshToken = req.cookies.jwt;


    if (refreshToken) {
        const decode = jwt.verify(refreshToken, process.env.EXPRESS_APP_REFRESH_TOKEN_SECRET, err => {

            if (err) {
                console.log("Error refreshing accessToken")
                return res.status(406).json({ message: 'Unauthorized' })
            }
            else {
                console.log("neuer access token")
                const accessToken = jwt.sign({
                    email: user.email,
                    id: user.id,
                    user_name: user.user_name,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    url: user.url,
                    message: user.message,
                },
                    process.env.EXPRESS_APP_ACCESS_JWT_KEY,
                    {
                        expiresIn: '5m',
                    });
                return res.status(200).send({ status: 'ok', message: 'Unauthorized', access: accessToken });
            }
        });
        return;
    }
})


// Delete cookie
app.get('/clear-cookie', (req, res) => {
    res.clearCookie('jwt').send();
});

// get User Data
app.get('/user-data', async (req, res) => {
    try {
    let result = await User.findOne({ id: req.query.id })


    if(req.query.fk === 'myData') {
        console.log("myData")
        res.status(200).send({
          user_name: result.user_name,
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          url: result.url,
          message: result.message
      })
      console.log(result.url)
    } else if (req.query.fk === 'otherUser') {
        // console.log("otherUser wird benötigt")
        res.status(200).send({
            user_name: result.user_name,
            url: result.url,
            message: result.message
        })
    }
    } catch (error) {
        console.log("error")
        res.status(400).send({message: "error", error})
    }
})



// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const result = await Post.find();
        res.status(200).send({ message: 'Posts found', result });
    } catch (error) {
        res.status(400).send({ message: 'Error finding posts', error });
    }
});



// Post a post
app.post('/post', upload.single('file'), async (req, res) => {

    // console.log(req.body)
    // console.log(req.file)
    let cloudinaryURL;

    if (req.file) {

        try {
            const saveFileResult = await asyncSaveFile(req.file.originalname, req.file.buffer);
            cloudinaryURL = await uploadImage(req.file.originalname);
            console.log("\n \n url", cloudinaryURL, "\n\n")

            fs.unlink(req.file.originalname, () => { });
        } catch {
            (error)
            console.log(error)
        }
    }

    try {

        const result = await Post.create({
            id: req.body.id,
            userId: req.body.userId,
            userName: req.body.userName,
            date: req.body.date,
            title: req.body.title,
            text: req.body.text,
            link: req.body.link,
            picture: cloudinaryURL,
            likes: [],
            comments: [],
        });
        res.status(200).send({ message: 'Post created', result });
    } catch (error) {
        res.status(400).send({ message: 'Error creating post', error });
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


