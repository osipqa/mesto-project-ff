import { addLike, deleteLike } from "./api";
export { createCard, handleLike };

const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item');

function createCard(data, removeCard, openImg, handleLike, ID) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  cardImage.src = data.link;
  cardTitle.alt = data.name;
  cardTitle.textContent = data.name;
  cardLikeCount.textContent = data.likes.length;
  cardImage.addEventListener('click', () => openImg(data));
  cardLikeButton.addEventListener('click', () => handleLike(data, ID, cardElement));
  cardElement.id = data['_id'];
  if (data.owner && ID !== data.owner['_id']) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', () => {
      removeCard(data);
    });
  }
  return cardElement;
}

function handleLike(card, ID, cardElement) {
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonCount = cardElement.querySelector('.card__like-count')
  if (check(card, ID)) {
    deleteLike(card)
      .then((res) => {
        buttonCount.textContent = res.likes.length;
        buttonLike.classList.remove('card__like-button_is-active');
        card.likes = res.likes;
      })
      .catch(err => console.log(err));
  } else {
    addLike(card)
      .then((res) => {
        buttonLike.textContent = res.likes.length;
        buttonLike.classList.add('card__like-button_is-active');
        card.likes = res.likes;
      })
      .catch(err => console.log(err))
  }
}

function check(data, ID) {
  return data.likes.some((i) => i['_id'] === ID);
}