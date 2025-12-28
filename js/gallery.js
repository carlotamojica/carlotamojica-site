document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.querySelector(".custom-lightbox");
  const lbClose = document.querySelector(".lb-close");
  const lbNext = document.querySelector(".lb-next");
  const lbPrev = document.querySelector(".lb-prev");

  let currentIndex = 0;
  let currentMedia = null;

  function clearLightbox() {
    if (currentMedia) {
      currentMedia.pause?.();
      currentMedia.remove();
      currentMedia = null;
    }
  }

  function openLightbox(index) {
    clearLightbox();
    currentIndex = index;

    const item = items[currentIndex];
    const isVideo = item.tagName.toLowerCase() === "video";

    if (isVideo) {
      const video = document.createElement("video");
      video.src = item.dataset.full || item.src;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.controls = false;

      currentMedia = video;
      lightbox.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.dataset.full || item.src;

      currentMedia = img;
      lightbox.appendChild(img);
    }

    lightbox.hidden = false;
  }

  function closeLightbox() {
    clearLightbox();
    lightbox.hidden = true;
  }

  function nextItem() {
    const nextIndex = (currentIndex + 1) % items.length;
    openLightbox(nextIndex);
  }

  function prevItem() {
    const prevIndex =
      (currentIndex - 1 + items.length) % items.length;
    openLightbox(prevIndex);
  }

  // click en galería
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  // controles
  lbClose.addEventListener("click", closeLightbox);
  lbNext.addEventListener("click", nextItem);
  lbPrev.addEventListener("click", prevItem);

  // teclado
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextItem();
    if (e.key === "ArrowLeft") prevItem();
  });

  // click fuera para cerrar
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
});