const express = require("express");
const path = require("path");
const { Sequelize, QueryTypes } = require("sequelize");
const config = require("./config/config.json");
const sequelize = new Sequelize(config.development);

const app = express();

const port = 5001;

const data = [];

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/assets/views"));

app.use("/assets", express.static(path.join(__dirname, "/assets")));

app.use(express.urlencoded({ extended: false }));

app.get("/", home);
app.get("/add-project", viewProject);
app.post("/add-project", addProject);
app.get("/myproject-detail/:id", projectDetail);
app.get("/edit-project/:id", editProjectView);
app.post("/edit-project", editProject);
app.post("/delete-project/:id", deleteProject);
app.get("/testimonial", testimonial);
app.get("/contact", contactme);

function home(req, res) {
  res.render("index", { data });
}

async function home(req, res) {
  const query = `SELECT * FROM "projects"`;

  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  res.render("index", { data: obj });
}

function viewProject(req, res) {
  res.render("add-project");
}

function addProject(req, res) {
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

  const dataBlog = {
    projectname,
    startdate,
    enddate,
    description,
    technologies: {
      nodejs: nodejs ? true : false,
      javascript: javascript ? true : false,
      reactjs: reactjs ? true : false,
      android: android ? true : false,
    },
  };

  data.unshift(dataBlog);
  console.log("Data success!", data);

  res.redirect("/");
}

function projectDetail(req, res) {
  const { id } = req.params;

  const detail = data[id];

  console.log("Project detail terpenuhi", detail);

  res.render("myproject-detail", { detail });
}

function editProjectView(req, res) {
  const { id } = req.params;

  const datafilter = data[parseInt(id)];
  datafilter.id = parseInt(id);
  res.render("edit-project", { data: datafilter });
}

function editProject(req, res) {
  const {
    id,
    projectname,
    startdate,
    enddate,
    description,
    nodejs,
    javascript,
    reactjs,
    android,
  } = req.body;

  data[parseInt(id)] = {
    projectname,
    startdate,
    enddate,
    description,
    technologies: {
      nodejs: nodejs ? true : false,
      javascript: javascript ? true : false,
      reactjs: reactjs ? true : false,
      android: android ? true : false,
    },
  };
  console.log("Project ID:", id);
  console.log("Project name:", projectname);
  console.log("Start Date:", startdate);
  console.log("End Date:", enddate);
  console.log("Description:", description);
  console.log("Node JS:", nodejs ? true : false);
  console.log("JavaScript:", javascript ? true : false);
  console.log("React JS:", reactjs ? true : false);
  console.log("Android:", android ? true : false);

  res.redirect("/");
}

function deleteProject(req, res) {
  const { id } = req.params;

  console.log("Before :", data);
  data.splice(id, 1);
  console.log("After :", data);
  res.redirect("/");
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
