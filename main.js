const express = require("express");
const userRouter = require("./routers/user-router");
const bodyParse = require("body-parser");
const app = express();
const PORT = 3003;
const HOST = "127.0.0.1";

app.use(bodyParse.urlencoded({ extended: false }));
app.use(express.static("public"));

userRouter(app);

app.get("/", (req, resp) => {
  resp.sendFile(__dirname + "/index.html");
});

app.listen(PORT, HOST, () => {
  console.log(`Api rodando na porta ${PORT}...`);
});
