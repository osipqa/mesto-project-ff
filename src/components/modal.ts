export { openModal, closeModal };

function openModal(popup: HTMLElement): void {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

function closeModal(popup: HTMLElement): void {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
}

function closeEsc(evt: KeyboardEvent): void {
  if (evt.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened') as HTMLElement | null;
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}