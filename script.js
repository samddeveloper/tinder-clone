
const cardContainer = document.querySelector(".card-container");
const nextButton = document.querySelector(".next");
const likeButton = document.querySelector('.like');
const container = document.querySelector('.container');
const matchElement = document.querySelector('.match');
const matchImage = matchElement.querySelector('img');


const createCard = (person) => {
    
    const imgContainer = document.querySelector(".img-container");
    const textContainer = document.querySelector(".text-container");
    
    
    const img = document.createElement("img");
    img.classList.add("card-img");
    img.src = person.picture.large;
  
    
    const name = `${person.name.first} ${person.name.last}`;
    const age = `${person.dob.age}`;
    const location = `${person.location.country},${person.location.city} `;

    
    
    imgContainer.innerHTML = "";
    imgContainer.appendChild(img);
    
    textContainer.innerHTML = "";
    textContainer.innerHTML = `<p class="card-title">${name}</p><p class="age">Age: ${age}</p><p class="card-location">From: ${location}</p>`;
  };


const fetchData = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const person = data.results[0];
    createCard(person);
    
    nextButton.disabled = true;
    setTimeout(() => {
      nextButton.disabled = false;
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};


fetchData();


nextButton.addEventListener("click", async () => {
    try {
      
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const person = data.results[0];
  
      
      createCard(person);

    } catch (error) {
      console.log(error);
    }
  });
  
  likeButton.addEventListener('click', () => {
    // Show the match image with a 60% chance
    const showMatch = Math.random() < 0.6;
    if (showMatch) {
      matchElement.classList.add('show');
      setTimeout(() => {
        matchElement.classList.remove('show');
        matchElement.classList.add('hide');
        setTimeout(() => {
          matchElement.classList.remove('hide');
          
          fetchData();
        }, 500);
      }, 2000);
    } else {
      
      fetchData();
    }
  });
  
  
  
  
  

