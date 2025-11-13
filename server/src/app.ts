import express, { type Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import handleError from "./middlewares/handleError.js";
import { AuthRouter } from "./modules/auth/auth.routes.js";
import { UserRouter } from "./modules/user/user.routes.js";
import { ServiceRouter } from "./modules/service/service.routes.js";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/service", ServiceRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(handleError);

export default app;
