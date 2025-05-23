const popupCard = document.querySelector('.popup_type_image');
const imageBig = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');
import { openModal } from './modal.js';


function createCard(cardTemplate, cardData, openCard, likeCard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  cardImage.src = cardData.link;
  cardImage.alt ='Изображение места: ${cardData.name}';
  cardTitle.textContent = cardData.name;
  cardElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__image')) {
      openCard(evt);
    } else if (evt.target.classList.contains('card__like-button')) {
      likeCard(evt);
    } else if (evt.target.classList.contains('card__delete-button')) {
      deleteCard(evt);
    }
  });
  return cardElement;
}

function openCard(evt) {
  openModal(popupCard);
  imageBig.src = evt.target.src;
  imageBig.alt = evt.target.alt;
  imageCaption.textContent = evt.target.closest('.card').textContent;
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

export { createCard, openCard, likeCard, deleteCard };