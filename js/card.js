'use strict';

(() => {
  const PINS_QUANTITY = 8;
  const MAP_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const MAP_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const MAP_ACCOMODATION_LIST = [`flat`, `palace`, `house `, `bungalow`];
  const ROOMS_QUANTITY = [1, 2, 3];
  const GUESTS_QUANTITY = [0, 1, 2];
  const CHECK_IN_OUT_TIME = [`12:00`, `13:00`, `14:00`];
  const mapAvatarArray = [];
  const mapsCardTemplateArray = [];

  const init = () => {
    renderAvatar(PINS_QUANTITY);
  };

  const renderAvatar = (imageQuantity) => {
    for (let i = 1; i <= imageQuantity; i++) {
      mapAvatarArray.push(`img/avatars/user0` + i + `.png`);
    }
    return mapAvatarArray;
  };

  init();

  window.card = {
    renderMapsCardsArray() {
      for (let i = 0; i < PINS_QUANTITY; i++) {
        const mapsCardTemplate =
      {
        author: {
          avatar: mapAvatarArray[i]
        },
        offer: {
          title: `Предложение: `,
          adress: `location.x, location.y`,
          price: 10000,
          type: window.util.getRandomArrI(MAP_ACCOMODATION_LIST),
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
    mapsCardTemplateArray
  };
})();
