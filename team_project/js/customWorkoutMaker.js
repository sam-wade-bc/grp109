// Load the resources data from a local file using CommonJS require
var resources = require("./js/database.js");

// Wait until the HTML document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("workoutForm");

  // Get URL parameters from the browser address bar
  var params = new URLSearchParams(window.location.search);

  // Extract selected workout values
  var area = params.get("area");
  var goal = params.get("goal");
  var time = params.get("time");

  // If all required fields are filled
  if (area && goal && time) {
    var tags = [area, goal, time];
    displayTags(tags);
    loadMatchingResources(tags);
  }
});

// Show selected tags on the page
function displayTags(tags) {
  var container = document.getElementById("tagsContainer");
  container.innerHTML = "";

  tags.forEach(function (tag) {
    var span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    container.appendChild(span);
  });
}

// Display matching workout resources
function loadMatchingResources(tags) {
  var container = document.getElementById("videoContainer");
  container.innerHTML = "";

  if (!Array.isArray(resources)) {
    container.innerHTML = "<p>Error loading workout resources.</p>";
    console.error("Resources is not an array:", resources);
    return;
  }

  var matches = resources.filter(function (resource) {
    return tags.every(function (tag) {
      return resource.tags.indexOf(tag) !== -1;
    });
  });

  var topResults = matches.slice(0, 2);

  if (topResults.length === 0) {
    container.innerHTML = "<p>No matching resources found.</p>";
    return;
  }

  topResults.forEach(function (resource) {
    var div = document.createElement("div");
    div.className = "resource";
    div.innerHTML =
      '<h3><a href="' + resource.link + '" target="_blank">' + resource.title + '</a></h3>' +
      '<p>' + resource.description + '</p>' +
      '<p><strong>Tags:</strong> ' + resource.tags.join(", ") + '</p>';
    container.appendChild(div);
  });
}

// CommonJS export in ES5 syntax
module.exports = {
  displayTags: displayTags,
  loadMatchingResources: loadMatchingResources
};
