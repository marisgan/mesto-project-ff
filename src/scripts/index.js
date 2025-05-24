import '../pages/index.css';
import { createCard, likeCard, deleteCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { initialCards } from './cards.js';

const cardsContainer = document.querySelector('.places__list');

// Edit profile popup
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileForm = document.querySelector('.popup_type_edit form');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_description');

// Add new card popup
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup_type_new-card form');
const inputPlace = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
const popupAddCard = document.querySelector('.popup_type_new-card');

// Card view popup
const popupCard = document.querySelector('.popup_type_image');
const imageBig = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');

function openCard(evt) {
  openModal(popupCard);
  imageBig.src = evt.target.src;
  imageBig.alt = evt.target.alt;
  imageCaption.textContent = evt.target.closest('.card').textContent;
}

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item, openCard, likeCard, deleteCard));
});

// Edit profile

editProfileButton.addEventListener('click', () => {
  openModal(popupEditProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeModal(popupEditProfile);
});

// Add new card

addButton.addEventListener('click', () => {
  openModal(popupAddCard);
});

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  };
  cardsContainer.prepend(createCard(newCard, openCard, likeCard, deleteCard));
  closeModal(popupAddCard);
  addForm.reset();
});
