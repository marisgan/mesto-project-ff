import { likeCardApi, unlikeCardApi } from './api.js';

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

  if (!isOwn) {
    cardDeleteButton.style = 'display: none';
  } else {
    cardDeleteButton.addEventListener('click', (evt) => {
    deleteCard(evt, cardData._id)
    });
  }

  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeButton.addEventListener('click', (evt) => {
    likeCard(evt, cardLikeButton, cardData, cardLikesNumber);
  });

  return cardElement;
}

function likeCard(evt, cardLikeButton, cardData, cardLikesNumber) {
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    unlikeCardApi(cardData._id)
      .then((data) => {
        cardLikesNumber.textContent = data.likes.length;
        renderLike(evt);
      })
      .catch(err => console.log(err));
  } else {
    likeCardApi(cardData._id)
      .then((data) => {
        cardLikesNumber.textContent = data.likes.length
        renderLike(evt);
      })
      .catch(err => console.log(err));
  }
}

function renderLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function renderDelete(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

export { createCard, likeCard, renderDelete };