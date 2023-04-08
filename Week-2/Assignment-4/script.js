const mainHeading = document.getElementById('main-heading');
const hiddenContentContainer = document.getElementById('hidden-content-container')
const CTAbtn = document.getElementById('CTA-btn')

mainHeading.addEventListener('click', () => {
  mainHeading.innerHTML = "Have a Good Time!";
});

CTAbtn.addEventListener('click', () => {
  hiddenContentContainer.style.display = "flex";
});