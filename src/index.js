import './styles/index.css';
import { createCard, handleLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getInfo, getCards, deleteCards, toChangeAvatar, toChangeNames, addCards} from './components/api.js';

// variable names
const cardContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileButtonAdd = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup__avatar');
const inputLinkAvatar = document.getElementById('link-avatar-input');
const popupDeleteCard = document.querySelector('.popup_delete-image');
const popupDeleteCardButton = popupDeleteCard.querySelector('.popup__button');
const popupButton = avatarPopup.querySelector('.popup__button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imageOpenPopup = document.querySelector('.popup_type_image');
const imagePopupImage = imageOpenPopup.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption')
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupProfileButton = popupProfileEdit.querySelector('.popup__button')
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const inputName = formProfileEdit.querySelector('.popup__input_type_name');
const inputDescription = formProfileEdit.querySelector('.popup__input_type_description');
const allPopups = document.querySelectorAll('.popup');
const cardButton = newCardPopup.querySelector('.popup__button')
const inputPlaceNameFormAddNewCard = newCardPopup.querySelector('.popup__input_type_card-name');
const inputPlaceLinkFormAddNewCard = newCardPopup.querySelector('.popup__input_type_url');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

allPopups.forEach((out) => {
  out.addEventListener('mouseup', ({target, currentTarget}) => { 
    const isTargetCloseButton = target.classList.contains('popup__close');
    const isTargetOverlay = target === currentTarget;
    if (isTargetCloseButton || isTargetOverlay) closeModal(out);
  });
});

Promise.all([getInfo("/users/me"), getCards("/cards")])
  .then((data) => {
    console.log(data);
    const currentUser = data[0];
    const userCards = data[1].filter(card => card.owner._id === currentUser._id);
    profileName.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileImage.style = `background-image: url('${data[0].avatar}')`
    userCards.forEach(card => cardContainer.append(createCard(card, removeCard, openImg, handleLike, currentUser._id)))
  })
  .catch(err => console.log(err)) 
  

function saveInfo(load, buttonText) {
  if (load) {
    buttonText.textContent = 'Сохранение...'
  } else {
    buttonText.textContent = buttonText.dataset.buttonText;
  }
}

function handleProfileFormSubmit(evt) { // function that allows changing the profileName and profileDescription 
  evt.preventDefault();
  saveInfo(true, popupProfileButton);
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  toChangeNames(inputName.value, inputDescription.value)
  .then((res) => {
    if (res && res.name && res.about) {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    }
  })
  .catch(err => console.log(err))
  .finally(() => {
    saveInfo(false, popupProfileButton);
    closeModal(popupProfileEdit);
  })
}


function handleAvatarSubmit(evt) {
  evt.preventDefault();
  saveInfo(true, popupButton);
  toChangeAvatar(inputLinkAvatar.value)
    .then((res) => {
      profileImage.style = `background-image: url('${res.avatar}')`
    })
    .catch((err) => console.log(err))
    .finally(() => { 
      saveInfo(false, popupButton);
      closeModal(avatarPopup);
    });
}

function handleCardSubmit(evt) { // function that adds a new card to the page
  evt.preventDefault();
  saveInfo(true, cardButton);
  addCards(inputPlaceNameFormAddNewCard.value, inputPlaceLinkFormAddNewCard.value)
    .then((card) => {
      cardContainer.append(createCard(card, removeCard, openImg, handleLike, ID))
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveInfo(false, cardButton);
      closeModal(newCardPopup);
    })
  newCardPopup.querySelector('.popup__form').reset();
}

function handleDeleteCard(evt) {
  evt.preventDefault();
  saveInfo(true, popupDeleteCardButton);
  const cardID = popupDeleteCardButton.dataset.cardId;
  console.log("Card ID to delete:", cardID);
  deleteCards(cardID)
    .then(() => {
      console.log('Card successfully deleted from server');
      const deleteCard = document.getElementById(cardID);
      if (deleteCard) {
        deleteCard.remove();
        popupDeleteCardButton.dataset.cardId = '';
        saveInfo(false, popupDeleteCardButton);
        closeModal(popupDeleteCard);
      }
    })
    .catch(err => console.log(err));
}

function removeCard(card) {
  openModal(popupDeleteCard);
  popupDeleteCardButton.dataset.cardId = card['_id'];
}

function openImg(data) {
  imagePopupImage.alt = data.name;
  imagePopupCaption.textContent = data.name;
  imagePopupImage.src = data.link;
  openModal(imageOpenPopup);
};

profileEditButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  clearValidation(popupProfileEdit, validationConfig);
  openModal(popupProfileEdit);
});

profileButtonAdd.addEventListener('click', () => {
  clearValidation(newCardPopup, validationConfig);
  openModal(newCardPopup);
});

profileImage.addEventListener('click', () => {
  clearValidation(avatarPopup, validationConfig);
  inputLinkAvatar.value = '';
  openModal(avatarPopup);
})

newCardPopup.addEventListener('submit', handleCardSubmit);
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);
avatarPopup.addEventListener('submit', handleAvatarSubmit);
popupDeleteCardButton.addEventListener('click', handleDeleteCard);

enableValidation(validationConfig);
