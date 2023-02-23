import { IVerifyOptions } from "passport-local";
import { userModel } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string, done: (error: any, user?: false | Express.User | undefined, options?: IVerifyOptions | undefined) => void) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect" });
    }
  }
  return done(null, false, { message: `Couldn't find user with email: ${email}` });
};

const getUserById = (id: number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: Express.User, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
