const resultContainer = document.querySelector('.result');
const searchInput = document.getElementById('searchProfil');
const sortSelect = document.getElementById('sortUser');
const loader = document.getElementById('loader');

let usersData = [];

// 🌀
function showLoader() {
  loader.style.display = 'block';
  resultContainer.style.display = 'none';
}


function hideLoader() {
  loader.style.display = 'none';
  resultContainer.style.display = 'grid';
}


function getUsers() {
  showLoader();
  fetch('https://randomuser.me/api/?results=100')
    .then(res => res.json())
    .then(data => {
      usersData = data.results;
      hideLoader();
      displayUsers(usersData);
    })
    .catch(err => {
      hideLoader();
      resultContainer.innerHTML = `<p>Xatolik yuz berdi: ${err.message}</p>`;
    });
}


function displayUsers(users) {
  resultContainer.innerHTML = '';

  if (users.length === 0) {
    resultContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">Hech narsa topilmadi 😕</p>`;
    return;
  }

  users.forEach(user => {
    const card = document.createElement('div');
    card.classList.add('user-card');
    card.innerHTML = `
      <img src="${user.picture.large}" alt="${user.name.first}">
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>Yosh: ${user.dob.age}</p>
      <p>Email: ${user.email}</p>
      <p>Gender: ${user.gender}</p>
      <p>City: ${user.location.city}</p>
      <p>Country: ${user.location.country}</p>
    `;
    resultContainer.appendChild(card);
  });
}


searchInput.addEventListener('input', () => {
  const searchValue = searchInput.value.toLowerCase();
  const filteredUsers = usersData.filter(user =>
    user.name.first.toLowerCase().includes(searchValue) ||
    user.name.last.toLowerCase().includes(searchValue)
  );
  displayUsers(filteredUsers);
});


sortSelect.addEventListener('change', () => {
  const value = sortSelect.value;
  let sortedUsers = [...usersData];

  if (value === 'name') {
    sortedUsers.sort((a, b) => a.name.first.localeCompare(b.name.first));
  } else if (value === 'age') {
    sortedUsers.sort((b, a) => a.dob.age - b.dob.age);
  }

  displayUsers(sortedUsers);
});

getUsers();
