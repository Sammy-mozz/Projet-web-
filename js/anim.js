const hoverImages = document.querySelectorAll(".gallery-item");

hoverImages.forEach(img => {
  const stillSrc = img.src;   
  const gifSrc = img.dataset.gif; 

img.addEventListener("mouseenter", () => {
    img.src = gifSrc;
  });

  img.addEventListener("mouseleave", () => {
    img.src =stillSrc;
  });
});

