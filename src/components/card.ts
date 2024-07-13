import { addLike, deleteLike } from './api'

const cardTemplate = document.querySelector<HTMLTemplateElement>('#card-template')!.content.querySelector('.places__item')!;

interface LikeResponse {
  likes: { _id: string }[];
}

interface CardData {
  _id: string;
  name: string;
  link: string;
  likes: { _id: string }[];
  owner?: { _id: string };
}

type RemoveCard = (data: CardData) => void;
type OpenImg = (data: CardData) => void;
type HandleLike = (data: CardData, userID: string, cardElement: HTMLElement) => void;

export function createCard (data: CardData, removeCard: RemoveCard, openImg: OpenImg, handleLike: HandleLike, ID: string): HTMLElement {
  const cardElement = cardTemplate.cloneNode(true) as HTMLElement;
  const cardDeleteButton = cardElement.querySelector<HTMLButtonElement>('.card__delete-button')!;
  const cardImage = cardElement.querySelector<HTMLImageElement>('.card__image')!;
  const cardTitle = cardElement.querySelector<HTMLHeadingElement>('.card__title')!;
  const cardLikeButton = cardElement.querySelector<HTMLButtonElement>('.card__like-button')!;
  const cardLikeCount = cardElement.querySelector<HTMLElement>('.card__like-count')!;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardLikeCount.textContent = data.likes.length.toString();
  cardImage.addEventListener('click', () => openImg(data));
  cardLikeButton.addEventListener('click', () => handleLike(data, ID, cardElement));
  cardElement.id = data._id;

  if (data.owner && ID !== data.owner._id) {
    cardDeleteButton.remove();
  } else {
      cardDeleteButton.addEventListener('click', () => {
      removeCard(data);
    });
  };

  if (check(data, ID)) {
    cardLikeButton.classList.add('card__like-button_is-active')
  } else {
    cardLikeButton.classList.remove('card__like-button_is-active')
  }

  return cardElement;
}

export function handleLike(card: CardData, userID: string, cardElement: HTMLElement): void {
  const buttonLike = cardElement.querySelector<HTMLButtonElement>('.card__like-button')!;
  const buttonCount = cardElement.querySelector<HTMLElement>('.card__like-count')!;
  
  if (check(card, userID)) {
    deleteLike(card)
      .then((res) => {
        handleLikeSuccess(res, buttonLike, buttonCount);
        card.likes = res.likes;
      })
      .catch(handleLikeError);
  } else {
    addLike(card)
      .then((res) => {
        handleLikeSuccess(res, buttonLike, buttonCount);
        card.likes = res.likes;
      })
      .catch(handleLikeError);
  }
}

function handleLikeSuccess(res: LikeResponse, buttonLike: HTMLButtonElement, buttonCount: HTMLElement): void {
  buttonLike.classList.toggle('card__like-button_is-active');
  buttonCount.textContent = res.likes.length.toString();
}

function handleLikeError(err: Error): void {
  console.error(`Error message: ${err.message}`);
}

function check(data: CardData, userID: string): boolean {
  return data.likes.some((like) => like._id === userID);
}