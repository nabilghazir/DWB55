// class Testimonial {
//   #quote = "";
//   #image = "";

//   constructor(satu, dua) {
//     this.#quote = satu;
//     this.#image = dua;
//   }

//   get dua() {
//     return this.#image;
//   }

//   get satu() {
//     return this.#quote;
//   }

//   get tiga() {
//     throw new Error("harus ada namanya");
//   }

//   get testimonialAja() {
//     return `<div class="container-grid-lagi" id="container-grid-lagi">
//             <img src="${this.dua}">
//             <p class="quote">${this.satu}</p>
//             <p class="usexr">- ${this.tiga}</p>
//             </div>
//             `;
//   }
// }

// class tigaTestimonial extends Testimonial {
//   #user = "";

//   constructor(tiga, satu, dua) {
//     super(satu, dua);
//     this.#user = tiga;
//   }

//   get tiga() {
//     return "user : " + this.#user;
//   }
// }

// class empatTestimonial extends Testimonial {
//   #company = "";

//   constructor(empat, satu, dua) {
//     super(satu, dua);
//     this.#company = empat;
//   }
//   get tiga() {
//     return "company : " + this.#company;
//   }
// }

// const testimonialPertama = new tigaTestimonial(
//   "Sayang 1",
//   "keren bangettt",
//   "https://images.unsplash.com/photo-1687441266692-de2df8197665?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=364&q=80"
// );

// const testimonialKedua = new tigaTestimonial(
//   "Sayang 2",
//   "duhh keren syekaliii",
//   "https://images.unsplash.com/photo-1679779092896-9a86d0fcbde6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
// );

// const testimonialKetiga = new empatTestimonial(
//   "Sayang 3",
//   "hmmm terlalu keren",
//   "https://images.unsplash.com/photo-1686695323307-b0dccdbe136d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80"
// );

// let testimonialPenampungan = [
//   testimonialPertama,
//   testimonialKedua,
//   testimonialKetiga,
// ];

// let testimonialAja = "";

// for (let i = 0; i < testimonialPenampungan.length; i++) {
//   testimonialAja += testimonialPenampungan[i].testimonialAja;
// }

// document.getElementById("container-grid").innerHTML = testimonialAja;

const testimonialGroup = [
  {
    user: "Sayang 1",
    quote: "keren bangettt",
    image:
      "https://images.unsplash.com/photo-1687441266692-de2df8197665?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=364&q=80",
    rating: 5,
  },
  {
    user: "Sayang 2",
    quote: "duhh keren syekaliii",
    image:
      "https://images.unsplash.com/photo-1679779092896-9a86d0fcbde6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    rating: 3,
  },
  {
    user: "Sayang 3",
    quote: "hmmm kerennn",
    image:
      "https://images.unsplash.com/photo-1686695323307-b0dccdbe136d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80",
    rating: 4,
  },
  {
    user: "Sayang 4",
    quote: "hm gmn yaaaa",
    image:
      "https://plus.unsplash.com/premium_photo-1671586882920-8cd59c84cdfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    rating: 2,
  },
  {
    user: "Sayang 5",
    quote: "gajelas kocak",
    image:
      "https://plus.unsplash.com/premium_photo-1671586882051-fa5d61654bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    rating: 1,
  },
];

function buttonTestimonial() {
  let testimonialAja = "";

  testimonialGroup.forEach((kotak) => {
    testimonialAja += `<div class="container-grid-lagi">
        <img src="${kotak.image}">
        <p class="quote">${kotak.quote}</p>
        <p class="user">- ${kotak.user}</p>
        <p class="user">${kotak.rating} <i class="fa-sharp fa-regular fa-star" style="color: #ff4500;"></i> </p>
        </div>`;
  });

  document.getElementById("container-grid").innerHTML = testimonialAja;
}

buttonTestimonial();

function ratingTestimonial(rating) {
  let filterTestimonialAja = "";

  const udahdiFilter = testimonialGroup.filter((kotak) => {
    return kotak.rating === rating;
  });

  udahdiFilter.forEach((kotak) => {
    filterTestimonialAja += `<div class="container-grid-lagi">
        <img src="${kotak.image}">
        <p class="quote">${kotak.quote}</p>
        <p class="user">- ${kotak.user}</p>
        <p class="user">${kotak.rating} <i class="fa-sharp fa-regular fa-star" style="color: #ff4500;"></i> </p>
        </div>`;
  });

  document.getElementById("container-grid").innerHTML = filterTestimonialAja;
}
