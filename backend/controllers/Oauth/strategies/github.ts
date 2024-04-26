import passport from "passport";
import { PrismaClient } from "@prisma/client";
import { createJwtToken, Token } from "./google";
let GitHubStrategy = require("passport-github2").Strategy;

const prisma = new PrismaClient();
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_REDIRECT_URL,
      scope: ["user:email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      let token: Token = { message: "", token: "" };
      const email: string = profile.emails[0].value;
      const username: string = profile.username;

      try {
        const user = await prisma.user.findFirstOrThrow({
          where: {
            email: email,
          },
        });
        token.token = createJwtToken(user.id);
        token.message = "User logged in successfully";
      } catch (err) {
        const createUser = await prisma.user.create({
          data: {
            email: email!,
            username: username,
            password: accessToken,
          },
        });

        token.token = createJwtToken(createUser.id);
        token.message = "User logged in successfully";
      }

      done(null, token);
    }
  )
);
