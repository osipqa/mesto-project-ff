import './styles/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, handleLike} from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

// variable names
const cardContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileButtonAdd = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');
const avatarPopup = document.querySelector('.popup__avatar');
const inputLinkAvatar = document.getElementById('link-avatar-input');
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

function releaseCard() {
  initialCards.forEach(card => cardContainer.append(createCard(card, deleteCard, openImg, handleLike)));
};

allPopups.forEach((out) => {
  out.addEventListener('mouseup', ({target, currentTarget}) => { 
    const isTargetCloseButton = target.classList.contains('popup__close');
    const isTargetOverlay = target === currentTarget;
    if (isTargetCloseButton || isTargetOverlay) closeModal(out);
  });
});

releaseCard(); // i would like to get rid of this thing, but I still dont know how to do it... :c

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '637888a1-9ced-4570-b92f-3c1ad708077b',
    'Content-Type': 'application/json'
  }
}

Promise.all([getinfo("/users/me")])
  .then((data) => {
    console.log(data);
    profileName.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileImage.style = `background-image: url('${data[0].avatar}')`
  })

function getinfo(data) {
  return fetch(`${config.baseUrl}${data}`, {
    method: "GET",
    headers: config.headers,
  })
  .then(res => res.json())
  .then(res => {
    console.log(res)
    return res
  })
}

getinfo("/users/me");

function post(users, data, method = "POST") {
  return fetch(`${config.baseUrl}${users}`, {
    method,
    headers: config.headers,
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    return res;
  })
}

function toChangeNames(inputName, inputDescription) {
  return post("/users/me", { name: inputName, about: inputDescription}, "PATCH");
}

function toChangeAvatar(avatarLink) {
  return post("/users/me/avatar", { avatar: avatarLink }, "PATCH");
}

function saveInfo(load, buttonText) {
  if (load) {
    buttonText.textContent = 'Сохранение...'
  } else {
    buttonText.textContent = 'Сохранить'
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
avatarPopup.addEventListener('submit', handleAvatarSubmit)

enableValidation(validationConfig);
