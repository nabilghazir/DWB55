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
  const query = `SELECT * FROM "projectss"`;

  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });
  res.render("index", { data: obj });
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

  const query = `
  INSERT INTO "projectss" (
    projectname, startdate, enddate, description, nodejs, reactjs, javascript, android, duration, "createdAt", "updatedAt"
  ) VALUES (
    '${projectname}', '${startdate}', '${enddate}', '${description}', 
    ${nodejs ? true : false}, ${reactjs ? true : false}, ${
    javascript ? true : false
  }, ${android ? true : false}, ${duration},
    '${datemodif}', '${datemodif}'
  )
`;
  const obj = await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("/");
}

function projectDetail(req, res) {
  const { id } = req.params;

  const detail = data[id];

  console.log("Project detail terpenuhi", detail);

  res.render("myproject-detail", { detail });
}

async function projectDetail(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "projectss" WHERE id='${id}'`;
  const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("myproject-detail", { detail: obj[0] });
}

async function editProjectView(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM "projectss" WHERE id='${id}'`;
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

  const query = `
  UPDATE "projectss" SET projectname='${projectname}', startdate='${startdate}', enddate='${enddate}', description='${description}', nodejs='${
    nodejs ? true : false
  }', reactjs='${reactjs ? true : false}', javascript='${
    javascript ? true : false
  }', android='${
    android ? true : false
  }', duration='${duration}', "createdAt"='${datemodif}', "updatedAt"='${datemodif}' WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });

  res.redirect("/");
}

async function deleteProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM "projectss" WHERE id=${id} `;
  await sequelize.query(query, { type: QueryTypes.DELETE });

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
