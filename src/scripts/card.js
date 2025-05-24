function createCard(cardTemplate, cardData, likeCard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt ='Изображение места: ${cardData.name}';
  cardTitle.textContent = cardData.name;

  cardLikeButton.addEventListener('click', (evt) => {
    likeCard(evt);
  });
  cardDeleteButton.addEventListener('click', (evt) => {
    deleteCard(evt);
  });
  return cardElement;
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

export { createCard, likeCard, deleteCard };