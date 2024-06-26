const express = require("express");
const path = require("path");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const session = require("express-session");
const upload = require("./assets/middleware/uploadfile");

const app = express();

const port = 5001;

const data = [];

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/assets/views"));

app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    name: "admin",
    secret: "ngr261027",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

function auth(req, res, next) {
  console.log("Auth middleware:", req.session.isLogin);
  if (req.session.isLogin) {
    return next();
  }
  req.flash("danger", "You must be logged in to view this page.");
  res.redirect("/login");
}

app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin || false;
  res.locals.users = req.session.user || {};
  next();
});

app.use(flash());

app.get("/", home);
app.get("/add-project", auth, viewProject);
app.post("/add-project", auth, upload.single("image"), addProject);
app.get("/myproject-detail/:id", auth, projectDetail);
app.get("/edit-project/:id", auth, editProjectView);
app.post("/edit-project", auth, editProject);
app.post("/delete-project/:id", auth, deleteProject);
app.get("/testimonial", testimonial);
app.get("/contact", contactme);
app.get("/login", loginView);
app.post("/login", login);
app.get("/register", registerView);
app.post("/register", register);
app.get("/logout", logout);

function home(req, res) {
  res.render("index", { users, isLogin });
}

async function home(req, res) {
  const query = `SELECT "users".username, "projects".* FROM "users" RIGHT JOIN "projects" ON "users".username = projects.author`;

  const isLogin = req.session.isLogin;
  const user = req.session.users;

  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  res.render("index", { data: obj, isLogin, user });
}

function viewProject(req, res) {
  res.render("add-project");
}

async function addProject(req, res) {
  const {
    projectname,
    startdate,
    enddate,
    description,
    nodejs,
    javascript,
    reactjs,
    android,
  } = req.body;

  console.log("Project name:", projectname);
  console.log("Start Date:", startdate);
  console.log("End Date:", enddate);
  console.log("Description:", description);
  console.log("Node JS:", nodejs ? true : false);
  console.log("JavaScript:", javascript ? true : false);
  console.log("React JS:", reactjs ? true : false);
  console.log("Android:", android ? true : false);

  const date = new Date();
  const datemodif = date.toISOString().slice(0, 16).replace("T", " ");

  const startd = new Date(startdate);
  const endd = new Date(enddate);

  const startYear = startd.getFullYear();
  const startMonth = startd.getMonth();
  const endYear = endd.getFullYear();
  const endMonth = endd.getMonth();

  const totalMonthsStart = startYear * 12 + startMonth;
  const totalMonthsEnd = endYear * 12 + endMonth;
  const duration = totalMonthsEnd - totalMonthsStart;

  console.log("Duration (months):", duration);

  const image = req.file.filename;
  const authorName = req.session.users.username;

  const query = `
  INSERT INTO "projects" (
  author,projectname, startdate, enddate, description, nodejs, reactjs, javascript, android, duration,image, "createdAt", "updatedAt"
) VALUES (
  '${authorName}','${projectname}', '${startdate}', '${enddate}', '${description}', 
  ${nodejs ? true : false}, ${reactjs ? true : false}, ${
    javascript ? true : false
  }, ${android ? true : false}, ${image}, ${duration},
  '${datemodif}', '${datemodif}'
)
`;
  const obj = await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("/");
}

// function projectDetail(req, res) {
//   const { id } = req.params;

//   const detail = data[id];

//   console.log("Project detail terpenuhi", detail);

//   res.render("myproject-detail", { detail });
// }

async function projectDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "projects" WHERE id= :id`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("myproject-detail", { detail: obj[0] });
}

async function editProjectView(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "projects" WHERE id= :id`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log(obj);

  res.render("edit-project", { data: obj[0] });
}

async function editProject(req, res) {
  const {
    projectname,
    startdate,
    enddate,
    description,
    nodejs,
    javascript,
    reactjs,
    android,
    id,
  } = req.body;

  console.log("Project name:", projectname);
  console.log("Start Date:", startdate);
  console.log("End Date:", enddate);
  console.log("Description:", description);
  console.log("Node JS:", nodejs ? true : false);
  console.log("JavaScript:", javascript ? true : false);
  console.log("React JS:", reactjs ? true : false);
  console.log("Android:", android ? true : false);

  const date = new Date();
  const datemodif = date.toISOString().slice(0, 16).replace("T", " ");

  const startd = new Date(startdate);
  const endd = new Date(enddate);

  const startYear = startd.getFullYear();
  const startMonth = startd.getMonth();
  const endYear = endd.getFullYear();
  const endMonth = endd.getMonth();

  const totalMonthsStart = startYear * 12 + startMonth;
  const totalMonthsEnd = endYear * 12 + endMonth;
  const duration = totalMonthsEnd - totalMonthsStart;

  console.log("Duration (months):", duration);

  const image = req.file.filename;
  const authorName = req.session.users.username;

  const query = `
  UPDATE "projects" SET author'${authorName}',projectname='${projectname}', startdate='${startdate}', enddate='${enddate}', description='${description}', nodejs='${
    nodejs ? true : false
  }', reactjs='${reactjs ? true : false}', javascript='${
    javascript ? true : false
  }', android='${
    android ? true : false
  }', duration='${duration}','image=${image}' "createdAt"='${datemodif}', "updatedAt"='${datemodif}' WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/");
}

async function deleteProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM "projectss" WHERE id=${id} `;
  await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/");
}

function loginView(req, res) {
  res.render("login");
}

async function login(req, res) {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = :email`;
  const obj = await sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: { email },
  });

  if (!obj.length) {
    req.flash("danger", "Login Failed: Email is wrong!");
    return res.redirect("/login");
  }

  bcrypt.compare(password, obj[0].password, (err, result) => {
    if (err) {
      req.flash("danger", "Login Failed: Internal Server Error");
      return res.redirect("/login");
    }

    if (result) {
      req.session.isLogin = true;
      req.session.user = {
        id: obj[0].id,
        username: obj[0].username,
        email: obj[0].email,
      };
      req.session.save(() => {
        req.flash("success", "Login Successful!");
        res.redirect("/");
      });
    } else {
      req.flash("danger", "Login Failed: Password is wrong!");
      res.redirect("/login");
    }
  });
}

function registerView(req, res) {
  res.render("register");
}

async function register(req, res) {
  const { username, email, password } = req.body;
  const crypt = 10;

  bcrypt.hash(password, crypt, async (err, hash) => {
    if (err) throw err;

    const query = `
      INSERT INTO users (username, email, password)
      VALUES (:username, :email, :password)
    `;

    try {
      await sequelize.query(query, {
        type: QueryTypes.INSERT,
        replacements: { username, email, password: hash },
      });

      req.flash("success", "Register Successful!");
      res.redirect("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      req.flash("danger", "Register Failed!");
      res.redirect("/register");
    }
  });
}

function logout(req, res) {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function contactme(req, res) {
  res.render("contact");
}

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
