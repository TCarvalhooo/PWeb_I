document.addEventListener('DOMContentLoaded', () => {
  loadGridsForSelect();

  const form = document.getElementById('taskForm');
  form.addEventListener('submit', createTask);
});

async function loadGridsForSelect() {
  const res = await fetch('/api/grids');
  const grids = await res.json();

  const select = document.querySelector('select[name="grid"]');

  grids.forEach(grid => {
    const option = document.createElement('option');
    option.value = grid._id;
    option.textContent = grid.title;
    select.appendChild(option);
  });
}

async function createTask(e) {
  e.preventDefault();

  const form = e.target;

  const data = {
    name: form.name.value,
    grid: form.grid.value
  };

  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.text();
    alert('Erro ao criar task:\n' + error);
    return;
  }

  window.location.href = '/home';
}
