(() => {

  const lightbox = document.querySelector(".custom-lightbox");
  const lbImg = lightbox.querySelector("img");
  const prev = lightbox.querySelector(".lb-prev");
  const next = lightbox.querySelector(".lb-next");
  const close = lightbox.querySelector(".lb-close");

  let images = [];
  let index = 0;

  function showImage() {
    lbImg.src = images[index].src.replace("w_800", "w_2400");
  }

  document.addEventListener("click", e => {
    const img = e.target.closest(".custom-gallery img");
    if (!img) return;

    images = [...img.closest(".custom-gallery").querySelectorAll("img")];
    index = images.indexOf(img);

    lightbox.hidden = false;
    showImage();
  });

  next.onclick = e => {
    e.stopPropagation();
    index = (index + 1) % images.length;
    showImage();
  };

  prev.onclick = e => {
    e.stopPropagation();
    index = (index - 1 + images.length) % images.length;
    showImage();
  };

  close.onclick = () => {
    lightbox.hidden = true;
    lbImg.src = "";
  };

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.hidden) {
      close.click();
    }
  });

  // Año automático
  document.getElementById("year").textContent =
    new Date().getFullYear();

})();