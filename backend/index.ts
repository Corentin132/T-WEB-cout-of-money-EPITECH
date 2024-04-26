import { config } from "dotenv";
config();
import express, { Application } from "express";
import morgan from "morgan";
import Router from "./routes";
import usersRouter from "./routes/users.routes";
import oauth from "./routes/oauth.routes";
import swaggerUi from "swagger-ui-express";
import cryptosRouter from "./routes/cryptos.routes";
import rss from "./routes/flux-rss.routes"; 

import passport from "passport";

const cors = require("cors");
require("./controllers/Oauth/strategies/google");
require("./controllers/Oauth/strategies/github");
const PORT = 4000;

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(Router);
app.use(passport.initialize());
app.use(usersRouter);
app.use(oauth);
app.use(rss)

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

app.use("/", cryptosRouter);
