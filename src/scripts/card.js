import { deleteCardApi, likeCardApi, unlikeCardApi } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, isOwn, isLiked, openCard, likeCard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikesNumber = cardElement.querySelector('.card__likes-number');

  cardImage.src = cardData.link;
  cardImage.alt ='Изображение места: ${cardData.name}';
  cardTitle.textContent = cardData.name;
  cardLikesNumber.textContent = cardData.likes.length;

  cardImage.addEventListener('click', (evt) => {
    openCard(evt);
  });

  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  if (!isOwn) {
    cardDeleteButton.style = 'display: none';
  }

  cardDeleteButton.addEventListener('click', (evt) => {
    handleDelete(evt, cardData);
    });

  cardLikeButton.addEventListener('click', (evt) => {
    handleLike(evt, cardLikeButton, cardData, cardLikesNumber);
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

function handleLike(evt, cardLikeButton, cardData, cardLikesNumber) {
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    unlikeCardApi(cardData._id)
      .then((data) => {
        cardLikesNumber.textContent = data.likes.length;
        likeCard(evt);
    })
  } else {
    likeCardApi(cardData._id)
      .then((data) => {
        cardLikesNumber.textContent = data.likes.length
        likeCard(evt);
    })
  }
}

function handleDelete(evt, cardData) {
  deleteCardApi(cardData._id)
    .then((res) => {
      deleteCard(evt);
    })
    .catch((err) => {
      console.log(err);
    })
}

export { createCard, likeCard, deleteCard };
