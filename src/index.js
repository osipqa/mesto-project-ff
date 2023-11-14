import './styles/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
 
// A bunch of unclear variables. Don't forget to fix that =)
const cardContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const openImagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = openImagePopup.querySelector('.popup__image');
const imagePopupCaption = openImagePopup.querySelector('.popup__caption')
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function releaseCard() {
  initialCards.forEach(card => cardContainer.append(createCard(card, deleteCard, openImg, handleLike)));
}

releaseCard();

function openImg(evt) {
  evt.target.classList.contains('card__image') ? (imagePopupImage.src = evt.target.src, 
    (imagePopupCaption.textContent = evt.target.alt),
    openModal(openImagePopup)) : null;
};

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

addButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

function handleFormSubmit(evt) { // function that allows changing the profileName and profileDescription 
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

function handleCardSubmit(evt) { // function that adds a new card to the page
  evt.preventDefault();
  const placeName = newCardPopup.querySelector('.popup__input_type_card-name').value;
  const link = newCardPopup.querySelector('.popup__input_type_url').value;
  const card = {
    name: placeName,
    link: link
  };
  const newCard = createCard(card, deleteCard, openImg, handleLike);
  cardContainer.prepend(newCard);
  closeModal(newCardPopup);
  newCardPopup.querySelector('.popup__form').reset();
}

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active'); // When clicked, the color of the like will change
}

newCardPopup.addEventListener('submit', handleCardSubmit);
formElement.addEventListener('submit', handleFormSubmit);

//Don't forget to clean the code