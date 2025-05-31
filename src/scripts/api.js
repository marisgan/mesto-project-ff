const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-38',
  headers: {
    authorization: 'dc5938bf-8ae4-4a63-a820-9dffc086b23d',
    'Content-Type': 'application/json'
  }
}

function handleResponse(res, errorText) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      return resolve(res.json());
    } else {
      return reject(`${errorText}: ${res.status}`);
    }
  })
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


function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => handleResponse(
      res, 'Что-то пошло не так при запросе данных о карточках'
    ));
}


function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => handleResponse(
      res, 'Что-то пошло не так при запросе данных о пользователе'
    ));
}


function updateProfile(newName, newJob) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newJob
    })
  })
  .then(res => handleResponse(
    res, 'Что-то пошло не так при обновлении данных профиля'
  ));
}


function addNewCard(newName, newLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      link: newLink
    })
  })
  .then(res => handleResponse(res, 'Что-то пошло не так при добавлении карточки'));
}


function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => handleResponse(res, 'Что-то пошло не так при удалении карточки'));
}


function likeCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => handleResponse(res, 'Что-то пошло не так при установке лайка'));
}


function unlikeCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => handleResponse(res, 'Что-то пошло не так при снятии лайка'));
}


function updateAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar: link})
  })
  .then(res => handleResponse(res, 'Что-то пошло не так при изменении аватарки профиля'));
}


export {
  getInitialCards, getUserInfo, updateProfile,
  addNewCard, deleteCardApi, likeCardApi, unlikeCardApi,
  updateAvatar, checkImageUrl
};