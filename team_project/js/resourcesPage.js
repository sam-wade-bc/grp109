import { resources } from './database.js';

let currentFilter = "All";

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("resultsContainer");

  if (!resultsContainer) {
    console.error("Element with ID 'resultsContainer' not found.");
    return;
  }

  // Initial render
  filterResources();

  // Optional: filter as the user types
  searchInput.addEventListener("input", filterResources);
});

function filterResources() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  const filtered = resources.filter(resource => {
    const matchesKeyword = resource.title.toLowerCase().includes(keyword) ||
                           resource.description.toLowerCase().includes(keyword);
    const matchesFilter = currentFilter === "All" || resource.tags.includes(currentFilter);
    return matchesKeyword && matchesFilter;
  });

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  filtered.forEach(resource => {
    const div = document.createElement("div");
    div.className = "resource";
    div.innerHTML = `
      <div class="resource-title"><a href="${resource.link}" target="_blank">${resource.title}</a></div>
      <div class="resource-description">${resource.description}</div>
      <div class="resource-tags">Tags: ${resource.tags.join(", ")}</div>
    `;
    resultsContainer.appendChild(div);
  });
}

function setFilter(tag) {
  currentFilter = tag;
  const buttons = document.querySelectorAll(".filters button");

  buttons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.textContent === tag) {
      btn.classList.add("active");
    }
  });

  filterResources();
}

// Make functions accessible to HTML
window.setFilter = setFilter;
window.filterResources = filterResources;
