function openModal(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', escapeClose);
  element.addEventListener('click', overlayCrossClose);
}

function closeModal(element) {
  element.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escapeClose);
  element.removeEventListener('click', overlayCrossClose);
}

function escapeClose (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function overlayCrossClose (evt) {
  if (evt.target.classList.contains('popup_is-opened') ||
      evt.target.classList.contains('popup__close')
  ) {
    closeModal(evt.currentTarget);
  }
}

export { openModal, closeModal };
