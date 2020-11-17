'use strict';

(() => {
  const MAP_PIN_HEIGHT = 70;
  const MAP_PIN_WIDTH = 50;
  const pinTemplate = document.querySelector(`#pin`).content;
  const mapElement = document.querySelector(`.map`);

  window.pin = {
    render(pin) {
      const mapPin = pinTemplate.cloneNode(true);

      mapPin.querySelector(`.map__pin`).style.left = pin.location.x - MAP_PIN_WIDTH / 2 + `px`;
      mapPin.querySelector(`.map__pin`).style.top = pin.location.y - MAP_PIN_HEIGHT + `px`;
      mapPin.querySelector(`img`).setAttribute(`src`, pin.author.avatar);
      mapPin.querySelector(`img`).setAttribute(`alt`, pin.offer.title);

      const onPinItemClick = () => {
        const mapCardRemovable = mapElement.querySelector(`.map__card`);
        if (mapCardRemovable) {
          mapCardRemovable.remove();
        }
        mapElement.appendChild(window.card.render(pin));
      };
      const onPinIsEnter = (evt) => {
        window.util.isEnterEvent(evt, onPinItemClick);
      };

      mapPin.querySelector(`.map__pin`).addEventListener(`mousedown`, (evt) => {
        const allMapPins = document.querySelectorAll(`.map__pin`);
        for (let oneMapPin of allMapPins) {
          oneMapPin.classList.remove(`map__pin--active`);
        }
        evt.target.classList.add(`map__pin--active`);
      });

      mapPin.querySelector(`.map__pin`).addEventListener(`click`, onPinItemClick);
      mapPin.querySelector(`.map__pin`).addEventListener(`keydown`, onPinIsEnter);
      mapPin.querySelector(`.map__pin`).setAttribute(`id`, `mapPinNotMain`);
      return mapPin;
    },
    main: document.querySelector(`.map__pin--main`),
    mapElement: document.querySelector(`.map`),
  };
})();
