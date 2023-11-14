export { createCard, deleteCard, handleLike };

const cardTemplate = document.querySelector('#card-template').content;

function createCard(data, deleteCard, openImg, handleLike) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  cardTitle.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardImg.addEventListener('click', () => openImg(cardTitle, cardImg));
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.card__like-button').addEventListener('click', handleLike);
  return card;
}

function deleteCard(evt) {
  const delCard = evt.target.closest('.card');
  delCard.remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active'); // When clicked, the color of the like will change
}