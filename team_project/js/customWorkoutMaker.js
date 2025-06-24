import { resources } from './database.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('workoutForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const area = document.getElementById('area').value;
    const goal = document.getElementById('goal').value;
    const time = document.getElementById('time').value;

    if (area && goal && time) {
      const tags = [area, goal, time];
      displayTags(tags);
      loadMatchingResources(tags);
    }
  });
});

function displayTags(tags) {
  const container = document.getElementById('tagsContainer');
  container.innerHTML = '';
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    container.appendChild(span);
  });
}

function loadMatchingResources(tags) {
  const container = document.getElementById('videoContainer');
  container.innerHTML = '';

  const matches = resources.filter(resource =>
    tags.every(tag => resource.tags.includes(tag))
  ).slice(0, 2);

  if (matches.length === 0) {
    container.innerHTML = '<p>No matching resources found.</p>';
    return;
  }

  matches.forEach(resource => {
    const div = document.createElement('div');
    div.className = 'resource';
    div.innerHTML = `
      <h3><a href="${resource.link}" target="_blank">${resource.title}</a></h3>
      <p>${resource.description}</p>
      <p><strong>Tags:</strong> ${resource.tags.join(', ')}</p>
    `;
    container.appendChild(div);
  });
}
