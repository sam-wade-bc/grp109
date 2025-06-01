import { resources } from './database.js';

let currentFilter = "All";

window.setFilter = function(tag) {
  currentFilter = tag;
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.textContent === tag) btn.classList.add("active");
  });
  filterResources();
};

window.filterResources = function() {
  var keyword = document.getElementById("searchInput").value.toLowerCase();
  var resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  var filtered = resources.filter(resource => {
    var matchesKeyword = resource.title.toLowerCase().includes(keyword) ||
                         resource.description.toLowerCase().includes(keyword);
    var matchesFilter = currentFilter === "All" || resource.tags.includes(currentFilter);
    return matchesKeyword && matchesFilter;
  });

  if (filtered.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  filtered.forEach(resource => {
    var div = document.createElement("div");
    div.className = "resource";
    div.innerHTML = `
      <div class="resource-title"><a href="${resource.link}" target="_blank">${resource.title}</a></div>
      <div class="resource-description">${resource.description}</div>
      <div class="resource-tags">Tags: ${resource.tags.join(", ")}</div>
    `;
    resultsContainer.appendChild(div);
  });
};

// Run once when the page loads
document.addEventListener("DOMContentLoaded", filterResources);
