const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

let counter = 1;
const size = carouselImages[0].clientWidth;

// Clone first and last images for infinite loop effect
const firstClone = carouselImages[0].cloneNode(true);
const lastClone = carouselImages[carouselImages.length - 1].cloneNode(true);

carouselSlide.appendChild(firstClone);
carouselSlide.insertBefore(lastClone, carouselSlide.firstChild);

// Update the images NodeList after adding the clones
const updatedCarouselImages = document.querySelectorAll('.carousel-slide img');

// Inital position
carouselSlide.style.transform = `translateX(${-size * counter}px)`;

function slideImages() {
    if (counter >= updatedCarouselImages.length - 1) {
        counter = 0;
        carouselSlide.style.transition = 'none'; 
        carouselSlide.style.transform = `translateX(${-size * (counter + 1)}px)`;
        setTimeout(() => {
            carouselSlide.style.transition = 'transform 0.5s ease-in-out'; //Animation is re-enabled
        });
        counter++;
    } else {
        counter++;
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }
}

// Slide images every 3 seconds
setInterval(slideImages, 2000);

// Adds event listener
carouselSlide.addEventListener('transitionend', () => {
    if (updatedCarouselImages[counter].alt === firstClone.alt) {
        counter = 1;
        carouselSlide.style.transition = 'none';
        carouselSlide.style.transform = `translateX(${-size * counter}px)`;
    }
});
