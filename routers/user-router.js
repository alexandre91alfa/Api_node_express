const fs = require("fs");
const { join } = require("path");

const filePath = join(__dirname, "users.json");

const getUsers = () => {
  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveUser = user =>
  fs.writeFileSync(filePath, JSON.stringify(user, null, "\t"));

const userRoute = app => {
  app.route("/users/:id?").get((req, resp) => {
    const users = getUsers();
    resp.send({ users });
  });
  app.route("/insert").post((req, resp) => {
    const users = getUsers();
    users.push(req.body);
    saveUser(users);
    resp.status(201).send("OK");
  });
  app.route("/up").put((req, resp) => {
    const users = getUsers();
  });
};

module.exports = userRoute;
