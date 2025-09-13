document.addEventListener('DOMContentLoaded', function() {
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector('.element');
      if (!container) return;

      // Remove old summary items (except the summary title and button)
      const summaryTitle = container.querySelector('.summary');
      const buttonDiv = container.querySelector('div > button')?.parentElement;
      // Remove all children except summaryTitle and buttonDiv
      Array.from(container.children).forEach(child => {
        if (child !== summaryTitle && child !== buttonDiv) {
          container.removeChild(child);
        }
      });

      // Add new summary items from data.json
      data.forEach(item => {
        const div = document.createElement('div');
        div.className = item.category.toLowerCase();
        let marginLeft = '9em';
        if (item.category === 'Verbal' || item.category === 'Visual') {
          marginLeft = '10em';
        }
        div.innerHTML = `
          <img src="${item.icon}">
          <p class="${item.category.toLowerCase()}-name">${item.category}</p>
          <p class="${item.category.toLowerCase()}-number" style="margin-left: ${marginLeft};"><span class="score-bold">${item.score}&nbsp;</span><span class="score-normal">/ 100</span></p>
        `;
        container.insertBefore(div, buttonDiv);
      });
    });
});
