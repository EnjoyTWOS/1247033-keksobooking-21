'use strict';

(() => {
  const MAP_PIN_HEIGHT = 70;
  const MAP_PIN_WIDTH = 50;
  const pinTemplate = document.querySelector(`#pin`).content;
  const DragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };
  const Border = {
    TOP: DragLimit.Y.MIN - MAP_PIN_HEIGHT + `px`,
    BOTTOM: DragLimit.Y.MAX - MAP_PIN_HEIGHT + `px`,
    LEFT: DragLimit.X.MIN + `px`,
    RIGHT: DragLimit.X.MAX - MAP_PIN_WIDTH + `px`
  };

  window.map.pinMain.addEventListener(`mousedown`, (evt) => {
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


      if (mainPinPosition.x >= Border.LEFT && mainPinPosition.x <= Border.RIGHT) {
        window.map.pinMain.style.left = mainPinPosition.x + `px`;
      }
      if (mainPinPosition.y >= Border.TOP && mainPinPosition.y <= Border.BOTTOM) {
        window.map.pinMain.style.top = mainPinPosition.y + `px`;
      }

    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };


    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.pin = {
    render(pin) {
      const mapPin = pinTemplate.cloneNode(true);

      mapPin.querySelector(`.map__pin`).style.left = pin.location.x - MAP_PIN_WIDTH / 2 + `px`;
      mapPin.querySelector(`.map__pin`).style.top = pin.location.y - MAP_PIN_HEIGHT + `px`;
      mapPin.querySelector(`img`).setAttribute(`src`, pin.author.avatar);
      mapPin.querySelector(`img`).setAttribute(`alt`, pin.offer.title);

      const onPinItemClick = () => {
        const mapCardRemovable = window.map.element.querySelector(`.map__card`);
        if (mapCardRemovable) {
          mapCardRemovable.remove();
        }
        window.map.element.appendChild(window.card.render(pin));
      };
      const onPinIsEnter = (evt) => {
        window.util.isEnterEvent(evt, onPinItemClick);
      };

      mapPin.querySelector(`.map__pin`).addEventListener(`click`, onPinItemClick);
      mapPin.querySelector(`.map__pin`).addEventListener(`keydown`, onPinIsEnter);
      mapPin.querySelector(`.map__pin`).setAttribute(`data-attribute-id`, pin.offer.title);
      return mapPin;
    }
  };
})();
