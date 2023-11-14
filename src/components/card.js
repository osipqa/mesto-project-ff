export { createCard, deleteCard };

const cardTemplate = document.querySelector('#card-template').content;

function createCard(data, deleteCard, openImg, handleLike) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardImg.addEventListener('click', openImg)
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.card__like-button').addEventListener('click', handleLike);
  return card;
}

function deleteCard(evt) {
  const delCard = evt.target.closest('.card');
  delCard.remove();
}