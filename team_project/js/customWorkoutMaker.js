var resources = require('./database.js');

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var area = params.get('area');
  var goal = params.get('goal');
  var time = params.get('time');

  if (area && goal && time) {
    var tags = [area, goal, time];
    displayTags(tags);
    loadMatchingResources(tags);
  }
});

function displayTags(tags) {
  var container = document.getElementById('tagsContainer');
  container.innerHTML = '';
  tags.forEach(function (tag) {
    var span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    container.appendChild(span);
  });
}

function loadMatchingResources(tags) {
  var container = document.getElementById('videoContainer');
  container.innerHTML = '';

  var matches = resources.filter(function (resource) {
    return tags.every(function (tag) {
      return resource.tags.includes(tag);
    });
  }).slice(0, 2);

  if (matches.length === 0) {
    container.innerHTML = '<p>No matching resources found.</p>';
    return;
  }

  matches.forEach(function (resource) {
    var div = document.createElement('div');
    div.className = 'resource';
    div.innerHTML =
      '<h3><a href="' + resource.link + '" target="_blank">' + resource.title + '</a></h3>' +
      '<p>' + resource.description + '</p>' +
      '<p><strong>Tags:</strong> ' + resource.tags.join(', ') + '</p>';
    container.appendChild(div);
  });
}
