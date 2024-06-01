document.addEventListener('DOMContentLoaded', () => {
    user(); // Call the user function once the page has loaded
  });

let userDataArray = []; // Array to store user data
let userCount = 0; // Counter for the number of times the user function is called

const img = document.getElementById('profil')
const name = document.getElementById('name')
const age = document.getElementById('age')
const from = document.getElementById('from')
const like = document.getElementById('heart')
const dislike = document.getElementById('x')
const superLike = document.getElementById ('star')
const rewind = document.getElementById ('repeat')
const matchImg = document.querySelector ('.match');
const container = document.querySelector('.container');
const matchCounter = document.getElementById( 'matches-count' )
let matchesCount = 0;

const user = async() => {

    const data = await fetch('https://randomuser.me/api/')
    const res = await data.json()
    const userData = res.results [0]

     // Save the current user data to the array
    userDataArray.push(userData);

    img.src = userData.picture.large;
    name.textContent =  `${userData.name.first} ${userData.name.last}`
    age.textContent= `Age : ${userData.dob.age}`
    from.textContent = `From : ${ userData.location.city}, ${userData.location.country}`
      
    console.log(userData)

    userCount++;
    
    if (userCount === 5) {
        showMatchImg();
        userCount = 0;
        }
};

// Functions that handle clicks on buttons
  
like.addEventListener('click', () => {
    // Add a class to the container for the swipe animation
    container.classList.add('swipe-right');
  
    // Wait for the animation to complete before removing the class and transitioning to the next user
    setTimeout(() => {
      container.classList.remove('swipe-right');
      user();
      resetMatchImgStyle();
    }, 500); // Adjust the timeout based on your animation duration
  });
  
  
dislike.addEventListener('click', () => {
    // Add a class to the container for the swipe animation
    container.classList.add('swipe-left');
  
    // Wait for the animation to complete before removing the class and transitioning to the next user
    setTimeout(() => {
      container.classList.remove('swipe-left');
      user();
      resetMatchImgStyle(); // Reset matchImgStyle after loading the new user
    }, 500); // Adjust the timeout based on your animation duration

    // Reset superLikeCount to prevent showMatchImg from being called
    superLikeCount = 0;
  });
    
  let superLikeCount = 0;

superLike.addEventListener('click', () => {
    user();
    checkShowMatchImg();
  });

rewind.addEventListener( 'click', ()=> {
    if (userDataArray.length > 1) {
        userDataArray.pop();
    
    // Use the previous user data
    const previousUserData = userDataArray[userDataArray.length - 1];
    img.src = previousUserData.picture.large;
    name.textContent = `${previousUserData.name.first} ${previousUserData.name.last}`;
    age.textContent = `Age: ${previousUserData.dob.age}`;
    from.textContent = `From: ${previousUserData.location.city}, ${previousUserData.location.country}`;

    console.log(previousUserData);
    }
});

function showMatchImg() {
    matchImg.style.display = 'block';
    updateMatchesCount();
  
    setTimeout(() => {
      matchImg.style.display = 'none';
      resetMatchImgStyle();
    }, 2000);
  }

  function resetMatchImgStyle() {
    matchImg.style.opacity = 0;
    matchImg.style.transform = 'translate(-50%, -50%) scale(0.8)';
  }

  function updateMatchesCount() {
    matchesCount++;
    matchCounter.textContent = matchesCount;
  
    // Add the jump-animation class to the entire matches-counter div
    document.getElementById('tinder-icon').classList.add('jump-animation');
  
    // After the animation duration, remove the class
    setTimeout(() => {
        document.getElementById('tinder-icon').classList.remove('jump-animation');
      }, 700); // Adjust the timeout based on your animation duration  
    }
  
    function checkShowMatchImg() {
        if (superLikeCount === 5) {
          showMatchImg();
          superLikeCount = 0;
        }
      }
