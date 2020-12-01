'use strict';

(() => {
  const MAP_PIN_MAIN_ACTIVE_HEIGHT = 84;
  const MAP_PIN_MAIN_WIDTH = 62;
  const MAP_PIN_HEIGHT = 70;
  const MAP_PIN_WIDTH = 50;
  const pinTemplate = document.querySelector(`#pin`).content;
  const mapElement = document.querySelector(`.map`);
  const pinMain = document.querySelector(`.map__pin--main`);

  const DragLimit = {
    X: {
      MIN: 0 - MAP_PIN_MAIN_WIDTH / 2,
      MAX: 1200 - MAP_PIN_MAIN_WIDTH / 2
    },
    Y: {
      MIN: 130 - MAP_PIN_MAIN_ACTIVE_HEIGHT,
      MAX: 630 - MAP_PIN_MAIN_ACTIVE_HEIGHT
    }
  };

  pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();


      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let mainPinPosition = {
        x: document.querySelector(`.map__pin--main`).offsetLeft - shift.x,
        y: document.querySelector(`.map__pin--main`).offsetTop - shift.y
      };


      if (mainPinPosition.x >= DragLimit.X.MIN && mainPinPosition.x <= DragLimit.X.MAX) {
        pinMain.style.left = mainPinPosition.x + `px`;
      }
      if (mainPinPosition.y >= DragLimit.Y.MIN && mainPinPosition.y <= DragLimit.Y.MAX) {
        pinMain.style.top = mainPinPosition.y + `px`;
      }
      document.querySelector(`#address`).value = (parseInt(pinMain.style.left, 10) + MAP_PIN_MAIN_WIDTH / 2) + `,` + (parseInt(window.pin.main.style.top, 10) + MAP_PIN_MAIN_ACTIVE_HEIGHT);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };


    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  const removeCard = () => {
    const mapCardRemovable = mapElement.querySelector(`.map__card`);
    if (mapCardRemovable) {
      mapCardRemovable.remove();
    }
  };

  window.pin = {
    removeHighlighter() {
      const allMapPins = document.querySelectorAll(`.map__pin`);
      for (let oneMapPin of allMapPins) {
        oneMapPin.classList.remove(`map__pin--active`);
      }
    },
    render(pin) {
      const mapPin = pinTemplate.cloneNode(true);

      mapPin.querySelector(`.map__pin`).style.left = pin.location.x - MAP_PIN_WIDTH / 2 + `px`;
      mapPin.querySelector(`.map__pin`).style.top = pin.location.y - MAP_PIN_HEIGHT + `px`;
      mapPin.querySelector(`img`).setAttribute(`src`, pin.author.avatar);
      mapPin.querySelector(`img`).setAttribute(`alt`, pin.offer.title);

      const onPinItemClick = () => {
        removeCard();
        mapElement.appendChild(window.card.render(pin));
      };

      const onPinEnterClick = (evt) => {
        window.util.isEnterEvent(evt, onPinItemClick);
      };

      mapPin.querySelector(`.map__pin`).addEventListener(`mousedown`, (evt) => {
        window.pin.removeHighlighter();
        evt.target.classList.add(`map__pin--active`);
      });

      mapPin.querySelector(`.map__pin`).addEventListener(`click`, onPinItemClick);
      mapPin.querySelector(`.map__pin`).addEventListener(`keydown`, onPinEnterClick);
      mapPin.querySelector(`.map__pin`).setAttribute(`id`, `mapPinNotMain`);
      return mapPin;
    },
    main: pinMain,
    mapElement,
    mapPinMainWidth: MAP_PIN_MAIN_WIDTH,
    removeCard
  };
})();
