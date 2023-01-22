import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/User.js";

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        //data base here

        const user = await User.findOne({
          googleId: profile.id,
        });

        if (!user) {
            const newUser = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                photo:profile.photos[0].value,
            });
            return done(null,newUser)

        }
        else{
            return done(null,user)
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);

    done(null, user);
  });
};
