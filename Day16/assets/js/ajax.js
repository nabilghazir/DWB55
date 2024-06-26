const janji = new Promise((resolve, reject) => {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "https://api.npoint.io/f82dfdbe992eded8cfff", true);
  xhttp.onload = function () {
    if (xhttp.status === 200) {
      resolve(JSON.parse(xhttp.responseText));
    } else if (xhttp.status >= 400) {
      reject("Data Error!!!");
    }
  };
  xhttp.onerror = function () {
    reject("Network Error!!!");
  };
  xhttp.send();
});

let testimonialGroup = [];

async function getGroup() {
  try {
    const response = await janji;
    console.log(response);
    testimonialGroup = response;
    buttonTestimonial();
  } catch (err) {
    console.log(err);
  }
}

getGroup();

function buttonTestimonial() {
  let testimonialAja = "";

  testimonialGroup.forEach((kotak) => {
    testimonialAja += `<div class="card" style="width: 200px; height: 50px">
  <img src="${kotak.image}" class="card-img-top" style="width:100%; height:200px;" alt="img">
  <div class="card-body">
    <p class="card-text">${kotak.quote}</p>
    <h5 class="card-title">${kotak.user}</h5>
    <p class="user">${kotak.rating} <i class="fa-sharp fa-regular fa-star" style="color: #ff4500;"></i> </p>
  </div>
</div>`;
  });

  document.getElementById("container-grid").innerHTML = testimonialAja;
}

function ratingTestimonial(rating) {
  let filterTestimonialAja = "";

  const udahdiFilter = testimonialGroup.filter((kotak) => {
    return kotak.rating === rating;
  });

  udahdiFilter.forEach((kotak) => {
    filterTestimonialAja += `<div class="col-md-6 col-lg-4 mb-4">
  <div class="card shadow-sm">
      <img src="${kotak.image}"
           alt="testimonial" class="card-img-top">
      <div class="card-body">
          <p class="card-text">${kotak.quote}</p>
          <p class="card-text text-end font-weight-bold">- ${kotak.user}</p>
          <p class="card-text text-end font-weight-bold">${kotak.rating} <i class="fa-sharp fa-regular fa-star"></i></p>
      </div>
  </div>
</div>`;
  });

  {
    /* <div class="card" style="width: 18rem;">
  <img src="${kotak.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <p class="card-text">${kotak.quote}</p>
    <h5 class="card-title">${kotak.user}</h5>
    <p class="user">${kotak.rating} <i class="fa-sharp fa-regular fa-star" style="color: #ff4500;"></i> </p>
  </div>
</div> */
  }

  document.getElementById("container-grid").innerHTML = filterTestimonialAja;
}
