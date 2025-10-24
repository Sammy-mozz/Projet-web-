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

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {  
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
