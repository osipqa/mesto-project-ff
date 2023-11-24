import './styles/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, handleLike} from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
 
// variable names
const cardContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileButtonAdd = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imageOpenPopup = document.querySelector('.popup_type_image');
const imagePopupImage = imageOpenPopup.querySelector('.popup__image');
const imagePopupCaption = imageOpenPopup.querySelector('.popup__caption')
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const inputName = formProfileEdit.querySelector('.popup__input_type_name');
const inputDescription = formProfileEdit.querySelector('.popup__input_type_description');
const allPopups = document.querySelectorAll('.popup');
const inputPlaceNameFormAddNewCard = newCardPopup.querySelector('.popup__input_type_card-name');
const inputPlaceLinkFormAddNewCard = newCardPopup.querySelector('.popup__input_type_url');

// functions
function releaseCard() {
  initialCards.forEach(card => cardContainer.append(createCard(card, deleteCard, openImg, handleLike)));
}

allPopups.forEach((out) => {
  out.addEventListener('mouseup', (evt) => { // Somebody said that using 'mouseup' is better than 'mousedown,' but is it really?
    evt.target.classList.contains('popup_is-opened') ? closeModal(out) : null; // Someone set me up, there definitely shouldn't have been any extra element here.
  });
});

releaseCard(); // i would like to get rid of this thing, but I still dont know how to do it... :c

function handleProfileFormSubmit(evt) { // function that allows changing the profileName and profileDescription 
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(popupProfileEdit);
}

function handleCardSubmit(evt) { // function that adds a new card to the page
  evt.preventDefault();
  const inputName = inputPlaceNameFormAddNewCard.value;
  const inputLink = inputPlaceLinkFormAddNewCard.value;
  const card = {
    name: inputName,
    link: inputLink
  };
  const newCard = createCard(card, deleteCard, openImg, handleLike);
  cardContainer.prepend(newCard);
  closeModal(newCardPopup);
  newCardPopup.querySelector('.popup__form').reset();
}

function openImg(data) {
  imagePopupImage.alt = data.name;
  imagePopupCaption.textContent = data.name;
  imagePopupImage.src = data.link;
  openModal(imageOpenPopup);
};

// click Event Listeners
profileEditButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

profileButtonAdd.addEventListener('click', () => {
  openModal(newCardPopup);
});

newCardPopup.addEventListener('submit', handleCardSubmit);
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);