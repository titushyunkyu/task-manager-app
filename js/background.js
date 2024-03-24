const images = [
    "img01.jpg", "img02.jpg", "img03.jpg", "img04.jpg", "img05.jpg", "img06.jpg", "img07.jpg", "img08.jpg", "img09.jpg", "img10.jpg", 
    "img11.jpg", "img12.jpg", "img13.jpg", "img14.jpg", "img15.jpg", "img16.jpg", "img17.jpg", "img18.jpg", "img19.jpg", "img20.jpg", 
    "img21.jpg", "img22.jpg", "img23.jpg", "img24.jpg", "img25.jpg", "img26.jpg", "img27.jpg", "img28.jpg", "img29.jpg", "img30.jpg", 
    "img31.jpg", "img32.jpg"
];

const selectedImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");
bgImage.src = `background images/${selectedImage}`;

console.log(bgImage);
document.body.style.backgroundImage = `url('background images/${selectedImage}')`;
