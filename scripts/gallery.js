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

    const randomImageIndexes = {};

    images.forEach((image) => {
      const breed = image.closest('.grid-item').classList[1];
      image.src = imgSrc(breed, 0);
      image.alt = imgAlt(breed, 0, catImages[breed]);
      randomImageIndexes[breed] = 0;

      // image.addEventListener('click', () => {
      //   changeImage(image, breed);
      // });

      image.addEventListener('click', (event) => {
        changeImage(event.target, breed);
      });

      const randomInterval = Math.floor(Math.random() * 20000) + 10000; // 10sec - 30sec
      setInterval(() => {
        changeImage(image, breed);
      }, randomInterval);
    });

    function changeImage(image, breed) {
      image.classList.add('fade-out');
      setTimeout(() => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * catImages[breed]);
        } while (randomIndex === randomImageIndexes[breed]);
        randomImageIndexes[breed] = randomIndex;

        image.src = imgSrc(breed, randomIndex);
        image.alt = imgAlt(breed, randomIndex, catImages[breed]);
        image.classList.remove('fade-out');
      }, 300);
    }
  })
  .catch((error) => console.error('Error:', error));

function imgSrc(breed, index) {
  return `../img/${breed}/${index}.jpg`;
}

function imgAlt(breed, index, total) {
  return `Rasa ${breed} - Imagine ${index + 1} din ${total}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.stopPropagation();

      const computedStyle = getComputedStyle(item);
      const backgroundColor = computedStyle.backgroundColor;
      const position = computedStyle.backgroundPosition;

      alert(
        `Ai facut click pe o imagine cu rasă ${item.classList[1]} cu culoare de fundal ${backgroundColor} și poziție ${position}.`
      );
    });
  });

  document.body.addEventListener('click', () => {
    alert('Ai făcut click pe corpul paginii!');
  });
});
