const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '637888a1-9ced-4570-b92f-3c1ad708077b',
    'Content-Type': 'application/json'
  }
}

export function getInfo(data) {
  return fetch(`${config.baseUrl}${data}`, {
    method: "GET",
    headers: config.headers,
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    return res;
  })
}

export function getCards(data) {
  return fetch(`${config.baseUrl}${data}`, {
    method: "GET",
    headers: config.headers,
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    return res;
  })
}

function post(users, data, method = "POST") {
  return fetch(`${config.baseUrl}${users}`, {
    method,
    headers: config.headers,
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(res => {
    console.log(res);
    return res;
  })
}

export function toChangeNames(inputName, inputDescription) {
  return post("/users/me", { name: inputName, about: inputDescription}, "PATCH");
}

export function toChangeAvatar(avatarLink) {
  return post("/users/me/avatar", { avatar: avatarLink }, "PATCH");
}

export function addCards(dataName, dataLink) {
  return post("/cards", { name: dataName, link: dataLink});
}

export function deleteCards(cardId) {
  return post(`/cards/${cardId}`, {}, "DELETE");
}

export function deleteLike(data) {
  return post(`/cards/likes/${data['_id']}`, {}, "DELETE");
}

export function addLike(data) {
  return post(`/cards/likes/${data['_id']}`, {}, "PUT");
}