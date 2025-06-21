document.addEventListener("DOMContentLoaded", function () {
  var myImages = [
    "https://sam-wade-bc.github.io/grp109/team_project/images/samW.png",
    "https://sam-wade-bc.github.io/grp109/team_project/images/navdeepS.png"
  ];

  var captions = [
    "Sam Wade: Team Leader, Home Page, Subscriptions, Custom Workouts",
    "Navdeep Singh: Design Leader, Layout, Subscriptions"
  ];

  var altText = [
    "Picture of Sam Wade",
    "Picture of Navdeep Singh"
  ];

  var index = 0;
  var timerDuration = 4000;
  var countdown = timerDuration / 1000;
  var timerInterval;

  var timerDisplay = document.getElementById("timer");
  var nextButton = document.getElementById("next");
  var previousButton = document.getElementById("previous");
  var auto = document.getElementById("auto");

  document.getElementById("auto").addEventListener("change", autoSlide);
  previousButton.addEventListener("click", back, false);
  nextButton.addEventListener("click", next, false);

  function updateImage() {
    document.getElementById("slideshow").src = myImages[index];
    document.getElementById("slideshow").alt = altText[index];
    document.getElementById("caption").textContent = captions[index];
  }

  function next() {
    if (auto.checked) startTimer();
    index = (index + 1) % myImages.length;
    updateImage();
  }

  function back() {
    if (auto.checked) startTimer();
    index = (index - 1 + myImages.length) % myImages.length;
    updateImage();
  }

  function autoSlide() {
    if (auto.checked) {
      next();
      startTimer();
    } else {
      stopTimer();
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
      duration--;
      if (duration < 0) {
        duration = countdown;
        next();
      }
    }, 1000);
  }

  updateImage(); // Initialize on first load
});
