import '../pages/index.css';
import { createCard, renderDelete, renderLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getInitialCards, getUserInfo, updateProfile, addNewCard,
  deleteCardApi, updateAvatar, likeCardApi, unlikeCardApi,
  validateImageUrl
} from './api.js';

const cardsContainer = document.querySelector('.places__list');

// Edit profile popup
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const submitProfile = popupEditProfile.querySelector('.popup__button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileForm = document.querySelector('.popup_type_edit form');
const profileImage = document.querySelector('.profile__image');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_description');
const popupAvatar = document.querySelector('.popup_type_avatar');
const submitAvatar = popupAvatar.querySelector('.popup__button');
const avatarForm = document.querySelector('.popup_type_avatar form');
const inputAvatar = document.querySelector('.popup__input_type_avatar');

// Add new card popup
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup_type_new-card form');
const inputPlace = document.querySelector('.popup__input_type_card-name');
const inputLink = document.querySelector('.popup__input_type_url');
const popupAddCard = document.querySelector('.popup_type_new-card');
const submitNewCard = popupAddCard.querySelector('.popup__button');

// Card view popup
const popupCard = document.querySelector('.popup_type_image');
const imageBig = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__caption');


// Validation
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const userPromise = getUserInfo();
const cardsPromise = getInitialCards();

function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

function openCard(evt) {
  openModal(popupCard);
  imageBig.src = evt.target.src;
  imageBig.alt = evt.target.alt;
  imageCaption.textContent = evt.target.closest('.card').textContent;
}

function renderError(errorText, popupElement) {
  const errorElement = popupElement.querySelector('.popup__error');
  errorElement.textContent = errorText;
}

function clearError(popupElement) {
  const errorElement = popupElement.querySelector('.popup__error');
  errorElement.textContent = '';
}

function deleteCard(evtIcon, cardId, popupConfirm, confirmForm) {
  openModal(popupConfirm);
  confirmForm.addEventListener('submit', (evtConfirm) => {
    evtConfirm.preventDefault();
    deleteCardApi(cardId)
      .then(() => {
        closeModal(popupConfirm);
        renderDelete(evtIcon);
      })
      .catch(err => renderError(err, popupConfirm));
  })
}


function likeCard(evt, cardLikeButton, cardData, cardLikesNumber) {
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    unlikeCardApi(cardData._id)
      .then((data) => {
        cardLikesNumber.textContent = data.likes.length;
        renderLike(evt);
    })
  } else {
    likeCardApi(cardData._id)
      .then((data) => {
        cardLikesNumber.textContent = data.likes.length
        renderLike(evt);
    })
  }
}

enableValidation(validationConfig);

Promise.all([userPromise, cardsPromise])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileImage.style = `background-image: url(${user.avatar})`;
    cards.forEach((cardObject) => {
      const isOwn = cardObject.owner._id === user._id;
      const isLiked = cardObject.likes.some(item => item._id === user._id);
      cardsContainer.append(createCard(cardObject, isOwn, isLiked, openCard, likeCard, deleteCard));
    })
  })
  .catch((err) => {
    console.log(err);
  })

// Edit profile

editProfileButton.addEventListener('click', () => {
  openModal(popupEditProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  clearValidation(profileForm, validationConfig);
  clearError(popupEditProfile);
});

profileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, submitProfile);
  updateProfile(inputName.value, inputJob.value)
    .then((userObject) => {
      profileName.textContent = userObject.name;
      profileJob.textContent = userObject.about;
      closeModal(popupEditProfile);
    })
    .catch(err => renderError(err, popupEditProfile))
    .finally(() => renderLoading(false, submitProfile));
});


profileImage.addEventListener('click', (evt) => {
  openModal(popupAvatar);
  clearError(popupAvatar);
  inputAvatar.value = '';
  clearValidation(avatarForm, validationConfig);
});

avatarForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, submitAvatar);

  validateImageUrl(inputAvatar.value)
    .then(() => {
      return updateAvatar(inputAvatar.value);
    })
    .then((data) => {
      profileImage.style = `background-image: url(${data.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        renderError('Ошибка сети или блокировка CORS. Проверьте URL.', popupAvatar);
      } else {
        renderError(err.message || 'Произошла неизвестная ошибка', popupAvatar);
      }
    })
    .finally(() => {
      renderLoading(false, submitAvatar);
    })
});

// Add new card

addButton.addEventListener('click', () => {
  openModal(popupAddCard);
  clearValidation(addForm, validationConfig);
  clearError(popupAddCard);
  inputPlace.value = '';
  inputLink.value = '';
});

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderLoading(true, submitNewCard);
  const newCard = {
    name: inputPlace.value,
    link: inputLink.value
  };
  addNewCard(newCard.name, newCard.link)
    .then((cardObject) => {
      const isOwn = true;
      const isLiked = false;
      cardsContainer.prepend(createCard(cardObject, isOwn, isLiked, openCard, likeCard, deleteCard));
      closeModal(popupAddCard);
      addForm.reset();
    })
    .catch(err => renderError(err, popupAddCard))
    .finally(() => renderLoading(false, submitNewCard));
});
