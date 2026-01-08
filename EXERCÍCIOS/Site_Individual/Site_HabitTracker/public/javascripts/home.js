document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  loadGrids();
});

/* ========= TASKS ========= */

// Carregar tasks
async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();

  const list = document.getElementById('taskList');
  if (!list) return;

  list.innerHTML = '';

  tasks.forEach(task => {
  const div = document.createElement('div');
  div.className = 'd-flex align-items-center gap-2 mb-2';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () =>
    toggleTask(task._id, checkbox.checked)
  );

  const label = document.createElement('span');
  label.textContent = task.name;
  label.style.flex = '1';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn-sm btn-outline-primary';
  editBtn.textContent = 'Editar';
  editBtn.onclick = () => editTask(task);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-sm btn-outline-danger';
  deleteBtn.textContent = 'Excluir';
  deleteBtn.onclick = () => deleteTask(task._id);

  div.append(checkbox, label, editBtn, deleteBtn);
  list.appendChild(div);
});
}

// Excluir task
async function deleteTask(id) {
  if (!confirm('Deseja excluir esta task?')) return;

  await fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  });

  loadTasks();
}

// Editar task
async function editTask(task) {
  const newName = prompt('Editar task:', task.name);
  if (!newName || !newName.trim()) return;

  await fetch(`/api/tasks/${task._id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newName.trim() })
  });

  loadTasks();
}


// Alternar status da task
async function toggleTask(id, completed) {
  await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });

  loadGrids(); // Atualiza a exibição das grids
}

/* ========= GRIDS ========= */

async function loadGrids() {
  const res = await fetch('/api/grids');
  const grids = await res.json();

  const list = document.getElementById('gridList');
  if (!list) return;

  list.innerHTML = '';

  grids.forEach(grid => {
    const div = document.createElement('div');
    div.className = 'list-group-item d-flex justify-content-between align-items-center';
    div.style.cursor = 'pointer';

    // 👉 CLIQUE NA GRID → ABRIR DETALHE
    div.addEventListener('click', () => {
      window.location.href = `/grids/${grid._id}`;
    });

    const title = document.createElement('strong');
    title.textContent = grid.title;

    const actions = document.createElement('div');

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-outline-primary me-2';
    editBtn.textContent = 'Editar';
    editBtn.onclick = (e) => {
      e.stopPropagation(); // 🔥 ESSENCIAL
      editGrid(grid);
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-outline-danger';
    deleteBtn.textContent = 'Excluir';
    deleteBtn.onclick = (e) => {
      e.stopPropagation(); // 🔥 ESSENCIAL
      deleteGrid(grid._id);
    };

    actions.append(editBtn, deleteBtn);
    div.append(title, actions);
    list.appendChild(div);
  });
}


// Editar grid
async function deleteGrid(id) {
  if (!confirm('Excluir esta grid?')) return;

  await fetch(`/api/grids/${id}`, {
    method: 'DELETE'
  });

  loadGrids();
}

// Editar grid
async function editGrid(grid) {
  const newTitle = prompt('Editar título da grid:', grid.title);
  if (!newTitle) return;

  await fetch(`/api/grids/${grid._id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle })
  });

  loadGrids();
}



