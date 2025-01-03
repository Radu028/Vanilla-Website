fetch('../jsons/gallery.json')
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

      // image.addEventListener('click', () => {
      //   changeImage(image, breed);
      // });

      image.addEventListener('click', (event) => {
        changeImage(event.target, breed);
      });

      const randomInterval = Math.floor(Math.random() * 20000) + 10000;
      setInterval(() => {
        changeImage(image, breed);
      }, randomInterval);
    });

    function changeImage(image, breed) {
      image.classList.add('fade-out');
      setTimeout(() => {
        currentImageIndex[breed] = (currentImageIndex[breed] + 1) % catImages[breed].length;
        image.src = catImages[breed][currentImageIndex[breed]];
        image.classList.remove('fade-out');
      }, 300);
    }
  })
  .catch((error) => console.error('Error:', error));
