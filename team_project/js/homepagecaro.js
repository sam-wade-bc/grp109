var myImages =
["https://sam-wade-bc.github.io/grp109/team_project/images/samW.png",
 "https://sam-wade-bc.github.io/grp109/team_project/images/navdeepS.png"];


var captions =
["Sam Wade: Team Leader, Home Page, Subscriptions, Custom Workouts",
 "Navdeep Singh: Design Leader, Layout, Subscriptions"];

var altText = 
["Picture of Sam Wade",
 "Picture of Navdeep Singh"];

 var index=0; 
 var timerDisplay = document.getElementById('timer');
 var timerDuration = 4000;
 var timerInterval;
 var nextButton = document.getElementById("next"); 
 var previousButton = document.getElementById("previous"); 
 var countdown = timerDuration/1000;
 var auto = document.getElementById("auto");
 document.getElementById("auto").addEventListener("change", autoSlide);

 function updateImage(){
 document.getElementById("slideshow").src = myImages[index];
 document.getElementById("slideshow").alt= altText[index];
 document.getElementById("caption").textContent = captions[index]; 
} 

function next(){
 if (auto.checked)
 startTimer();
 if (myImages.length == index+1)
 index=0;
 else
 index++;
 updateImage();
} 
 

function back(){
 if (auto.checked)
 startTimer();
 if (index===0)
 index=myImages.length-1;
 else
 index--;
 updateImage();
} 


previousButton.addEventListener("click",back,false);
nextButton.addEventListener("click",next,false); 

function autoSlide() {
  if (document.getElementById("auto").checked) {
    next(); // Go to next slide when checked
    startTimer(); // Start the timer
  } else {
    stopTimer(); // Stop the timer when checkbox is unchecked
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent = "Automatic Slides Paused";
}

function startTimer() {
  clearInterval(timerInterval);
  var duration = countdown; 
  timerInterval = setInterval(function () {
    timerDisplay.textContent = "Next slide in: " + duration + "s";
    duration--; // Decrement the duration
    if (duration < 0) {
      duration = countdown; // Reset the countdown after it reaches 0
      next(); // Move to the next slide
    }
  }, 1000);
}
