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
const MAP_PIN_HEIGHT = 44;
const MAP_PIN_WIDTH = 40;
// Активируем карту
const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
// Находим шаблон для копирование и элемент, куда будет копироваться информация
const mapPins = map.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;

// Записываем функции
const rand = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrI = (arr) => {
  let randomize = Math.floor(Math.random() * arr.length);
  return arr[randomize];
};

const renderAvatar = (imageQuantity) =>{
  for (let i = 1; i <= imageQuantity; i++) {
    mapAvatarArray.push(`img/avatars/user0` + i + `.png`);
  }


  return mapAvatarArray;
};

renderAvatar(pinsQuantity);


// Создаем массив обьектов
const renderMapsCardsArray = () => {
  for (let i = 0; i < pinsQuantity; i++) {
    let mapsCardTemplate =
  {
    author: {
      avatar: mapAvatarArray[i]
    },
    offer: {
      title: `Предложение: `,
      adress: `600, 350`,
      price: 10000,
      type: getRandomArrI(MAP_ACCOMODATION),
      rooms: getRandomArrI(ROOMS_QUANTITY),
      guests: getRandomArrI(GUESTS_QUANTITY),
      checkin: getRandomArrI(CHECK_IN_OUT_TIME),
      checkout: getRandomArrI(CHECK_IN_OUT_TIME),
      features: MAP_FEATURES,
      description: `Лучшее жилье`,
      photos: MAP_PHOTOS
    },
    location: {
      x: rand(0, 1100),
      y: rand(300, 600)
    }
  };
    mapsCardTemplateArray.push(mapsCardTemplate);
  }
  return mapsCardTemplateArray;
};

renderMapsCardsArray();

// Создаем отметку на карте
const renderPin = (pin) => {
  const mapPin = pinTemplate.cloneNode(true);

  mapPin.querySelector(`.map__pin`).style.left = pin.location.x - MAP_PIN_WIDTH / 2 + `px`;
  mapPin.querySelector(`.map__pin`).style.top = pin.location.y - MAP_PIN_HEIGHT + `px`;
  mapPin.querySelector(`img`).setAttribute(`src`, pin.author.avatar);
  mapPin.querySelector(`img`).setAttribute(`alt`, pin.offer.title);

  return mapPin;
};

// Создаем документ-фрагмент и через него выводим метки на карту
const fragment = document.createDocumentFragment();
for (let i = 0; i < mapsCardTemplateArray.length; i++) {
  fragment.appendChild(renderPin(mapsCardTemplateArray[i]));
}

mapPins.appendChild(fragment);
