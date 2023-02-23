import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById } from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    return getUserByEmailIdAndPassword(email, password, done);
  }
);

passport.serializeUser(function (user: Express.User, done: ((error: any, id: number | undefined) => void)) {
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done: ((error: any, user: Express.User | false | null) => void)) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
