const catImages = {
    'norwegian-forest': [
        'img/norwegian_forest.jpg',
        'img/norwegian_forest_2.jpg',
    ],
    'british-shorthair': [
        'img/british_shorthair.jpg',
        'img/british_shorthair_2.jpg',
    ],
    'maine-coon': [
        'img/maine_coon.jpg',
        'img/maine_coon_2.jpg',
    ],
    'ragdoll': [
        'img/ragdoll.jpg',
        'img/ragdoll_2.jpg',
    ],
    'scottish-fold': [
        'img/scottish_fold.jpg',
        'img/scottish_fold_2.jpg',
    ],
    'bengal': [
        'img/bengal.jpg',
        'img/bengal_2.jpg',
    ],
    'persian': [
        'img/persian.jpg',
        'img/persian_2.jpg',
    ],
    'burmese': [
        'img/burmese.jpg',
        'img/burmese_2.jpg',
    ],
    'siamese': [
        'img/siamese.jpg',
        'img/siamese_2.jpg',
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const gridPage = document.getElementById('grid-page');
    const images = gridPage.querySelectorAll('.grid-item img');

    const currentImageIndex = {};

    images.forEach(image => {
        const breed = image.closest('.grid-item').classList[1];
        currentImageIndex[breed] = 0;

        image.addEventListener('click', () => {
            changeImage(image, breed);
        });
    });

    function changeImage(image, breed) {
        currentImageIndex[breed] = (currentImageIndex[breed] + 1) % catImages[breed].length;
        image.src = catImages[breed][currentImageIndex[breed]];
    }
});