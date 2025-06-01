import resources from "./js/database.js";

document.addEventListener("DOMContentLoaded", () => {
  var button = document.getElementById("generateButton");

  button.addEventListener("click", () => {
    var area = document.getElementById('area').value;
    var goal = document.getElementById('goal').value;
    var time = document.getElementById('time').value;

    if (!area || !goal || !time) {
      alert("Please fill in all fields!");
      return;
    }

    var tags = [area, goal, time];
    displayTags(tags);
    loadMatchingResources(tags);
  });
});

function displayTags(tags) {
  var container = document.getElementById("tagsContainer");
  container.innerHTML = "";
  tags.forEach(tag => {
    var span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    container.appendChild(span);
  });
}

function loadMatchingResources(tags) {
  var container = document.getElementById("videoContainer");
  container.innerHTML = "";

  var matches = resources.filter(resource =>
    tags.every(tag => resource.tags.includes(tag))
  );

  var topResults = matches.slice(0, 2);

  if (topResults.length === 0) {
    container.innerHTML = "<p>No matching resources found.</p>";
    return;
  }

  topResults.forEach(resource => {
    var div = document.createElement("div");
    div.className = "resource";
    div.innerHTML = `
      <h3><a href="${resource.link}" target="_blank">${resource.title}</a></h3>
      <p>${resource.description}</p>
      <p><strong>Tags:</strong> ${resource.tags.join(", ")}</p>
    `;
    container.appendChild(div);
  });
}
