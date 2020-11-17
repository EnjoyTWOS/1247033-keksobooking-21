'use strict';

(() => {
  const MAP_PIN_HEIGHT = 70;
  const MAP_PIN_WIDTH = 50;
  const pinTemplate = document.querySelector(`#pin`).content;

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
          window.card.close(mapCardRemovable);
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
