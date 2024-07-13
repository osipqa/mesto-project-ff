import './styles/index.css';
import { createCard, handleLike } from './components/card';
import { getInfo, getCards, deleteCards, toChangeAvatar, toChangeNames, addCards} from './components/api';
import { closeModal, openModal } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';

interface User {
  _id: string;
  name: string;
  about: string;
  avatar: string;
}

interface Card {
  _id: string;
  name: string;
  link: string;
  likes: { _id: string }[];
  owner?: { _id: string };
}

// variable names
const cardContainer = document.querySelector<HTMLDivElement>('.places__list')!;
const profileEditButton = document.querySelector<HTMLButtonElement>('.profile__edit-button')!;
const profileButtonAdd = document.querySelector<HTMLButtonElement>('.profile__add-button')!;
const profileImage = document.querySelector<HTMLDivElement>('.profile__image')!;
const avatarPopup = document.querySelector<HTMLFormElement>('.popup__avatar')!;
const inputLinkAvatar = document.getElementById('link-avatar-input') as HTMLInputElement;
const popupDeleteCard = document.querySelector<HTMLDivElement>('.popup_delete-image')!;
const popupDeleteCardButton = popupDeleteCard.querySelector<HTMLButtonElement>('.popup__button')!;
const popupButton = avatarPopup.querySelector<HTMLButtonElement>('.popup__button')!;
const newCardPopup = document.querySelector<HTMLFormElement>('.popup_type_new-card')!;
const imageOpenPopup = document.querySelector<HTMLDivElement>('.popup_type_image')!;
const imagePopupImage = imageOpenPopup.querySelector<HTMLImageElement>('.popup__image')!;
const imagePopupCaption = document.querySelector<HTMLParagraphElement>('.popup__caption')!;
const profileName = document.querySelector<HTMLHeadingElement>('.profile__title')!;
const profileDescription = document.querySelector<HTMLParagraphElement>('.profile__description')!;
const popupProfileEdit = document.querySelector<HTMLFormElement>('.popup_type_edit')!;
const popupProfileButton = popupProfileEdit.querySelector<HTMLButtonElement>('.popup__button')!;
const formProfileEdit = popupProfileEdit.querySelector<HTMLFormElement>('.popup__form')!;
const inputName = formProfileEdit.querySelector<HTMLInputElement>('.popup__input_type_name')!;
const inputDescription = formProfileEdit.querySelector<HTMLInputElement>('.popup__input_type_description')!;
const allPopups = document.querySelectorAll<HTMLDivElement>('.popup');
const cardButton = newCardPopup.querySelector<HTMLButtonElement>('.popup__button')!;
const inputPlaceNameFormAddNewCard = newCardPopup.querySelector<HTMLInputElement>('.popup__input_type_card-name')!;
const inputPlaceLinkFormAddNewCard = newCardPopup.querySelector<HTMLInputElement>('.popup__input_type_url')!;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

allPopups.forEach((out) => {
  out.addEventListener('mouseup', ({ target, currentTarget }) => { 
    const isTargetCloseButton = (target as HTMLElement).classList.contains('popup__close');
    const isTargetOverlay = target === currentTarget;
    if (isTargetCloseButton || isTargetOverlay) closeModal(out);
  });
});

Promise.all([getInfo("/users/me"), getCards("/cards")])
  .then(([currentUser, cards]: [User, Card[]]) => {
    profileName.textContent = currentUser.name;
    profileDescription.textContent = currentUser.about;
    profileImage.style.backgroundImage = `url('${currentUser.avatar}')`;
    console.log("Current user ID:", currentUser._id);
    cards.forEach(card => cardContainer.append(createCard(card, removeCard, openImg, handleLike, currentUser._id)));
  })
  .catch((err) => Promise.reject(`Error: ${err.status}`));

function handleProfileFormSubmit(evt: Event): void {
  evt.preventDefault();
  saveInfo(true, popupProfileButton);
  toChangeNames(inputName.value, inputDescription.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveInfo(false, popupProfileButton);
      closeModal(popupProfileEdit);
    });
}


function handleAvatarSubmit(evt: Event): void {
  evt.preventDefault();
  saveInfo(true, popupButton);
  toChangeAvatar(inputLinkAvatar.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
    })
    .catch((err) => console.log(err))
    .finally(() => { 
      saveInfo(false, popupButton);
      closeModal(avatarPopup);
    });
}

function handleCardSubmit(evt: Event): void {
  evt.preventDefault();
  saveInfo(true, cardButton);
  addCards(inputPlaceNameFormAddNewCard.value, inputPlaceLinkFormAddNewCard.value)
    .then((card) => {
      cardContainer.append(createCard(card, removeCard, openImg, handleLike, card.owner?._id!));
    })
    .catch(err => console.log(err))
    .finally(() => {
      saveInfo(false, cardButton);
      closeModal(newCardPopup);
    });
  (newCardPopup.querySelector('.popup__form') as HTMLFormElement).reset();
}

function handleDeleteCard(evt: Event): void {
  evt.preventDefault();
  saveInfo(true, popupDeleteCardButton);
  const cardID = popupDeleteCardButton.dataset.cardId!;
  deleteCards(cardID)
    .then(() => {
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

function removeCard(card: Card): void {
  openModal(popupDeleteCard);
  popupDeleteCardButton.dataset.cardId = card._id;
}

function openImg(data: Card): void {
  imagePopupImage.alt = data.name;
  imagePopupCaption.textContent = data.name;
  imagePopupImage.src = data.link;
  openModal(imageOpenPopup);
}

function saveInfo(load: boolean, button: HTMLButtonElement): void {
  if (load) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = button.dataset.buttonText!;
  }
}

profileEditButton.addEventListener('click', () => {
  inputName.value = profileName.textContent!;
  inputDescription.value = profileDescription.textContent!;
  clearValidation(popupProfileEdit, validationConfig);
  openModal(popupProfileEdit);
});

profileButtonAdd.addEventListener('click', () => {
  clearValidation(newCardPopup, validationConfig);
  openModal(newCardPopup);
});

profileImage.addEventListener('click', () => {
  inputLinkAvatar.value = '';
  clearValidation(avatarPopup, validationConfig);
  openModal(avatarPopup);
});

newCardPopup.addEventListener('submit', handleCardSubmit);
formProfileEdit.addEventListener('submit', handleProfileFormSubmit);
avatarPopup.addEventListener('submit', handleAvatarSubmit);
popupDeleteCardButton.addEventListener('click', handleDeleteCard);

enableValidation(validationConfig);