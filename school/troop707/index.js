window.onload = function() {
    imgs = ["res/slide1.jpg", "res/slide2.jpg", "res/slide3.jpg", "res/slide4.jpg", "res/slide5.jpg"];
    imgElement = document.getElementById("slide");

    currentImage = 1;
    intervalId = setInterval(setSlide, 10000, 1);
}
function setSlide(amount) {
    currentImage+=amount;
    if (currentImage >= imgs.length) {
        currentImage = 0;
    }

    if (currentImage < 0) {
        currentImage = imgs.length - 1;
    }

    updateImage();
}

function updateImage() {
    imgElement.src = imgs[currentImage];
}