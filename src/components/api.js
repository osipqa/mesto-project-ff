const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: process.env.token,
    'Content-Type': 'application/json'
  }
}

export async function getInfo (data) {
  return await fetch(`${config.baseUrl}${data}`, {
    method: 'GET',
    headers: config.headers
  })
    .then(async res => await res.json())
    .catch(async (err) => await Promise.reject(`Error: ${err.status}`))
}

export async function getCards (data) {
  return await fetch(`${config.baseUrl}${data}`, {
    method: 'GET',
    headers: config.headers
  })
    .then(async res => await res.json())
    .catch(async (err) => await Promise.reject(`Error: ${err.status}`))
}

async function post (url, data, method = 'POST', userID) {
  return await fetch(`${config.baseUrl}${url}`, {
    method,
    headers: {
      ...config.headers,
      Authorization: userID || config.headers.authorization
    },
    body: JSON.stringify(data)
  })
    .then(async res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`)
      }
      return await res.json()
    })
    .catch(async err => await Promise.reject(err.message))
}

export async function toChangeNames (inputName, inputDescription) {
  return await post('/users/me', { name: inputName, about: inputDescription }, 'PATCH')
}

export async function toChangeAvatar (avatarLink) {
  return await post('/users/me/avatar', { avatar: avatarLink }, 'PATCH')
}

export async function addCards (dataName, dataLink) {
  return await post('/cards', { name: dataName, link: dataLink })
}

export async function deleteCards (cardId) {
  return await post(`/cards/${cardId}`, {}, 'DELETE')
}

export async function deleteLike (data) {
  return await post(`/cards/likes/${data._id}`, {}, 'DELETE')
}

export async function addLike (data) {
  return await post(`/cards/likes/${data._id}`, {}, 'PUT')
}
