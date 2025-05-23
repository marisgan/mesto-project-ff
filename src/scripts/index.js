import '../pages/index.css';
import { initialCards, createCard, deleteCardHandler, likeCardHandler } from './card.js';

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popups =document.querySelectorAll('.popup');

// Edit profile popup
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileForm = document.querySelector('.popup_type_edit form');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_description');

// Add card popup
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup_type_new-card form');
const inputPlace = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
const popupAddCard = document.querySelector('.popup_type_new-card');

// Image popup
const popupImage = document.querySelector('.popup_type_image');
const imageBig = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

cardsContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__delete-button')) {
    deleteCardHandler(evt);
  } else if (evt.target.classList.contains('card__like-button')) {
    likeCardHandler(evt);
  } else if (evt.target.classList.contains('card__image')) {
    popupImage.classList.add('popup_is-opened');
    imageBig.src =evt.target.src;
    imageCaption.textContent = evt.target.closest('.card').textContent;
}});

initialCards.forEach((item) => {
  cardsContainer.append(createCard(cardTemplate, item));
});


editProfileButton.addEventListener('click', () => {
  popupEditProfile.classList.add('popup_is-opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});


profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupEditProfile.classList.remove('popup_is-opened');
});


popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
      popup.classList.remove('popup_is-opened');
    }
  });
});


document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      if (popup.classList.contains('popup_is-opened')) {
        popup.classList.remove('popup_is-opened');
      }
    });
  }
});

addButton.addEventListener('click', () => {
  popupAddCard.classList.add('popup_is-opened');
});

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  };
  cardsContainer.prepend(createCard(cardTemplate, newCard));
  popupAddCard.classList.remove('popup_is-opened');
  addForm.reset();
});