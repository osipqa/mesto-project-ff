import './styles/index.css';
import { initialCards } from './cards.js';

// A bunch of unclear variables. Don't forget to fix that =)
const templateCard = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const buttonEdit = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const buttonAddcard = document.querySelector('.profile__add-button');
const popupNewcard = document.querySelector('.popup_type_new-card');
const openPopImg = document.querySelector('.popup_type_image');
const popupImg = openPopImg.querySelector('.popup__image');
const popupCapt = openPopImg.querySelector('.popup__caption')

function createCard(data, deleteCard, openImg) {
  const card = templateCard.cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  cardImg.src = data.link;
  cardImg.alt = data.name;
  cardImg.addEventListener('click', openImg)
  card.querySelector('.card__title').textContent = data.name;
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  return card;
}

function deleteCard(evt) {
  const delCard = evt.target.closest('.card');
  delCard.remove();
}

function releaseCard() {
  initialCards.forEach(card => cardList.append(createCard(card, deleteCard, openImg)));
}

releaseCard();

function openModal(evt) {
  // Don't forget to set setTimeout to make it a bit smoother
  evt.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc); // If don't remove the eventlistener from closeModal, an error will occur.
}

function closeModal(evt) {
  // Don't forget to set setTimeout to make it a bit smoother
  evt.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc); // "This piece of code fixes that."
}

function closeEsc(evt) {
  evt.code === 'Escape' && closeModal(document.querySelector('.popup_is-opened'));
}

popups.forEach((out) => {
  out.addEventListener('mouseup', (evt) => { // Somebody said that using 'mouseup' is better than 'mousedown,' but is it really?
    evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened') ? closeModal(out) : null;
  });
});

function openImg(evt) {
  evt.target.classList.contains('card__image') ? (popupImg.src = evt.target.src, 
    (popupCapt.textContent = evt.target.alt),
    openModal(openPopImg)) : null;
};

buttonEdit.addEventListener('click', () => {
  openModal(popupEdit);
});

buttonAddcard.addEventListener('click', () => {
  openModal(popupNewcard);
});