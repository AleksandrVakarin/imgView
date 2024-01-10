'use strict';

// Switching and opening images
const images = document.querySelectorAll('.image-wrapper img');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const expandedImageContainer = document.querySelector('.expanded-image-container');
const expandedImage = document.querySelector('.expanded-image img');
const closeButton = document.querySelector('.close-button');

let currentImageIndex = 0;

function switchToImage(index) {
  currentImageIndex = index;

  images.forEach((image, i) => {
    if (i === currentImageIndex) {
      image.parentElement.classList.add('selected');
    } else {
      image.parentElement.classList.remove('selected');
    }
  });

  if (isExpandedImageVisible) {
    expandedImage.src = images[currentImageIndex].src;
  }
}

let isExpandedImageVisible = false;

function showExpandedImage() {
  expandedImage.src = images[currentImageIndex].src;
  expandedImageContainer.style.display = 'flex';
  isExpandedImageVisible = true;
}

function hideExpandedImage() {
  expandedImageContainer.style.display = 'none';
  isExpandedImageVisible = false;
}

prevButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  switchToImage(currentImageIndex);
});

nextButton.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  switchToImage(currentImageIndex);
});

let doubleClickTimer;

images.forEach((image) => {
  image.addEventListener('dblclick', (event) => {
    clearTimeout(doubleClickTimer);
    event.preventDefault();
  });

  image.addEventListener('click', () => {
    clearTimeout(doubleClickTimer);
    doubleClickTimer = setTimeout(() => {
      currentImageIndex = Array.from(images).indexOf(image);
      switchToImage(currentImageIndex);
      showExpandedImage();
    }, 100);
  });
});

closeButton.addEventListener('click', hideExpandedImage);
expandedImageContainer.addEventListener('click', hideExpandedImage);

const prevExpandedButton = document.querySelector('.prev-expanded-button');
const nextExpandedButton = document.querySelector('.next-expanded-button');

prevExpandedButton.addEventListener('click', (event) => {
  event.stopPropagation();
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  switchToImage(currentImageIndex);
  showExpandedImage();
});

nextExpandedButton.addEventListener('click', (event) => {
  event.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % images.length;
  switchToImage(currentImageIndex);
  showExpandedImage();
});

switchToImage(currentImageIndex);