// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import './styles/index.css';
import { initialCards } from './cards.js';

const templateCard = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

function createCard(data, deleteCard) {
  const card = templateCard.cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  cardImg.src = data.link;
  cardImg.alt = data.name;
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  return card;
}

function deleteCard(evt) {
  const delCard = evt.target.closest('.card');
  delCard.remove();
}

function releaseCard() {
  initialCards.forEach(card => cardList.append(createCard(card, deleteCard)));
}

releaseCard();