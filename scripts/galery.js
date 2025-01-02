fetch('../jsons/galery.json')
  .then((response) => {
    if (response.ok && response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Statusul este: ${response.status}`);
    }
  })
  .then((catImages) => {
    const gridPage = document.getElementById('grid-page');
    const images = gridPage.querySelectorAll('.grid-item img');

    const currentImageIndex = {};

    images.forEach((image) => {
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
  })
  .catch((error) => console.error('Error:', error));
