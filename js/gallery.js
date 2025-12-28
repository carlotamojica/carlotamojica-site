const items = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.querySelector('.custom-lightbox');
const lbContent = document.querySelector('.lb-content');
const prevBtn = document.querySelector('.lb-prev');
const nextBtn = document.querySelector('.lb-next');
const closeBtn = document.querySelector('.lb-close');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  document.body.classList.add('lightbox-open');
  lightbox.hidden = false;
  renderItem();
}

function closeLightbox() {
  lightbox.hidden = true;
  lbContent.innerHTML = '';
  document.body.classList.remove('lightbox-open');
}

function renderItem() {
  lbContent.innerHTML = '';
  const item = items[currentIndex];

  if (item.tagName === 'VIDEO') {
    const video = document.createElement('video');
    video.src = item.dataset.full || item.src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.controls = false;
    lbContent.appendChild(video);
  } else {
    const img = document.createElement('img');
    img.src = item.src;
    lbContent.appendChild(img);
  }
}

items.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  renderItem();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length;
  renderItem();
});

closeBtn.addEventListener('click', closeLightbox);

document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});