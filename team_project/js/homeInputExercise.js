document.getElementById('goalForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const input = document.getElementById('userInput').value.trim();

  if (!input) {
    document.getElementById('output').textContent = 'Please enter a goal!';
    return;
  }

  const response = `Awesome! We recommend starting with workouts tailored to: "${input}". Check out the Featured Workouts section above!`;
  document.getElementById('output').textContent = response;
});
