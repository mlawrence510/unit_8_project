// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const back = document.querySelector('.back');
const forward = document.querySelector('.forward');

let currentIndex;



// fetch data from API

fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err))

//Display Employees

function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = '';
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    employeeHTML += `
  <div class="card" data-index="${index}">
  <img class="avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${city}</p>
  </div>
  </div>
`
  });
  gridContainer.innerHTML = employeeHTML;
}

//display popup

function displayModal(index) {
  let {
    name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
  let date = new Date(dob.date);
  const modalHTML = `
<img class="avatar" src="${picture.large}" />
<div class="text-container">
<h2 class="name">${name.first} ${name.last}</h2>
<p class="email">${email}</p>
<p class="address">${city}</p>
<hr />
<p>${phone}</p>
<p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
<p>Birthday:
${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
</div>
`;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

//open pop up

gridContainer.addEventListener('click', e => {
  if (e.target !== gridContainer) {
    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    currentIndex = index;
    displayModal(index);
  }
});

//scroll forward

back.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex --;
    displayModal(currentIndex);
  } else if (currentIndex === 0) {
    currentIndex = 11;
    displayModal(currentIndex);
  }

});

//scroll forward

forward.addEventListener('click', () => {
  if (currentIndex < 11) {
    currentIndex ++;
    displayModal(currentIndex);
  } else if (currentIndex === 11) {
    currentIndex = 0;
    displayModal(currentIndex);
  }

});

//close pop up

modalClose.addEventListener('click', () => {
  overlay.classList.add("hidden");
});

//people function

function searchPeople() {
  const input = document.querySelector('#employee-search').value.toUpperCase();
  const people = document.querySelectorAll('.card');

  for (i = 0; i < people.length; i++) {

    const names = document.querySelectorAll('.card')[i].children[1].children[0].textContent.toUpperCase();

    const indexSearch = names.indexOf(input);

    if (indexSearch > -1 ) {
      document.querySelectorAll('.card')[i].style.display = '';
    } else {
      document.querySelectorAll('.card')[i].style.display = 'none';
    }
  }
}

//search people event listener

document.querySelector('#employee-search').addEventListener("keyup", searchPeople);
