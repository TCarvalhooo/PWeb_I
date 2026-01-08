document.addEventListener('DOMContentLoaded', () => {
  loadGrid();
});

async function loadGrid() {
  const res = await fetch(`/api/grids/${GRID_ID}`);
  const grid = await res.json();

  document.getElementById('gridTitle').textContent = grid.title;

  const container = document.getElementById('gridContainer');
  container.style.gridTemplateColumns = `repeat(${grid.columns}, auto)`;

  container.innerHTML = '';

  grid.checkboxes.forEach((row, rowIndex) => {
    row.forEach((checked, colIndex) => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = checked;

      checkbox.addEventListener('change', async () => {
        await fetch(`/api/grids/${GRID_ID}/checkbox`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            row: rowIndex,
            col: colIndex,
            value: checkbox.checked
          })
        });
      });

      container.appendChild(checkbox);
    });
  });
}
