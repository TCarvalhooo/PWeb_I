document.addEventListener('DOMContentLoaded', () => {
  console.log('GRIDS.JS CARREGADO');
  loadGrids();

  const form = document.getElementById('gridForm');
  if (form) {
    form.addEventListener('submit', createGrid);
  }
});

async function loadGrids() {
  const res = await fetch('/api/grids');
  const grids = await res.json();

  const list = document.getElementById('gridList');
  if (!list) return;

  list.innerHTML = '';

  grids.forEach(grid => {
    const card = document.createElement('div');
    card.className = 'card p-3 mb-4';

    const title = document.createElement('h5');
    title.textContent = grid.title;

    const gridContainer = document.createElement('div');
    gridContainer.className = 'checkbox-grid';
    gridContainer.style.gridTemplateColumns = `repeat(${grid.columns}, auto)`;

    grid.checkboxes.forEach((row, rowIndex) => {
      row.forEach((checked, colIndex) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checked;

        checkbox.dataset.gridId = grid._id;
        checkbox.dataset.row = rowIndex;
        checkbox.dataset.col = colIndex;

        checkbox.addEventListener('change', updateCheckbox);

        gridContainer.appendChild(checkbox);
      });
    });

    card.appendChild(title);
    card.appendChild(gridContainer);
    list.appendChild(card);
  });
}

async function updateCheckbox(e) {
  const checkbox = e.target;

  const gridId = checkbox.dataset.gridId;
  const row = checkbox.dataset.row;
  const col = checkbox.dataset.col;
  const value = checkbox.checked;

  await fetch(`/api/grids/${gridId}/checkbox`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ row, col, value })
  });
}

async function createGrid(e) {
  e.preventDefault();
  console.log('SUBMIT DISPARADO');

  const form = e.target;

  const data = {
    title: form.title.value,
    rows: Number(form.rows.value),
    columns: Number(form.columns.value)
  };

  await fetch('/api/grids', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  form.reset();
  loadGrids();
}

async function deleteGrid(id) {
  await fetch(`/api/grids/${id}`, { method: 'DELETE' });
  loadGrids();
}
