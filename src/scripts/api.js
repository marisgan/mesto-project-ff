const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: 'dc5938bf-8ae4-4a63-a820-9dffc086b23d',
    'Content-Type': 'application/json'
  }
}

const paths = {
  cards: '/cards',
  me: '/users/me',
  likes: '/cards/likes',
  avatar: '/users/me/avatar'
}

const errorMessages = {
  cards: 'Не удалось загрузить карточки',
  me: 'Не удалось получить данные пользователя',
  patchProfile: 'Не удалось обновить профиль',
  addCard: 'Не удалось добавить карточку',
  deleteCard: 'Не удалось удалить карточку',
  like: 'Не удалось поставить лайк',
  unlike: 'Не удалось снять лайк',
  avatar: 'Не удалось изменить аватар профиля'
}

function apiRequest(method, path, errorMessage, body = null, pathParam = null) {
  const options = {
    method: method,
    headers: config.headers
  };

  if (pathParam) path = `${path}/${pathParam}`;
  if (body) options.body = JSON.stringify(body);

  return fetch(`${config.baseUrl}${path}`, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`${errorMessage}: ${res.status}`));
    });
}

function getInitialCards() {
  return apiRequest('GET', paths.cards, errorMessages.cards);
}

function getUserInfo() {
  return apiRequest('GET', paths.me, errorMessages.me);
}

function updateProfile(newName, newAbout) {
  return apiRequest(
    'PATCH', paths.me, errorMessages.patchProfile,
    {name: newName, about: newAbout}
  );
}

function addNewCard(newName, newLink) {
  return apiRequest(
    'POST', paths.cards, errorMessages.addCard,
    {name: newName, link: newLink}
  );
}

function deleteCardApi(cardId) {
  return apiRequest('DELETE', paths.cards, errorMessages.deleteCard, null, cardId);
}

function likeCardApi(cardId) {
  return apiRequest('PUT', paths.likes, errorMessages.like, null, cardId);
}

function unlikeCardApi(cardId) {
  return apiRequest('DELETE', paths.likes, errorMessages.unlike, null, cardId);
}

function updateAvatar(link) {
  return apiRequest('PATCH', paths.avatar, errorMessages.avatar, {avatar: link});
}

function checkImageUrl(url) {
  return fetch(url, {
    method: 'HEAD'
  })
    .then ((res) => {
      const contentType = res.headers.get('Content-Type');
      if (res.ok && contentType && contentType.startsWith('image/')) {
        return true;
      }
      throw new Error(`URL не подходит: ${res.status}`);
    });
}

export {
  getInitialCards, getUserInfo, updateProfile,
  addNewCard, deleteCardApi, likeCardApi, unlikeCardApi,
  updateAvatar, checkImageUrl
};