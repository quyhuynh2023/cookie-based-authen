import express from "express";
import { v4 as uuidv4 } from "uuid";
import attachCookie from "./utils/attachCookie.js";
import morgan from "morgan";
const app = express();
// since it's only a logger so we can also use "dev" in production to log our requests.
app.use(morgan("dev"));
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const sessions = {}; // store

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  console.log(username !== "admin" && password !== "admin");
  if (username !== "admin" || password !== "admin") {
    return res.status(401).send("invalid username or password");
  }
  const sessionId = uuidv4();
  sessions[sessionId] = { username, userId: 1 };
  attachCookie({ res, sessionId });
  res.send("success");
});

app.get("/jobs", (req, res) => {
  const sessionId = req.headers?.cookie?.split("=")[1];
  const verifySession = sessions[sessionId];
  if (!verifySession) {
    console.log(verifySession);
    return res.status(401).send("invalid session");
  }
  const userId = verifySession.userId;
  res.send([
    {
      id: 1,
      title: "learn nodejs",
      userId,
    },
  ]);
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
