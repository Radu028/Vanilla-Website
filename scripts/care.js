function confirmData() {
  const breed = document.getElementById('cat-breeds').value;
  const weight = document.getElementById('cat-weight').value;
  const weightError = document.getElementById('weight-error');

  if (!weight) {
    weightError.style.opacity = 1;
    return;
  } else {
    weightError.style.display = 0;
  }

  console.log('Breed:', breed);
  console.log('Weight:', weight);
}
