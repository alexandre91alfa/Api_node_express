const express = require("express");
const userRouter = require("./routers/user-router");
const bodyParse = require("body-parser");
const app = express();
const PORT = 3003;
const HOST = "127.0.0.1";

app.use(bodyParse.urlencoded({ extended: false }));

userRouter(app);

app.get("/", (req, resp) => {
  resp.send("alexandre");
});

app.listen(PORT, HOST, () => {
  console.log(`Api rodando na porta ${PORT}...`);
});
