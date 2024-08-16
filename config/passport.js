const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../controllers/authController');
const passport = require('passport');

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `https://recipe-backend-h8gp.onrender.com/auth/google/callback`
        }, async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            const { email, name, picture } = profile._json;
            try {
                let user = await User.findOne({ email });
                if (!user) {
                    const lastFourDigitId = profile.id.substring(profile.id.length - 6);
                    const lastTwoDigitName = name.substring(name.length - 2);
                    const newPassword = lastFourDigitId + lastTwoDigitName;
                    const hashedPassword = await bcrypt.hash(newPassword, 10)
                    user = await User.create({
                        email,
                        name,
                        password: hashedPassword,
                        avatar: { url: picture }
                    });
                }
                return done(null, user);

                
            } catch (err) {
                done(err, false);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id);
          done(null, user);
        } catch (error) {
          done(error, false);
        }
      });
   