let dataBlog = [];

function addBlog(event) {
  event.preventDefault();

  let project = document.getElementById("name").value;
  let startdate = document.getElementById("start-date").value;
  let enddate = document.getElementById("end-date").value;
  let description = document.getElementById("description").value;
  let reactjs = document.getElementById("react-js").checked;
  let javascript = document.getElementById("js").checked;
  let android = document.getElementById("android").checked;
  let nodejs = document.getElementById("node-js").checked;
  let image = document.getElementById("upload-image").files;

  if (project === "") {
    alert("Please input your project name or title");
    return;
  }
  if (startdate === "") {
    alert("When did you start this project?");
    return;
  }
  if (enddate === "") {
    alert("When did you finish this project?");
    return;
  }
  if (description === "") {
    alert("Please describe this project.");
    return;
  }
  if (image.length === 0) {
    alert("Please attach an image of your project.");
    return;
  }

  let imageUrl = URL.createObjectURL(image[0]);

  if (reactjs) {
    reactjs = `<i class="fa-brands fa-react"></i>`;
  } else {
    reactjs = ``;
  }

  if (javascript) {
    javascript = `<i class="fa-brands fa-js"></i>`;
  } else {
    javascript = ``;
  }

  if (android) {
    android = `<i class="fa-brands fa-android"></i>`;
  } else {
    android = ``;
  }

  if (nodejs) {
    nodejs = `<i class="fa-brands fa-node-js"></i>`;
  } else {
    nodejs = ``;
  }

  let inputstartdate = new Date(startdate);
  let inputenddate = new Date(enddate);

  let test = ``;

  let timedistance = inputenddate - inputstartdate;

  let distanceseconds = Math.floor(timedistance / 1000);
  let distanceminutes = Math.floor(distanceseconds / 60);
  let distancehours = Math.floor(distanceminutes / 60);
  let distancedays = Math.floor(distancehours / 24);
  let distanceweeks = Math.floor(distancedays / 7);
  let distancemonths = Math.floor(distanceweeks / 4);
  let distanceyears = Math.floor(distancemonths / 12);

  if (distanceseconds >= 60 && distanceminutes < 60) {
    test = `${distanceminutes} menit`;
  } else if (distanceminutes >= 60 && distancehours < 24) {
    test = `${distancehours} jam`;
  } else if (distancehours >= 24 && distancedays < 7) {
    test = `${distancedays} hari`;
  } else if (distancedays >= 7 && distanceweeks < 4) {
    test = `${distanceweeks} minggu`;
  } else if (distanceweeks >= 4 && distancemonths < 12) {
    test = `${distancemonths} bulan`;
  } else if (distancemonths >= 12) {
    test = `${distanceyears} tahun`;
  }

  let blog = {
    project,
    startdate,
    enddate,
    description,
    reactjs,
    javascript,
    android,
    nodejs,
    image: imageUrl,
    test,
  };

  dataBlog.push(blog);
  renderBlog();
}

function renderBlog() {
  document.getElementById("projectlagi").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    document.getElementById("projectlagi").innerHTML += `<div class="project1">
                <img src="${dataBlog[index].image}" alt=""/>
                <h3>${dataBlog[index].project}</h3>
                <h5>Durasi: ${dataBlog[index].test}</h5> <!-- Correctly reference the duration -->
                <h5>${dataBlog[index].description}</h5>
                <div class="icon">
                  ${dataBlog[index].reactjs}
                  ${dataBlog[index].javascript}
                  ${dataBlog[index].android}
                  ${dataBlog[index].nodejs}
                </div>    
                <div class="btn">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
        </div>`;
  }
}
