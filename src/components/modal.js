export { openModal, closeModal };

const allPopups = document.querySelectorAll('.popup');

function openModal(popup) {
  setTimeout(() => popup.classList.add('popup_is-opened'), 200);
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeEsc); // If don't remove the eventlistener from closeModal, an error will occur.
}

function closeModal(popup) {
  setTimeout(() => popup.classList.remove('popup_is-animated'), 400); // For smoother performance, the value is set to 400; otherwise, it gets truncated.
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc); // "This piece of code fixes that."
}

function closeEsc(evt) {
  evt.code === 'Escape' && closeModal(document.querySelector('.popup_is-opened'));
}

allPopups.forEach((out) => {
  out.addEventListener('mouseup', (evt) => { // Somebody said that using 'mouseup' is better than 'mousedown,' but is it really?
    evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup_is-opened') ? closeModal(out) : null;
  });
});