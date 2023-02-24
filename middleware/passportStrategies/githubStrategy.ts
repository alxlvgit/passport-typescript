import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { addNewUser, getUserById } from "../../controllers/userController";
import * as dotenv from 'dotenv'
dotenv.config();


const GITHUB_CLIENT_ID = `${process.env.GITHUB_CLIENT_ID}`;
const GITHUB_CLIENT_SECRET = `${process.env.GITHUB_CLIENT_SECRET}`;


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true
    },
    async (req: Express.Request, accessToken: string, refreshToken: string, profile: any, done: (err?: Error | null, profile?: any) => void) => {
        addNewUser(profile._json.id, profile._json.name);
        return getUserById(profile._json.id, done);
    }
);


const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
