let currentPage = 1;
const perPage = 12;
let promptsData = [];

async function loadPrompts() {
  const response = await fetch('prompts.json'); // 后续可以用GitHub API自动生成JSON
  promptsData = await response.json();
  renderGallery();
  renderPagination();
}

function renderGallery() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageItems = promptsData.slice(start, end);

  pageItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img src="${item.image}" alt="${item.title}" data-prompt="${item.prompt}" data-tags="${item.tags.join(', ')}">`;
    gallery.appendChild(card);
  });

  // 点击事件
  document.querySelectorAll('.card img').forEach(img => {
    img.addEventListener('click', () => {
      showModal(img.src, img.dataset.prompt, img.dataset.tags);
    });
  });
}

function renderPagination() {
  const totalPages = Math.ceil(promptsData.length / perPage);
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderGallery();
    };
    pagination.appendChild(btn);
  }
}

function showModal(src, prompt, tags) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-img').src = src;
  document.getElementById('modal-prompt').innerText = prompt;
  document.getElementById('modal-tags').innerText = tags;
  modal.style.display = 'flex';
}

document.getElementById('close').onclick = () => {
  document.getElementById('modal').style.display = 'none';
}

loadPrompts();
