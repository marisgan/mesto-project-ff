import '../pages/index.css';
import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function makeCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);

  return cardElement;
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

initialCards.forEach((item) => {
  cardsContainer.append(makeCard(item, deleteCard));
});
