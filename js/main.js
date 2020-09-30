"use strict";
// Записываем константы и переменные
const pinsQuantity = 8;
const MAP_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const MAP_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP_ACCOMODATION = [`flat`, `palace`, `house `, `bungalow`];
const ROOMS_QUANTITY = [1, 2, 3];
const GUESTS_QUANTITY = [0, 1, 2];
const CHECK_IN_OUT_TIME = [`12:00`, `13:00`, `14:00`];
let mapAvatarArray = [];
let mapsCardTemplateArray = [];

// Записываем функции
const rand = (min, max) => {
  return min + Math.floor(Math.random()) * (max - min);
};

const renderAvatar = (imageQuantity) =>{
  for (let i = 1; i <= imageQuantity; i++) {
    mapAvatarArray.push(`img/avatars/user0` + i + `.png`);
  }


  return mapAvatarArray;
};

renderAvatar(pinsQuantity);

// Создаем обьект карточки
const mapsCardTemplate =
  {
    author: {
      avatar: mapAvatarArray[0]
    },
    offer: {
      title: `Предложение: `,
      adress: `600, 350`,
      price: 10000,
      type: MAP_ACCOMODATION[0],
      rooms: ROOMS_QUANTITY[0],
      guests: GUESTS_QUANTITY[0],
      checkin: CHECK_IN_OUT_TIME[0],
      checkout: CHECK_IN_OUT_TIME[0],
      features: MAP_FEATURES,
      description: `Лучшее жилье`,
      photos: MAP_PHOTOS
    },
    location: {
      x: rand(0, 570),
      y: rand(0, 375)
    }
  };

// Создаем массив обьектов
const renderMapsCardsArray = (mapsCard) => {
  for (let i = 0; i < pinsQuantity; i++) {
    mapsCard =
  {
    author: {
      avatar: mapAvatarArray[i]
    },
    offer: {
      title: `Предложение: `,
      adress: `600, 350`,
      price: 10000,
      type: MAP_ACCOMODATION[i],
      rooms: ROOMS_QUANTITY[i],
      guests: GUESTS_QUANTITY[i],
      checkin: CHECK_IN_OUT_TIME[i],
      checkout: CHECK_IN_OUT_TIME[i],
      features: MAP_FEATURES,
      description: `Лучшее жилье`,
      photos: MAP_PHOTOS
    },
    location: {
      x: rand(0, 570),
      y: rand(0, 375)
    }
  };
    mapsCardTemplateArray.push(mapsCard);
  }
  return mapsCardTemplateArray;
};

renderMapsCardsArray(mapsCardTemplate);

// Активируем карту
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);

// Находим шаблон для копирование и элемент, куда будет копироваться информация
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;


// Выводим метки на карту
for (let i = 0; i < pinsQuantity; i++) {
  const mapPin = pinTemplate.cloneNode(true);

  mapPins.appendChild(mapPin);
}

