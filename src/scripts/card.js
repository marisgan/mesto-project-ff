function createCard(cardTemplate, cardData) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  return cardElement;
}

function deleteCardHandler(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

function likeCardHandler(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCardHandler, likeCardHandler };