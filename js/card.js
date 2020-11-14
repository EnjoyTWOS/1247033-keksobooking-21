'use strict';

(() => {
  const PINS_QUANTITY = 8;
  const MAP_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const MAP_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const ACCOMODATION_LIST = [`flat`, `palace`, `house`, `bungalow`];
  const MAP_ACCOMODATION_LIST = {flat: `Квартира`, palace: `Дворец`, house: `Дом`, bungalow: `Бунгало`};
  const ROOMS_QUANTITY = [1, 2, 3];
  const GUESTS_QUANTITY = [0, 1, 2];
  const CHECK_IN_OUT_TIME = [`12:00`, `13:00`, `14:00`];
  const mapAvatarArray = [];
  const mapsCardTemplateArray = [];
  const cardTemplate = document.querySelector(`#card`).content;
  const photosFragment = document.createDocumentFragment();

  const renderAvatar = (imageQuantity) => {
    for (let i = 1; i <= imageQuantity; i++) {
      mapAvatarArray.push(`img/avatars/user0` + i + `.png`);
    }
    return mapAvatarArray;
  };

  const renderPhotos = (card, mapCard) => {
    mapCard.querySelector(`.popup__photo`).setAttribute(`src`, card.offer.photos[0]);
    for (let i = 1; i < card.offer.photos.length; i++) {
      const photosMapCard = mapCard.querySelector(`.popup__photo`).cloneNode(true);
      photosMapCard.setAttribute(`src`, card.offer.photos[i]);

      photosFragment.appendChild(photosMapCard);
    }
    mapCard.querySelector(`.popup__photos`).appendChild(photosFragment);
  };

  window.card = {
    renderMapsCardsArray() {
      for (let i = 0; i < PINS_QUANTITY; i++) {
        const mapsCardTemplate =
      {
        author: {
          avatar: renderAvatar(PINS_QUANTITY)[i]
        },
        offer: {
          title: `Предложение: `,
          adress: `location.x, location.y`,
          price: 10000,
          type: MAP_ACCOMODATION_LIST[window.util.getRandomArrI(ACCOMODATION_LIST)],
          rooms: window.util.getRandomArrI(ROOMS_QUANTITY),
          guests: window.util.getRandomArrI(GUESTS_QUANTITY),
          checkin: window.util.getRandomArrI(CHECK_IN_OUT_TIME),
          checkout: window.util.getRandomArrI(CHECK_IN_OUT_TIME),
          features: MAP_FEATURES,
          description: `Лучшее жилье`,
          photos: MAP_PHOTOS
        },
        location: {
          x: window.util.rand(0, 1100),
          y: window.util.rand(300, 600)
        }
      };
        mapsCardTemplateArray.push(mapsCardTemplate);
      }
      return mapsCardTemplateArray;
    },
    render(card) {
      const mapCard = cardTemplate.cloneNode(true);

      mapCard.querySelector(`.popup__title`).textContent = card.offer.title;
      mapCard.querySelector(`.popup__text--address`).textContent = card.offer.adress;
      mapCard.querySelector(`.popup__text--price`).textContent = card.offer.price + `₽/ночь`;
      mapCard.querySelector(`.popup__type`).textContent = MAP_ACCOMODATION_LIST[card.offer.type];
      mapCard.querySelector(`.popup__text--capacity`).textContent = card.offer.rooms + ` комнаты для ` + card.offer.guests + ` гостей`;
      mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ` + card.offer.checkin + `, выезд до ` + card.offer.checkout;
      mapCard.querySelector(`.popup__description`).textContent = card.offer.description;
      mapCard.querySelector(`.popup__avatar`).setAttribute(`src`, card.author.avatar);

      if (card.offer.photos.length > 0) {
        renderPhotos(card, mapCard);
      } else {
        mapCard.querySelector(`.popup__photo`).classList.add(`visually-hidden`);
      }

      return mapCard;
    }
  };
})();
