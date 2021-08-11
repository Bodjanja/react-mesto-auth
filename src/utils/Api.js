export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl
    this._token = data.token
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json()
    }
    else{return Promise.reject(`Ошибка: ${res.status}`)}
  }

  getInitialCards() {//Получить все начальные карточки с сервера для вставки их в разметку
    return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
  }

  getUserData() {//Получить информацию о профиле с сервера для вставки в разметку
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse)
  }

  editProfileData(userName, userDescription) {//Отправить отредактированные данные профиля на сервер
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userName,
          about: userDescription
        })
      })
      .then(this._checkResponse)
  }

  updateProfileAvatar(updateAvatar) {//Отправить отредактированный URL аватара на сервер
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: updateAvatar
        })
      })
      .then(this._checkResponse)
  }

  postNewCard(cardName, cardLink) {//Отправить на сервер новую карточку и добавить её в разметку
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: `${this._token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: cardName,
          link: cardLink
        })
      })
      .then(this._checkResponse)
  }

  removeCard(_id){//Удаление карточки на сервере
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
                authorization: this._token
            }
        })
    .then(this._checkResponse)
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  token: '1244c08d-1491-4631-b0bc-6d7f22b0d3e5'
  }
);