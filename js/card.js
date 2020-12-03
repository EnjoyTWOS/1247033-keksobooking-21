'use strict';

(() => {
  const MAP_ACCOMODATION_LIST = {flat: `Квартира`, palace: `Дворец`, house: `Дом`, bungalow: `Бунгало`};
  const cardTemplate = document.querySelector(`#card`).content;
  const photosFragment = document.createDocumentFragment();
  const featureFragment = document.createDocumentFragment();


  const createPhotosFragment = (card, mapCard) => {
    const cardPhoto = mapCard.querySelector(`.popup__photo`);
    cardPhoto.setAttribute(`src`, card.offer.photos[0]);
    for (let i = 1; i < card.offer.photos.length; i++) {
      const photosMapCard = cardPhoto.cloneNode(true);
      photosMapCard.setAttribute(`src`, card.offer.photos[i]);

      photosFragment.appendChild(photosMapCard);
    }
    mapCard.querySelector(`.popup__photos`).appendChild(photosFragment);
  };

  const createFeatureFragment = (card) => {
    card.offer.features.forEach((it) => {
      const featureItem = document.createElement(`li`);
      featureItem.className = `popup__feature popup__feature--` + it;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };


  const onEscClose = (evt) => {
    window.util.isEscapeEvent(evt, removeCard);
  };

  const removeCard = () => {
    const mapCardRemovable = window.pin.mapElement.querySelector(`.map__card`);
    if (mapCardRemovable) {
      mapCardRemovable.remove();
      document.removeEventListener(`keydown`, onEscClose);
    }
  };


  window.card = {
    remove: removeCard,
    render(card) {
      const mapCard = cardTemplate.cloneNode(true);
      const mapCardCloseBtn = mapCard.querySelector(`.popup__close`);

      if (card.offer) {
        mapCard.querySelector(`.popup__title`).textContent = card.offer.title;
        mapCard.querySelector(`.popup__text--address`).textContent = card.offer.address;
        mapCard.querySelector(`.popup__features`).innerHTML = ``;
        mapCard.querySelector(`.popup__features`).appendChild(createFeatureFragment(card));
        mapCard.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь`;
        mapCard.querySelector(`.popup__type`).textContent = MAP_ACCOMODATION_LIST[card.offer.type];
        mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + card.offer.checkin + `, выезд до ` + card.offer.checkout;
        mapCard.querySelector(`.popup__description`).textContent = card.offer.description;
        mapCard.querySelector(`.popup__avatar`).setAttribute(`src`, card.author.avatar);

        if (card.offer.rooms === 0 || card.offer.guests === 0) {
          mapCard.querySelector(`.popup__text--capacity`).classList.add(`visually-hidden`);
        } else {
          mapCard.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + ` комнаты для ` + card.offer.guests + ` гостей`;
        }

        if (card.offer.photos.length > 0) {
          createPhotosFragment(card, mapCard);
        } else {
          mapCard.querySelector(`.popup__photo`).classList.add(`visually-hidden`);
        }

        const onCloseCardBtnClick = () => {
          removeCard();
          window.pin.removeHighlighter();
        };

        document.addEventListener(`keydown`, onEscClose);
        mapCardCloseBtn.addEventListener(`click`, onCloseCardBtnClick);
      }
      return mapCard;
    }
  };
})();
