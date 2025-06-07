 // Load the workout resource data
import resources from './database.js'; 

// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get query parameters from the URL
  var params = new URLSearchParams(window.location.search);

  // Extract values for area, goal, and time from the URL
  var area = params.get('area');
  var goal = params.get('goal');
  var time = params.get('time');

  // If all three values are present, generate tags and load matching resources
  if (area && goal && time) {
    var tags = [area, goal, time];  // Create an array of selected filters
    displayTags(tags);              // Display the selected tags on the page
    loadMatchingResources(tags);    // Find and display matching workout resources
  }
});

// Display tags below the form as visual feedback
function displayTags(tags) {
  var container = document.getElementById('tagsContainer');
  container.innerHTML = '';  // Clear any previous tags

  // Create and append a span for each tag
  tags.forEach(function (tag) {
    var span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    container.appendChild(span);
  });
}

// Find and display the top matching resources
function loadMatchingResources(tags) {
  var container = document.getElementById('videoContainer');
  container.innerHTML = '';  // Clear previous results

  // Check if resources is a valid array
  if (!Array.isArray(resources)) {
    container.innerHTML = '<p>Error loading workout resources.</p>';
    console.error('Resources is not an array:', resources);
    return;
  }

  // Filter resources that contain all selected tags
  var matches = resources.filter(function (resource) {
    return tags.every(function (tag) {
      return resource.tags.indexOf(tag) !== -1;
    });
  });

  // Take the top 2 matching resources
  var topResults = matches.slice(0, 2);

  // Show message if no matches found
  if (topResults.length === 0) {
    container.innerHTML = '<p>No matching resources found.</p>';
    return;
  }

  // Display each matching resource
  topResults.forEach(function (resource) {
    var div = document.createElement('div');
    div.className = 'resource';
    div.innerHTML =
      '<h3><a href="' + resource.link + '" target="_blank">' + resource.title + '</a></h3>' +
      '<p>' + resource.description + '</p>' +
      '<p><strong>Tags:</strong> ' + resource.tags.join(', ') + '</p>';
    container.appendChild(div);
  });
}
