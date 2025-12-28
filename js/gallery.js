const items = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.querySelector('.lightbox');
const content = document.querySelector('.lightbox-content');
const btnPrev = document.querySelector('.lb-prev');
const btnNext = document.querySelector('.lb-next');
const btnClose = document.querySelector('.lb-close');

let currentIndex = 0;

function clearContent() {
  content.innerHTML = '';
}

function showItem(index) {
  clearContent();

  const el = items[index];
  let node;

  if (el.tagName === 'VIDEO') {
    node = document.createElement('video');
    node.src = el.dataset.full || el.src;
    node.autoplay = true;
    node.loop = true;
    node.muted = true;
    node.playsInline = true;
    node.controls = false;
  } else {
    node = document.createElement('img');
    node.src = el.dataset.full || el.src;
  }

  content.appendChild(node);
  currentIndex = index;
}

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    lightbox.classList.add('active');
    showItem(index);
  });
});

btnPrev.addEventListener('click', () => {
  showItem((currentIndex - 1 + items.length) % items.length);
});

btnNext.addEventListener('click', () => {
  showItem((currentIndex + 1) % items.length);
});

btnClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
  clearContent();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    clearContent();
  }
});