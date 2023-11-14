export { openModal, closeModal };

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc); // If don't remove the eventlistener from closeModal, an error will occur.
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc); // "This piece of code fixes that."
}

function closeEsc(evt) {
  evt.code === 'Escape' && closeModal(document.querySelector('.popup_is-opened'));
}