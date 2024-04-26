import express from "express";
import passport from "passport";
import { Token } from "../controllers/Oauth/strategies/google";

const router = express.Router();

// -------------- google part
router.get("/auth/google", passport.authenticate("google"), (req, res) =>
  res.send(200)
);
router.get("/redirect/google", function (req, res, next) {
  passport.authenticate("google", function (err: Error, token: Token) {
    if (err) {
      return next(err);
    }
    if (!token) {
      return res.redirect("/register");
    }
    return res.redirect(
      process.env.FRONT_END_URL + "register" + "?token=" + token.token
    );
  })(req, res, next);
});

// -------------- github part
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  (req, res) => {
    return res.send(200);
  }
);
router.get("/auth/github/callback", function (req, res, next) {
  passport.authenticate("github", function (err: Error, token: Token) {
    if (err) {
      return next(err);
    }
    if (!token) {
      return res.redirect("/register");
    }
    return res.redirect(
      process.env.FRONT_END_URL + "register" + "?token=" + token.token
    );
  })(req, res, next);
});

export default router;
