const fs = require("fs");
const { join } = require("path");

function compare(a, b) {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

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
    const id = req.params.id - 1;
    let users = !Number.isNaN(id) ? getUsers()[id] : getUsers();
    users = users.sort(compare);
    resp.send({ users });
  });
  app.route("/insert").post((req, resp) => {
    const users = getUsers();
    users.push(req.body);
    saveUser(users);
    resp.status(201).send("OK");
  });
  app.route("/update/:id?").put((req, resp) => {
    const users = getUsers();
    const id = req.params.id;

    saveUser(
      users.map(user => {
        if (user.id === id) {
          return {
            ...user,
            ...req.body
          };
        }
        return user;
      })
    );
    resp.status(201).send("OK");
  });
  app.route("/del/:id?").delete((req, resp) => {
    const users = getUsers();
    const id = req.params.id;

    const v = users.filter(user => user.id !== id);
    saveUser(v);
    resp.status(201).send("OK");
  });
};

module.exports = userRoute;
