const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesloaded = 0;
let total = 0;
let photosArray = [];

const count = 30;
const apiKey = 'cAF7BfAsvk5OQHLHBZTU7hPExHUPGd2MXJOpivvRzrw';
const apiUrl = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    imagesloaded++;
    if (imagesloaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
setAttributes(item, {
    href: photo.links.html,
    target: '_blank', 
});

        const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt:photo.alt_description,
        title: photo.alt_description,
    });
    img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
       displayPhotos();
    } catch (error) {

    }
}

window.addEventListener('scroll', () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
}
});


getPhotos();