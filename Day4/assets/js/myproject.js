let dataBlog = [];

function addBlog(event) {
  event.preventDefault();

  let project = document.getElementById("name").value;
  let startdate = document.getElementById("start-date").value;
  let enddate = document.getElementById("end-date").value;
  let description = document.getElementById("description").value;
  let reactjs = document.getElementById("node-js").checked;
  let javascript = document.getElementById("next-js").checked;
  let android = document.getElementById("react-js").checked;
  let nodejs = document.getElementById("type-script").checked;
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

  console.log(imageUrl);

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
  };

  dataBlog.push(blog);
  renderBlog();

  console.log(dataBlog);
}

function renderBlog() {
  document.getElementById("projectlagi").innerHTML = "";

  for (let index = 0; index < dataBlog.length; index++) {
    document.getElementById("projectlagi").innerHTML += `<div class="project1">
                <img src="${dataBlog[index].image}" alt=""/>
                <h3>${dataBlog[index].project}</h3>
                <h5>Durasi: 3 months</h5>
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
