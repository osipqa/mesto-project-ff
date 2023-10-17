// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardList = document.querySelector('.places__list');

function createCard(data) {
  const templateCard = document.querySelector('#card-template').content;
  const card = templateCard.cloneNode(true);
  card.querySelector('.card__image').src = data.link;
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', evt => {const card = evt.target.closest('.card'); card.remove();});
  return card;
}

function releaseCard() {
  initialCards.forEach(card => cardList.append(createCard(card)));
}

releaseCard();