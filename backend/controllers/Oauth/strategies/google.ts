import passport from "passport";
import {
  Profile,
  VerifyCallback,
  Strategy as GoogleStrategy,
} from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
export interface Token {
  message: string;
  token: string;
}
var jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

export const createJwtToken = (id: string) => {
  return jwt.sign({ userId: id }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ["email", "profile"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      let token: Token = { message: "", token: "" };
      const email = profile.emails?.[0].value;
      const username = profile.username;

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
