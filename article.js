document.addEventListener('DOMContentLoaded', () => {
    initializeSlider('slides', 'dots', 'prev', 'next'); 
    initializeSlider('slides2', 'dots2', 'prev2', 'next2'); 
});

function initializeSlider(slidesClassName, dotsClassName, prevClassName, nextClassName) {
    const slidesContainer = document.querySelector(`.${slidesClassName}`);
    const slides = slidesContainer.querySelectorAll('.slide');
    const dotsContainer = document.querySelector(`.${dotsClassName}`);
    const dots = dotsContainer.querySelectorAll('.dot');
    let startX = 0;
    let endX = 0;

    function updateDots(index) {
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[index].classList.add('active');
    }

    function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = slidesClassName === 'slides2' ? 'grid' : 'flex';
        } else {
            slide.style.display = 'none';
        }
    });
    updateDots(index);
    }


    function nextSlide() {
        let currentIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none');
        let nextIndex = currentIndex + 1;

        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }

    function prevSlide() {
        let currentIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none');
        let prevIndex = currentIndex - 1;

        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }

    document.querySelector(`.${prevClassName}`).addEventListener('click', prevSlide);
    document.querySelector(`.${nextClassName}`).addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    slidesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slidesContainer.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    slidesContainer.addEventListener('touchend', () => {
        if (startX - endX > 100) {
            nextSlide();
        } else if (startX - endX < -100) {
            prevSlide();
        }
    });

    showSlide(0);
}
    


// modal

function showModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = (modal.style.display == "none" ? "flex" : "none");
}

function rearrangeCards() {
let blogCards = document.querySelectorAll('.blog-cards');
blogCards.forEach((blogCardSlide, i) => {
let blogCardItems = Array.from(blogCardSlide.querySelectorAll('.blog-card'));
let newSlide;

blogCardSlide.classList.remove('slide');


blogCardItems.forEach((card, j) => {
if (j % 2 === 0) {
   newSlide = document.createElement('div');
   newSlide.classList.add('slide');
   blogCardSlide.appendChild(newSlide);
}
newSlide.appendChild(card);
});
});
}



function restoreCards() {
let blogCards = document.querySelectorAll('.blog-cards');
blogCards.forEach((blogCardSlide, i) => {
let slides = Array.from(blogCardSlide.querySelectorAll('.slide'));
slides.forEach((slide) => {
let cards = Array.from(slide.querySelectorAll('.blog-card'));
cards.forEach((card) => {
blogCardSlide.appendChild(card);
});
slide.remove();
});

blogCardSlide.classList.add('slide');
});
}

let mql = window.matchMedia('(max-width: 768px)');
mql.addListener(handleWidthChange);
handleWidthChange(mql);

function handleWidthChange(mql) {
if (mql.matches) {
rearrangeCards();
} else {
restoreCards();
}
}


// cities selector

