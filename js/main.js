"use strict";
// Записываем константы и переменные
const PINS_QUANTITY = 8;
const MAP_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const MAP_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP_ACCOMODATION_LIST = [`flat`, `palace`, `house `, `bungalow`];
const ROOMS_QUANTITY = [1, 2, 3];
const GUESTS_QUANTITY = [0, 1, 2];
const CHECK_IN_OUT_TIME = [`12:00`, `13:00`, `14:00`];
const MAP_PIN_HEIGHT = 70;
const MAP_PIN_WIDTH = 50;
const MAP_PIN_MAIN_ACTIVE_HEIGHT = 84;
const MAP_PIN_MAIN_DISABLED_HEIGHT = 62;
const MAP_PIN_MAIN_WIDTH = 62;
const mapAvatarArray = [];
const mapsCardTemplateArray = [];
const mapElement = document.querySelector(`.map`);
const fragment = document.createDocumentFragment();
const mapPinMain = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const formHeader = document.querySelector(`.ad-form-header`);
const formElements = document.querySelectorAll(`.ad-form__element`);
const mapFilters = document.querySelectorAll(`.map__filter`);
const mapFeatures = document.querySelectorAll(`.map__feature`);
const formAdressInput = document.querySelector(`#address`);
const roomsQuantityList = document.querySelector(`#room_number`);
const guestsQuantityList = document.querySelector(`#capacity`);
// Находим шаблон для копирование и элемент, куда будет копироваться информация
const mapPinsTemplate = mapElement.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content;

// Записываем функции
const disableElemnts = () => {
  formHeader.setAttribute(`disabled`, `disabled`);
  for (const formElement of formElements) {
    formElement.setAttribute(`disabled`, `disabled`);
  }
  for (const mapFilter of mapFilters) {
    mapFilter.setAttribute(`disabled`, `disabled`);
  }
  for (const mapFeature of mapFeatures) {
    mapFeature.setAttribute(`disabled`, `disabled`);
  }
};

const enableElements = () => {
  mapElement.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  formHeader.removeAttribute(`disabled`, `disabled`);
  for (const formElement of formElements) {
    formElement.removeAttribute(`disabled`, `disabled`);
  }
  for (const mapFilter of mapFilters) {
    mapFilter.removeAttribute(`disabled`, `disabled`);
  }
  for (const mapFeature of mapFeatures) {
    mapFeature.removeAttribute(`disabled`, `disabled`);
  }
  renderMapPinsTemplate();
  giveAdressActive();
};

const rand = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrI = (arr) => {
  const randomize = Math.floor(Math.random() * arr.length);
  return arr[randomize];
};

const renderAvatar = (imageQuantity) => {
  for (let i = 1; i <= imageQuantity; i++) {
    mapAvatarArray.push(`img/avatars/user0` + i + `.png`);
  }
  return mapAvatarArray;
};


const giveAdressDisabled = () => {
  formAdressInput.value = (parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2) + `,` + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_DISABLED_HEIGHT / 2);
};

const giveAdressActive = () => {
  formAdressInput.value = (parseInt(mapPinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2) + `,` + (parseInt(mapPinMain.style.top, 10) + MAP_PIN_MAIN_ACTIVE_HEIGHT);
};

const isMainButton = (evt) => {
  if (typeof evt === `object`) {
    switch (evt.button) {
      case 0:
        enableElements();
    }
  }
};

const isEnter = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    enableElements();
  }
};

const isRoomsValid = () => {
  if (roomsQuantityList.value === `1`) {
    roomsQuantityList.setCustomValidity(`для 1 гостя`);
  } else if (roomsQuantityList.value === `2`) {
    roomsQuantityList.setCustomValidity(`для 2 гостей или для 1 гостя`);
  } else if (roomsQuantityList.value === `3`) {
    roomsQuantityList.setCustomValidity(`для 3 гостей, для 2 гостей или для 1 гостя`);
  } else if (roomsQuantityList.value === `100`) {
    roomsQuantityList.setCustomValidity(`не для гостей`);
  }
  roomsQuantityList.reportValidity();
};

const isGuestsValid = () => {
  if (guestsQuantityList.value === `1`) {
    guestsQuantityList.setCustomValidity(`1, 2 или 3 комнаты`);
  } else if (guestsQuantityList.value === `2`) {
    guestsQuantityList.setCustomValidity(`2 или 3 комнаты`);
  } else if (guestsQuantityList.value === `3`) {
    guestsQuantityList.setCustomValidity(`только 3 комнаты`);
  } else if (guestsQuantityList.value === `0`) {
    guestsQuantityList.setCustomValidity(`не для гостей`);
  }
  guestsQuantityList.reportValidity();
};

// Добавляем обработчики событий
mapPinMain.addEventListener(`mousedown`, isMainButton);
mapPinMain.addEventListener(`keydown`, isEnter);
roomsQuantityList.addEventListener(`change`, isRoomsValid);
guestsQuantityList.addEventListener(`change`, isGuestsValid);

// Создаем массив обьектов
const renderMapsCardsArray = () => {
  for (let i = 0; i < PINS_QUANTITY; i++) {
    const mapsCardTemplate =
  {
    author: {
      avatar: mapAvatarArray[i]
    },
    offer: {
      title: `Предложение: `,
      adress: `600, 350`,
      price: 10000,
      type: getRandomArrI(MAP_ACCOMODATION_LIST),
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

const init = () => {
  renderAvatar(PINS_QUANTITY);
  renderMapsCardsArray();
  giveAdressDisabled();
  disableElemnts();
};


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

const renderMapPinsTemplate = () => {
  for (let i = 0; i < mapsCardTemplateArray.length; i++) {
    fragment.appendChild(renderPin(mapsCardTemplateArray[i]));
  }
  mapPinsTemplate.appendChild(fragment);
};

// Вызываем функции
init();
