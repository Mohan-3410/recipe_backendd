const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require("./dbConnect")
const authRouter = require("./routers/authRouter")
const userRouter = require("./routers/userRouter")
const morgan = require('morgan');
const cookieParser = require("cookie-parser")
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const { error, success } = require('./utils/responseWrapper');
const { generateAccessToken, generateRefreshToken } = require('./controllers/authController');
dotenv.config({path: "./.env" })
require('./config/passport');

const app = express();

//middleware
app.use(express.json({limit: '10mb'}));
app.use(morgan('common'));
app.use(cookieParser());
app.use(session({ secret: 'your-secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

let origin = process.env.FRONTEND_HOST

app.use(cors({
    credentials: true,
    origin
}))

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req,res)=>{
    res.status(200).send("ok from cobalt server");
})

// Google OAuth routes
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_HOST}/login` }),
  (req, res) => {
    const accessToken = generateAccessToken({ _id: req.user._id });
    const refreshToken = generateRefreshToken({ _id: req.user._id });
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    res.redirect(`${process.env.FRONTEND_HOST}/?accessToken=${accessToken}`);
  }
);
app.get('/login/success', async(req, res) => {
    if(req.user){
        return res.json(success(200, { user: req.user }));
    }
    else {
        return res.json(error(400, 'Not Authorized'));
    }
});

app.get('/logout', (req,res, next) => {
    req.logout(function(err){
        if(err){return next(err)}
        res.redirect(`${process.env.FRONTEND_HOST}/login`)
    })
})

const PORT = process.env.PORT || 4000;
dbConnect()
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});