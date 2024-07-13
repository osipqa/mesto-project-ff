type Config = {
  baseUrl: string,
  headers: {
    authorization: string;
    'Content-Type': string;
  };
};

type ApiResponse<T> = Promise<T>;

const config: Config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '637888a1-9ced-4570-b92f-3c1ad708077b',
    'Content-Type': 'application/json'
  }
}

export async function getInfo(data: string): ApiResponse<any> {
  try {
    const response = await fetch(`${config.baseUrl}${data}`, {
      method: 'GET',
      headers: config.headers
    });
    return await response.json();
  } catch (err) {
    return Promise.reject(`Error: ${(err as Response).status}`);
  }
}


export async function getCards(data: string): ApiResponse<any> {
  try {
    const response = await fetch(`${config.baseUrl}${data}`, {
      method: 'GET',
      headers: config.headers
    });
    return await response.json();
  } catch (err) {
    return Promise.reject(`Error: ${(err as Response).status}`);
  };
};

async function post(url: string, data: any, method: string = 'POST', userID?: string): ApiResponse<any> {
  try {
    const response = await fetch(`${config.baseUrl}${url}`, {
      method,
      headers: {
        ...config.headers,
        Authorization: userID || config.headers.authorization
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    return Promise.reject((err as Error).message);
  }
}

export async function toChangeNames(inputName: string, inputDescription: string): ApiResponse<any> {
  return await post('/users/me', { name: inputName, about: inputDescription }, 'PATCH');
}

export async function toChangeAvatar(avatarLink: string): ApiResponse<any> {
  return await post('/users/me/avatar', { avatar: avatarLink }, 'PATCH');
}

export async function addCards(dataName: string, dataLink: string): ApiResponse<any> {
  return await post('/cards', { name: dataName, link: dataLink });
}

export async function deleteCards(cardId: string): ApiResponse<any> {
  return await post(`/cards/${cardId}`, {}, 'DELETE');
}

export async function deleteLike(data: { _id: string }): ApiResponse<any> {
  return await post(`/cards/likes/${data._id}`, {}, 'DELETE');
}

export async function addLike(data: { _id: string }): ApiResponse<any> {
  return await post(`/cards/likes/${data._id}`, {}, 'PUT');
}