const { Router } = require("express");
const passport = require("passport");
const userRouter = Router();
const { signup, login, googleAuthCallback, sendEmail } = require("../controller/UserController");

// Signup and Login
userRouter.post('/signup', signup);
userRouter.post('/login', login);

// Google OAuth routes
userRouter.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

userRouter.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleAuthCallback
);

// Nodemailer route
userRouter.post('/send-email', sendEmail);

module.exports = userRouter;

// // Add this to your main server file (e.g., index.js)
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/User'); // Adjust path as needed

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID, // Set in your .env
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Set in your .env
//   callbackURL: '/api/user/auth/google/callback'
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ email: profile.emails[0].value });
//     if (!user) {
//       user = await User.create({
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         password: '', // No password for Google users
//       });
//     }
//     return done(null, user);
//   } catch (err) {
//     return done(err, null);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });