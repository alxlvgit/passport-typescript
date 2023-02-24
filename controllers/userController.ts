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

const getUserById = (id: number, done: (error: any, user: Express.User | false | null) => void) => {
  let user = userModel.findById(id);

  if (user) {
    return done(null, user);
  }
  return done(`Couldn't find user with id: ${id}`, false);
};

function isUserValid(user: Express.User, password: string) {
  return user.password === password;
}

const addNewUser = (id: number, displayName: string): void => {
  if (userModel.findById(id)) return;
    userModel.addGithubUser(id, displayName);
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  addNewUser
};
