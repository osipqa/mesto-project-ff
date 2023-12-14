const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '637888a1-9ced-4570-b92f-3c1ad708077b',
    'Content-Type': 'application/json'
  }
}

function get() {
  return fetch(config.baseUrl, {
    headers: config.headers,
  })
  .then(otvet)
}

const otvet = (ok) => {
  if (ok.ok) {
    return ok.json();
  } else {
    return Promise.reject(`Error: ${ok.status}`);
  }
}

get();