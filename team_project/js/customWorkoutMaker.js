import resources from './database.js';

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const area = params.get('area');
  const goal = params.get('goal');
  const time = params.get('time');

  if (area && goal && time) {
    const tags = [area, goal, time];
    displayTags(tags);
    loadMatchingResources(tags);
  }
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

  if (!Array.isArray(resources)) {
    container.innerHTML = '<p>Error loading resources.</p>';
    return;
  }

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
