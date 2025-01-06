document.addEventListener('DOMContentLoaded', async () => {
  const savedBreed = localStorage.getItem('cat-breed');
  const savedWeight = localStorage.getItem('cat-weight');

  if (savedBreed) {
    document.getElementById('cat-breeds').value = savedBreed;
  }

  if (savedWeight) {
    document.getElementById('cat-weight').value = savedWeight;
  }

  if (savedBreed && savedWeight) {
    try {
      await confirmData();
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

async function confirmData() {
  const breed = document.getElementById('cat-breeds').value;
  const weight = document.getElementById('cat-weight').value;
  const weightError = document.getElementById('weight-error');

  if (!weight) {
    weightError.style.opacity = '1';
    return;
  }

  if (weightError.style.opacity === '1') {
    weightError.style.opacity = '0';
  }

  weightError.style.opacity = '0';

  localStorage.setItem('cat-breed', breed);
  localStorage.setItem('cat-weight', weight);

  const catInfo = document.getElementById('cat-info');
  catInfo.style.display = 'block';

  const catInfoContent = document.getElementById('cat-info-content');
  catInfoContent.innerHTML = '';

  try {
    const foodInfo = await calculateFood(breed, weight);
    catInfoContent.innerHTML = `
      <h4>Informații nutriționale zilnice</h4>
      <p>Necesar caloric: ${foodInfo.caloricNeeds} kcal</p>
      <p>Mâncare uscată: ${foodInfo.dryFood} g</p>
      <p>Mâncare umedă: ${foodInfo.wetFood} g</p>
      <br/>
    `;
  } catch (error) {
    console.error('Error:', error);
    catInfoContent.textContent = 'A apărut o eroare la calcularea necesarului de hrană.';
  }
}

const calculateFood = async (breed, weight) => {
  return fetch('../jsons/care.json')
    .then((response) => {
      if (response.ok && response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Statusul este: ${response.status}`);
      }
    })
    .then((breeds) => {
      if (!breeds[breed]) {
        throw new Error(`Rasa ${breed} nu a fost găsita.`);
      }

      const activityFactor = breeds[breed]['activityFactor'];
      const caloricNeeds = activityFactor * Math.pow(weight, 0.75);

      const dryFood = (caloricNeeds / 400) * 100;
      const wetFood = (caloricNeeds / 90) * 100;

      return {
        caloricNeeds: Math.round(caloricNeeds),
        dryFood: Math.round(dryFood),
        wetFood: Math.round(wetFood),
      };
    })
    .catch((error) => console.error('Error:', error));
};
